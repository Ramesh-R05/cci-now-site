import proxyquire, {noCallThru} from 'proxyquire';
import article from '../../../mocks/article';
import listing from '../../../mocks/listing';
import trending from '../../../mocks/trending';
import moreGalleries from '../../../mocks/moreGalleries';
noCallThru();

let parseEntityStub = () => {};
let parseEntitiesStub = () => {};
let parseHeaderMetaDataStub = () => {};
let getPlaceholderImageStub = () => {};

const responseBodyMiddleware = proxyquire('../../../../app/server/bff/middleware/responseBody', {
    '../helper/parseEntity': {
        parseEntity: (...args) => {
            return parseEntityStub(...args)
        },
        parseEntities: (...args) => {
            return parseEntitiesStub(...args)
        }
    },
    '../helper/parseHeaderMetaData': {
        parseHeaderMetaData: (...args) => {
            return parseHeaderMetaDataStub(...args)
        }
    },
    '../helper/getPlaceholderImage': (...args) => { return getPlaceholderImageStub(...args) }
}).default;

describe('ResponseBody middleware', () => {
    const headerMetaData = {
        author: 'blah',
        breadcrumbs: ['a', 'b'],
        canonicalUrl: '/some/url',
        faceBookAdmins: '',
        googleTagManagerEnvironment: 'Development',
        googleTagManagerMasthead: 'DOLLY',
        GroupingCategory: 'group category',
        hrefLang: 'en-au',
        pageDescription: 'description',
        pageName: 'node-name',
        robots: 'NOINDEX,NOFOLLOW',
        title: 'page title'
    };

    describe('when parsing default body properties', () => {
        const additionalHeader = { test: '123' };
        let req = {
            data: { entity: article, headerMetaData: additionalHeader }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntityStub = sinon.stub().returns(article);
            parseHeaderMetaDataStub = sinon.stub().returns(headerMetaData);
        });

        it('should set response entity to `req.data.entity`', () => {
            responseBodyMiddleware(req, res, next);
            expect(res.body.entity).to.equal(article);
            expect(res.body.headerMetaData).to.equal(headerMetaData);
            expect(parseHeaderMetaDataStub).to.have.been.calledWith(article, additionalHeader)
        });
    });

    describe('when data contains `leftHandSide`', () => {
        let req = {
            data: {
                entity: article,
                leftHandSide: listing
            }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntitiesStub = sinon.stub().returns(listing.data);
            getPlaceholderImageStub = sinon.stub().returns(listing.data);
        });

        it('should set `res.body.leftHandSide`', () => {
            responseBodyMiddleware(req, res, next);
            expect(res.body.leftHandSide).to.deep.equal({items: listing.data});
        });

		it('should call getPlaceholderImage() to set the default image for the LHR items', () => {
			responseBodyMiddleware(req, res, next);
			//getPlaceHolderImageStub.should.have.been.calledWith(req.data.leftHandSide.data)
		});


		describe('and it has no image', () => {

			before(() => {
				next = sinon.spy();
				parseEntitiesStub = sinon.stub().returns(listing.data);
			});

			it('should return the placeholder image', () => {
				responseBodyMiddleware(req, res, next);
				expect(res.body.leftHandSide).to.deep.equal({items: listing.data});
			});
		});
    });

    describe('when data contains `res.body.trendingItems`', () => {
        let req = {
            data: {
                entity: article,
                trendingItems: trending
            }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntitiesStub = sinon.stub().returns(trending.data);
        });

        it('should set `res.body.trendingItems`', () => {
            responseBodyMiddleware(req, res, next);
            expect(res.body.trendingItems).to.deep.equal(trending.data);
        });
    });

    describe('when data contains `res.body.trendingItems`', () => {
        let req = {
            data: {
                entity: article,
                trendingItems: trending
            }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntitiesStub = sinon.stub().returns(trending.data);
        });

        it('should set `res.body.trendingItems`', () => {
            responseBodyMiddleware(req, res, next);
            expect(parseEntitiesStub).to.have.been.calledWith(req.data.trendingItems, {
                title: 'title', imageUrl: 'imageUrl', location: 'url'
            });
            expect(res.body.trendingItems).to.deep.equal(trending.data);
        });
    });

    describe('when data contains `moreGalleries`', () => {
        let req = {
            data: {
                entity: article,
                moreGalleries: moreGalleries
            }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntitiesStub = sinon.stub().returns(moreGalleries.data);
        });

        it('should set `res.body.moreGalleries`', () => {
            responseBodyMiddleware(req, res, next);
            expect(res.body.moreGalleries).to.deep.equal(moreGalleries.data);
        });
    });

    describe('when data contains `latestTeasers`', () => {
        const latestTeasers = {data: ['Teaser 1', 'Teaser 2']};
        let req = {
            data: {
                entity: article,
                latestTeasers
            }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntitiesStub = sinon.stub().returns(latestTeasers.data);
        });

        it('should set `res.body.latestTeasers`', () => {
            responseBodyMiddleware(req, res, next);
            expect(res.body.latestTeasers).to.deep.equal(latestTeasers.data);
        });
    });

    describe('when data contains `headernavigation`', () => {
        const headernavigation = ['Nav item 1', 'Nav Item 2'];
        let req = {
            data: {
                entity: article,
                headernavigation
            }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntitiesStub = sinon.stub().returns(headernavigation);
        });

        it('should set `res.body.headerNavigation`', () => {
            responseBodyMiddleware(req, res, next);
            expect(parseEntitiesStub).to.have.been.calledWith(headernavigation, { contentTitle: 'name' });
            expect(res.body.headerNavigation).to.deep.equal({ items: headernavigation });
        });
    });

    describe('when data contains `hamburgernavigation`', () => {
        const hamburgernavigation = ['Nav item 1', 'Nav Item 2'];
        let req = {
            data: {
                entity: article,
                hamburgernavigation
            }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntitiesStub = sinon.stub().returns(hamburgernavigation);
        });

        it('should set `res.body.hamburgerNavigation`', () => {
            responseBodyMiddleware(req, res, next);
            expect(parseEntitiesStub).to.have.been.calledWith(hamburgernavigation, { contentTitle: 'name' });
            expect(res.body.hamburgerNavigation).to.deep.equal({ items: hamburgernavigation });
        });
    });

    describe('when data contains `heroTeaser`', () => {
        const heroTeaser = { id: 'HERO_123' };
        let req = {
            data: {
                entity: article,
                heroTeaser
            }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntityStub = sinon.stub().returns(heroTeaser);
        });

        it('should set `res.body.heroTeaser`', () => {
            responseBodyMiddleware(req, res, next);
            expect(parseEntityStub).to.have.been.calledWith(heroTeaser);
            expect(res.body.heroTeaser).to.deep.equal(heroTeaser);
        });
    });
});
