import proxyquire, {noCallThru} from 'proxyquire';
import sinonAsPromised from 'sinon-as-promised';
import trending from '../../../mocks/trending'
import videoGalleryMock from '../../../mocks/galleryOfGalleries';

noCallThru();

let makeRequestStub = () => {};
let getLatestTeasersStub = () => {};
let getTrendingStub = () => {};
let getHeroTeaserStub = () => {};

const homeMiddleware = proxyquire('../../../../app/server/bff/middleware/home', {
    '../../makeRequest': (...args) => { return makeRequestStub(...args) },
    '../api/listing': {
        getLatestTeasers: () => { return getLatestTeasersStub(); }
    },
    '../api/trending': {
        getTrending: () => { return getTrendingStub() }
    },
    '../api/module': {
        getHeroTeaser() { return getHeroTeaserStub() }
    },
    '@bxm/winston-logger': { backendLogger: { log(){} } }
}).default;

describe('Home middleware', () => {
    const config = {
        services: {remote: {entity: 'http://entitiesUrl.com/'}},
        site: {host: 'http://site-host.com/'}
    };
    const latestTeasers = { data: ['Teaser 1', 'Teaser 2'] };
    const hero = { name: 'hero' };
    const entity = { id: 'DOLLY-ID' };
    const res = {};
    let next;

    describe('when the remote returns an error response', () => {
        const rejectedResponse = {
            body: 'Could not find the article DOLLY-36424',
            err: 'Error 404',
            status: 404
        };
        const req = { app: { config } };

        before(() => {
            next = sinon.spy();
            makeRequestStub = sinon.stub().rejects(rejectedResponse);
            getLatestTeasersStub = sinon.stub();
            getLatestTeasersStub.onFirstCall().resolves([]);
            getLatestTeasersStub.onSecondCall().resolves([]);
            getTrendingStub = sinon.stub().resolves([]);
        });

        it('should pass error to next middleware', (done) => {
            homeMiddleware(req, res, next).then(() => {
                expect(next).to.be.calledWith(rejectedResponse);
                done();
            }).catch(done);
        });
    });

    describe('when the remote returns an entity in the response', () => {
        describe('and getLatestTeasers returns the teasers and video gallery teasers', () => {
            const req = { app: { config } };

            before(() => {
                next = sinon.spy();
                makeRequestStub = sinon.stub().resolves(entity);
                getLatestTeasersStub = sinon.stub();
                getLatestTeasersStub.onFirstCall().resolves(latestTeasers);
                getLatestTeasersStub.onSecondCall().resolves(videoGalleryMock);
                getTrendingStub = sinon.stub().resolves(trending);
            });

            it('should store the entity in `req.data`', (done) => {
                homeMiddleware(req, res, next).then(() => {
                    expect(req.data.entity).to.deep.equal(entity);
                    done();
                }).catch(done);
            });

            it('should store the section in `req.data`', (done) => {
                homeMiddleware(req, res, next).then(() => {
                    expect(req.data.section).to.deep.equal({ id: entity.id, name: 'Home' });
                    done();
                }).catch(done);
            });

            it('should store the latestTeasers in `req.data`', (done) => {
                homeMiddleware(req, res, next).then(() => {
                    expect(req.data.latestTeasers).to.deep.equal(latestTeasers.data);
                    done();
                }).catch(done);
            });

            it('should store the videoGalleryTeasers in `req.data`', (done) => {
                homeMiddleware(req, res, next).then(() => {
                    expect(req.data.videoGalleryTeasers).to.equal(videoGalleryMock);
                    done();
                }).catch(done);
            });


            it('the videoGalleryTeasers should set the contentImageUrl as brightcove image still', (done) => {

                let brightCoveImageStill = 'http://brightcove04.o.brightcove.com/761709621001/761709621001_4761294440001_4761284339001-vs.jpg?pubId=761709621001'

                homeMiddleware(req, res, next).then(() => {
                    expect(req.data.videoGalleryTeasers.data[0].contentImageUrl).to.deep.equal(brightCoveImageStill);
                    done();
                }).catch(done);
            });

            it('should set trendingItems in req.data with `getTrending` response', (done) => {
                homeMiddleware(req, res, next).then(() => {
                    expect(req.data).to.include.keys('trendingItems');
                    expect(req.data.trendingItems).to.equal(trending);
                    expect(next).to.be.called;
                    done();
                }).catch(done);
            });
        });

        describe('and getLatestTeasers returns an error when getting video gallery teasers', () => {
            const req = { app: { config } };

            before(() => {
                next = sinon.spy();
                makeRequestStub = sinon.stub().resolves(entity);
                getLatestTeasersStub = sinon.stub();
                getLatestTeasersStub.onSecondCall().rejects();
                getTrendingStub = sinon.stub().resolves(trending);
            });

            it('should return an empty object for videoGalleryTeasers in `req.data.videoGalleryTeasers`', (done) => {
                const emptyResponse = { data: [] };
                homeMiddleware(req, res, next).then(() => {
                    expect(req.data.videoGalleryTeasers).to.deep.equal(emptyResponse);
                    done();
                }).catch(done);
            });
        });
    });

    describe('when the request contains existing data', () => {
        const req = { data: { header: 'Test' }, app: { config } };

        before(() => {
            next = sinon.spy();
            makeRequestStub = sinon.stub().resolves(entity);
            getLatestTeasersStub = sinon.stub();
            getLatestTeasersStub.onFirstCall().returns(latestTeasers);
            getLatestTeasersStub.onSecondCall().returns({ data: [] });
        });

        it(`should keep the existing header data in 'req.data'`, (done) => {
            homeMiddleware(req, res, next).then(() => {
                expect(req.data.header).to.equal(req.data.header);
                done();
            }).catch(done);
        });
    });

    describe('when there is a query param', () => {
        const req = { app: { config }, query: {} };
        const skippedQueries = ['page', 'section', 'tag'];
        after(() => {
            req.query = {};
        });

        skippedQueries.map((query) => {
            describe(`and it contains a ${query} value`, () => {
                before(() => {
                    next = sinon.stub();
                    makeRequestStub = sinon.stub();
                    req.query[query] = query.toUpperCase();
                });

                it(`should call next without making a request`, (done) => {
                    homeMiddleware(req, res, next).then(() => {
                        expect(next).to.have.been.called;
                        expect(makeRequestStub).to.not.have.been.called;
                        done();
                    }).catch(done);
                });
            });
        });
    });
});
