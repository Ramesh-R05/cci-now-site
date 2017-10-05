import get from 'lodash.get';
import set from 'lodash.set';
import proxyquire, { noCallThru } from 'proxyquire';
const httpsMiddleware = proxyquire('../../../../app/server/bff/middleware/https', {}).default;
import { itemLists, imageUrls } from '../../../../app/server/bff/middleware/https';
noCallThru();

const contentBody = [
    {type: 'image', content: {url: "http://test.com"}},
    {type: 'image-revealer', content: {left: {url: "http://test.com"}, right: {url: "http://test.com"}}},
    {type: 'related-content', content: [{imageUrl: "http://test.com"}, {imageUrl: "http://test.com"}]},
    {type: 'whooshka', content: {url: "http://test.com"}},
    {type: 'gallery', content: [{imageUrl: "http://test.com/image.jpg"}]}
];

const contentGallery = [
    {index: 1, mediaType: 'image', url: "http://test.com/image.jpg"}
];

const dataListItems = [{ id: 'NOW-33518',
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
    enableAmp: '0' },
  { id: 'NOW-33520',
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
    video: 
     { id: '5575890037001',
       name: 'Laura Byrne wins The Bachelor',
       type: 'VideoItem',
       properties: [] },
    tagsDetails: [],
    enableAmp: '0' }
];

describe('https middleware', () => { 
    let req;
    const res = {};
    let next;
    let items;
    let expectedResult;

    describe('mapping over the contentBody', () => {
        before(() => {
            req = {data: {entity: {contentBody: contentBody}}};
            next = sinon.spy();
        });
    
        it('should set all the urls to https', () => {
            httpsMiddleware(req, res, next);
            expect(req.data.entity.contentBody[0].content.url).to.equal('https://test.com');
            expect(req.data.entity.contentBody[1].content.left.url).to.equal('https://test.com');
            expect(req.data.entity.contentBody[1].content.right.url).to.equal('https://test.com');
            expect(req.data.entity.contentBody[2].content[0].imageUrl).to.equal('https://test.com');
            expect(req.data.entity.contentBody[2].content[1].imageUrl).to.equal('https://test.com');
            expect(req.data.entity.contentBody[3].content.url).to.equal('https://test.com');
            expect(req.data.entity.contentBody[4].content[0].imageUrl).to.equal('https://test.com/image.jpg');
            expect(next).to.be.called;
        });
    });

    describe('mapping over the contentGallery', () => {
        before(() => {
            req = {data: {entity: {contentGallery: contentGallery}}};
            next = sinon.spy();
        });
    
        it('should set all the urls to https', () => {
            httpsMiddleware(req, res, next);
            expect(req.data.entity.contentGallery[0].url).to.equal('https://test.com/image.jpg');
            expect(next).to.be.called;
        });
    });

    describe('mapping a list of items', () => {
        before(() => {
            items = [{contentImageUrl: "http://test.com/content.jpg"}, {contentImageUrl: "//test.com/kim%27kardashian"}, {}];
            req = {data: {promoted: { items: items }}};
            next = sinon.spy();
            expectedResult = [{contentImageUrl: "https://test.com/content.jpg"}, {contentImageUrl: "//test.com/kim%27kardashian"}, {}];
        });

        it(`should iterate through items and make each contentImageUrl https`, () => {
            httpsMiddleware(req, res, next);
            expect(req.data.promoted.items).to.deep.equal(expectedResult);
            expect(next).to.be.called;
        });
    });

    describe('mapping over data.list.items', () => {
        before(() => {
            req = {data: {list: {items: [dataListItems, dataListItems]}}};
            next = sinon.spy();
        });
    
        it('should set all the urls to https', () => {
            httpsMiddleware(req, res, next);
            expect(req.data.list.items[0][0].imageUrl).to.equal('https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Now/2017/09/15/41019/Carol-Susan.jpg');
            expect(req.data.list.items[1][0].imageUrl).to.equal('https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Now/2017/09/15/41019/Carol-Susan.jpg');
            expect(next).to.be.called;
        });
    });
});
