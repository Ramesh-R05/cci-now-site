import proxyquire, { noCallThru } from 'proxyquire';
const httpsMiddleware = proxyquire('../../../../app/server/bff/middleware/https', {}).default;
noCallThru();

const contentBody = [
    {
        type: 'image',
        content: {
            url: 'http://test.com/image.jpg'
        }
    },
    {
        type: 'image-revealer',
        content: {
            left: {
                url: 'http://test.com/image.jpg'
            },
            right: {
                url: 'http://test.com/image.jpg'
            }
        }
    },
    {
        type: 'related-content',
        content: [{ imageUrl: 'http://test.com/image.jpg' }, { imageUrl: 'http://test.com/image.jpg' }]
    },
    {
        type: 'whooshka',
        content: {
            url: 'http://test.com'
        }
    },
    {
        type: 'gallery',
        content: [
            {
                imageUrl: 'http://test.com/image.jpg'
            }
        ]
    },
    {
        type: 'image',
        content: {
            url: 'http://cdn.assets.cougar.bauer-media.net.au/image.jpg'
        }
    },
    {
        type: 'image',
        content: {
            url: 'http://d3lp4xedbqa8a5.cloudfront.net/image.jpg'
        }
    }
];

const contentGallery = [
    {
        index: 1,
        mediaType: 'image',
        url: 'http://test.com/image.jpg'
    }
];

const dataListItems = [
    {
        id: 'NOW-33518',
        title: 'Friends stars reveal the controversial scene that was banned from the show',
        dateCreated: '2017-09-15T00:51:51',
        imageAltText: 'Jane Sibbett and Jessica Hecht',
        imageUrl: 'http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Now/2017/09/15/41019/Carol-Susan.jpg',
        nodeType: 'Article',
        summary: 'Carol and Susan’s lesbian wedding proved too much for audiences in 1996.',
        source: 'TV WEEK',
        url: '/celebrity/tv/friends-stars-jane-sibbett-jessica-hecht-banned-scene-33518',
        parentName: 'TV',
        parentUrl: '/celebrity/tv',
        tagsDetails: [],
        enableAmp: '0'
    },
    {
        id: 'NOW-33520',
        title: 'EXCLUSIVE LOOK: The diamond ring Matty J gave Laura',
        dateCreated: '2017-09-15T00:17:00',
        imageAltText: 'matty j bachelor ',
        imageUrl: 'http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Now/2017/09/15/40988/Ring-art-new.jpg',
        nodeType: 'Article',
        summary: 'The sparkler is STUNNING.',
        source: 'TV WEEK',
        url: '/celebrity/tv/the-bachelor-australia-the-diamond-ring-matty-j-will-gift-the-winner-33520',
        parentName: 'TV',
        parentUrl: '/celebrity/tv',
        video: {
            id: '5575890037001',
            name: 'Laura Byrne wins The Bachelor',
            type: 'VideoItem',
            properties: []
        },
        tagsDetails: [],
        enableAmp: '0'
    }
];

describe('https middleware', () => {
    const res = {};

    it('should secure content body', () => {
        const req = { data: { entity: { contentBody: JSON.parse(JSON.stringify(contentBody)) } } };
        const next = sinon.spy();
        httpsMiddleware(req, res, next);
        const expectedURL = `/api/asset?url=${encodeURIComponent('http://test.com/image.jpg')}`;
        expect(req.data.entity.contentBody[0].content.url).to.equal(expectedURL);
        expect(req.data.entity.contentBody[1].content.left.url).to.equal(expectedURL);
        expect(req.data.entity.contentBody[1].content.right.url).to.equal(expectedURL);
        expect(req.data.entity.contentBody[2].content[0].imageUrl).to.equal(expectedURL);
        expect(req.data.entity.contentBody[2].content[1].imageUrl).to.equal(expectedURL);
        expect(req.data.entity.contentBody[3].content.url).to.equal(`/api/asset?url=${encodeURIComponent('http://test.com')}`);
        expect(req.data.entity.contentBody[4].content[0].imageUrl).to.equal(expectedURL);
        expect(req.data.entity.contentBody[5].content.url).to.equal('https://d3lp4xedbqa8a5.cloudfront.net/image.jpg');
        expect(req.data.entity.contentBody[6].content.url).to.equal('https://d3lp4xedbqa8a5.cloudfront.net/image.jpg');
        expect(next).to.be.called;
    });

    it('should secure the content gallery', () => {
        const req = { data: { entity: { contentGallery: JSON.parse(JSON.stringify(contentGallery)) } } };
        const next = sinon.spy();
        httpsMiddleware(req, res, next);
        expect(req.data.entity.contentGallery[0].url).to.equal(`/api/asset?url=${encodeURIComponent(contentGallery[0].url)}`);
        expect(next).to.be.called;
    });

    it('should secure content images', () => {
        const items = [{ contentImageUrl: 'http://test.com/content.jpg' }, { contentImageUrl: 'http://test.com/content.jpg' }];
        const req = { data: { promoted: { items } } };
        const next = sinon.spy();
        const expectedResult = [
            { contentImageUrl: `/api/asset?url=${encodeURIComponent('http://test.com/content.jpg')}` },
            { contentImageUrl: `/api/asset?url=${encodeURIComponent('http://test.com/content.jpg')}` }
        ];
        httpsMiddleware(req, res, next);
        expect(req.data.promoted.items).to.deep.equal(expectedResult);
        expect(next).to.be.called;
    });

    it('should secure item lists', () => {
        const req = {
            data: {
                list: {
                    items: [JSON.parse(JSON.stringify(dataListItems)), JSON.parse(JSON.stringify(dataListItems))]
                }
            }
        };
        const next = sinon.spy();
        httpsMiddleware(req, res, next);
        expect(req.data.list.items[0][0].imageUrl).to.equal(dataListItems[0].imageUrl.replace('http://', 'https://'));
        expect(req.data.list.items[1][1].imageUrl).to.equal(dataListItems[1].imageUrl.replace('http://', 'https://'));
        expect(next).to.be.called;
    });

    it('should secure item lists for load more', () => {
        const req = {};
        const res = {
            body: {
                list: {
                    items: [JSON.parse(JSON.stringify(dataListItems)), JSON.parse(JSON.stringify(dataListItems))]
                }
            }
        };
        const next = sinon.spy();
        httpsMiddleware(req, res, next);
        expect(res.body.list.items[0][0].imageUrl).to.equal(dataListItems[0].imageUrl.replace('http://', 'https://'));
        expect(res.body.list.items[1][1].imageUrl).to.equal(dataListItems[1].imageUrl.replace('http://', 'https://'));
        expect(next).to.be.called;
    });
});
