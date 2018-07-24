import proxyquire, { noCallThru } from 'proxyquire';
import videoGalleryMock from '../../../mocks/galleryOfGalleries';

noCallThru();

let makeRequestStub = () => {};
let getLatestTeasersStub = () => {};
let getHeroTeaserStub = () => {};

const homeMiddleware = proxyquire('../../../../app/server/bff/middleware/home', {
    '../../makeRequest': (...args) => {
        return makeRequestStub(...args);
    },
    '../api/listing': {
        getLatestTeasers: () => {
            return getLatestTeasersStub();
        }
    },
    '../api/module': {
        getHeroTeaser() {
            return getHeroTeaserStub();
        }
    }
}).default;

describe('Home middleware', () => {
    const config = {
        services: { remote: { entity: 'http://entitiesUrl.com/' }, module: 'http://module.url' },
        site: { host: 'http://site-host.com' }
    };
    const latestTeasers = { data: [{ pageDateCreated: '2017-03-29T04:27:09.00Z' }, { pageDateCreated: '2017-03-29T04:27:09.00Z' }] };
    const hero = { name: 'hero' };
    const entity = {
        id: 'DOLLY-ID'
    };
    const res = {};
    let next;

    describe('when the remote returns an error response', () => {
        const rejectedResponse = {
            body: 'Could not find the article DOLLY-36424',
            err: 'Error 404',
            status: 404
        };
        const req = { app: { locals: { config } } };

        before(() => {
            next = sinon.spy();
            makeRequestStub = sinon.stub().rejects(rejectedResponse);
            getLatestTeasersStub = sinon.stub();
            getLatestTeasersStub.onFirstCall().resolves([]);
            getLatestTeasersStub.onSecondCall().resolves([]);
        });

        it('should pass error to next middleware', done => {
            homeMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.be.calledWith(rejectedResponse);
                    done();
                })
                .catch(done);
        });
    });

    describe('when the remote returns an entity in the response', () => {
        describe('and getLatestTeasers returns the teasers and video gallery teasers', () => {
            const req = { app: { locals: { config } } };

            before(() => {
                next = sinon.spy();
                makeRequestStub = sinon.stub().resolves(entity);
                getLatestTeasersStub = sinon.stub();
                getLatestTeasersStub.onFirstCall().resolves(latestTeasers);
                getLatestTeasersStub.onSecondCall().resolves(videoGalleryMock);
            });

            it('should store the entity in `req.data`', done => {
                homeMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.entity).to.deep.equal(entity);
                        done();
                    })
                    .catch(done);
            });

            it('should store the section in `req.data`', done => {
                homeMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.section).to.deep.equal({ id: entity.id, name: 'Home', urlName: 'home' });
                        done();
                    })
                    .catch(done);
            });

            it('should store the latestTeasers in `req.data`', done => {
                homeMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.latestTeasers).to.deep.equal(latestTeasers.data);
                        done();
                    })
                    .catch(done);
            });

            it('should store the videoGalleryTeasers in `req.data`', done => {
                homeMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.videoGalleryTeasers).to.equal(videoGalleryMock);
                        done();
                    })
                    .catch(done);
            });

            it('the videoGalleryTeasers should set the contentImageUrl as brightcove image still', done => {
                let brightCoveImageStill =
                    'http://brightcove04.o.brightcove.com/761709621001/761709621001_4761294440001_4761284339001-vs.jpg?pubId=761709621001';

                homeMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.videoGalleryTeasers.data[0].contentImageUrl).to.deep.equal(brightCoveImageStill);
                        done();
                    })
                    .catch(done);
            });
        });

        describe('and getLatestTeasers returns an error when getting video gallery teasers', () => {
            const req = { app: { locals: { config } } };

            before(() => {
                next = sinon.spy();
                makeRequestStub = sinon.stub().resolves(entity);
                getLatestTeasersStub = sinon.stub();
                getLatestTeasersStub.onSecondCall().rejects();
            });

            it('should return an empty object for videoGalleryTeasers in `req.data.videoGalleryTeasers`', done => {
                const emptyResponse = { data: [] };
                homeMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.videoGalleryTeasers).to.deep.equal(emptyResponse);
                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe('when the request contains existing data', () => {
        const req = { data: { header: 'Test' }, app: { locals: { config } } };

        before(() => {
            next = sinon.spy();
            makeRequestStub = sinon.stub().resolves(entity);
            getLatestTeasersStub = sinon.stub();
            getLatestTeasersStub.onFirstCall().returns(latestTeasers);
            getLatestTeasersStub.onSecondCall().returns({ data: [] });
        });

        it(`should keep the existing header data in 'req.data'`, done => {
            homeMiddleware(req, res, next)
                .then(() => {
                    expect(req.data.header).to.equal(req.data.header);
                    done();
                })
                .catch(done);
        });
    });

    describe('when there is a query param', () => {
        const req = { app: { locals: { config } }, query: {} };
        const skippedQueries = ['page', 'section', 'tag'];
        after(() => {
            req.query = {};
        });

        skippedQueries.map(query => {
            describe(`and it contains a ${query} value`, () => {
                before(() => {
                    next = sinon.stub();
                    makeRequestStub = sinon.stub();
                    req.query[query] = query.toUpperCase();
                });

                it(`should call next without making a request`, done => {
                    homeMiddleware(req, res, next)
                        .then(() => {
                            expect(next).to.have.been.called;
                            expect(makeRequestStub).to.not.have.been.called;
                            done();
                        })
                        .catch(done);
                });
            });
        });
    });

    describe('when a query param of pageNo 2 is passed in', () => {
        const req = { app: { locals: { config } }, query: { pageNo: 2 } };
        before(() => {
            next = sinon.stub();
            makeRequestStub = sinon.stub().resolves(entity);
            getLatestTeasersStub = sinon.stub();
            getLatestTeasersStub.onFirstCall().resolves(latestTeasers);
            getLatestTeasersStub.onSecondCall().resolves(videoGalleryMock);
        });

        it('should not have a query param in the previous page url', done => {
            homeMiddleware(req, res, next)
                .then(() => {
                    expect(req.data.list.previous.url).to.equal('http://site-host.com/');
                    done();
                })
                .catch(done);
        });
    });
});
