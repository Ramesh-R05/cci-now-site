import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const APIUtilsStub = sinon.stub();
const getEntityStub = sinon.stub();
const loggerStub = sinon.stub();

const listingMiddleware = proxyquire('../../../../app/server/bff/middleware/listing', {
    '@bxm/api-utils': APIUtilsStub,
    '../../../../logger': loggerStub
}).default;

describe('Listing middleware', () => {
    const config = { services: { remote: { entity: 'http://entitiesUrl.com/' } } };
    const entity = { id: 'SECTION_ID_123', contentTitle: 'Title' };
    const res = {};
    let next;

    afterEach(() => {
        getEntityStub.reset();
        APIUtilsStub.reset();
    });

    describe('when there is a section in the query param', () => {
        const reqBase = { query: { section: 'sec' }, app: { locals: { config } } };

        describe('when the remote returns an error response', () => {
            const req = { ...reqBase };
            const rejectedResponse = {
                body: 'Could not find the article DOLLY-36424',
                err: 'Error 404',
                status: 404
            };

            before(() => {
                next = sinon.spy();
                APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({ getEntity: getEntityStub });
                getEntityStub.throws(rejectedResponse);
            });

            it('should pass error to next middleware', done => {
                listingMiddleware(req, res, next)
                    .then(() => {
                        expect(next).to.be.calledWith(rejectedResponse);
                        done();
                    })
                    .catch(done);
            });
        });

        describe('when the remote returns an entity in the response', () => {
            const req = { ...reqBase };

            describe('and there is not a req.data object set', () => {
                before(() => {
                    next = sinon.spy();
                    APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({ getEntity: getEntityStub });
                    getEntityStub.resolves(entity);
                });

                it('should store the entity in `req.data`', done => {
                    listingMiddleware(req, res, next)
                        .then(() => {
                            expect(req.data).to.deep.equal({
                                entity,
                                section: { id: entity.id, name: entity.contentTitle, urlName: entity.urlName }
                            });
                            done();
                        })
                        .catch(done);
                });
            });

            describe('and there is a req.data object set', () => {
                const req = { ...reqBase, data: { headerNav: [1, 2, 3] } };

                before(() => {
                    next = sinon.spy();
                    APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({ getEntity: getEntityStub });
                    getEntityStub.resolves(entity);
                });

                it('should store the entity in `req.data`', done => {
                    listingMiddleware(req, res, next)
                        .then(() => {
                            expect(req.data).to.deep.equal({
                                ...req.data,
                                entity
                            });
                            done();
                        })
                        .catch(done);
                });
            });
        });
    });

    describe('when there is a page query param', () => {
        const req = { app: { locals: { config } }, query: { page: 'page' } };

        before(() => {
            APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({ getEntity: getEntityStub });
            next = sinon.stub();
        });

        it(`should call next without making a request`, done => {
            listingMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.have.been.called;
                    expect(getEntityStub).to.not.have.been.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('when there is a page and section query param', () => {
        const req = { app: { locals: { config } }, query: { page: 'page', section: 'section' } };

        before(() => {
            APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({ getEntity: getEntityStub });
            next = sinon.stub();
        });

        it(`should call next without making a request`, done => {
            listingMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.have.been.called;
                    expect(getEntityStub).to.not.have.been.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('when there is an existing data.entity in the req', () => {
        const overridenEntity = { entity: 'Override' };
        const req = { app: { locals: { config } }, data: { ...overridenEntity }, query: { section: 'section' } };

        before(() => {
            APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({ getEntity: getEntityStub });
            next = sinon.stub();
        });

        it(`should call next without making a request`, done => {
            listingMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.have.been.called;
                    expect(getEntityStub).to.not.have.been.called;
                    done();
                })
                .catch(done);
        });

        it(`should not override the entity`, done => {
            listingMiddleware(req, res, next)
                .then(() => {
                    expect(req.data).to.deep.equal({ ...overridenEntity });
                    done();
                })
                .catch(done);
        });
    });
});
