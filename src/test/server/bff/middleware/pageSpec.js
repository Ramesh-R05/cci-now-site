import proxyquire, { noCallThru } from 'proxyquire';
import entity from '../../../mocks/article';
noCallThru();

const APIUtilsStub = sinon.stub();
const loggerStub = sinon.stub();
const getEntityStub = sinon.stub();
const getPageIDStub = sinon.stub();

const pageMiddleware = proxyquire('../../../../app/server/bff/middleware/page', {
    '@bxm/api-utils': APIUtilsStub,
    '../api/entity': getEntityStub,
    '../../../../logger': loggerStub,
    '../helper/getPageID': getPageIDStub
}).default;

describe('Page middleware', () => {
    const config = {
        services: { remote: { entity: 'http://entitiesUrl.com/' } }
    };
    const res = {};
    const validSection = 'fashion';
    const validSubsection = 'models';
    const validPageName = 'kendall-jenners-skin-doctor-tells-us-what-mistake';
    const validPageId = 3640;
    const validPage = `${validPageName}-${validPageId}`;
    let next;
    let req;

    afterEach(() => {
        getEntityStub.reset();
        getPageIDStub.reset();
        APIUtilsStub.reset();
    });

    describe('when the path does not contain an ID number in the slug', () => {
        before(() => {
            req = {
                app: { locals: { config } },
                query: { section: validSection, subSection: validSubsection, page: validPage }
            };

            APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                getEntity: getEntityStub
            });

            next = sinon.spy();
            getPageIDStub.returns(undefined);
        });

        it('should pass error to next middleware', done => {
            pageMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.be.calledWith({
                        status: 404,
                        message: 'Invalid page ID',
                        section: validSection,
                        page: validPage
                    });
                    done();
                })
                .catch(done);
        });
    });

    describe(`when the req already contains 'data.entity'`, () => {
        before(() => {
            req = {
                app: { locals: { config } },
                data: { entity: {} },
                query: { section: validSection, page: validPage }
            };
            next = sinon.spy();
        });

        it('should pass error to next middleware', done => {
            pageMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.be.calledWith();
                    expect(getPageIDStub).to.not.have.been.called;
                    expect(getEntityStub).to.not.have.been.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('when the remote returns an error response', () => {
        let rejectedResponse;

        before(() => {
            req = {
                app: { locals: { config } },
                query: { section: validSection, page: validPage }
            };
            rejectedResponse = {
                body: 'Could not find the article DOLLY-36424',
                err: 'Error 404',
                status: 404
            };
            APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                getEntity: getEntityStub
            });
            next = sinon.spy();
            getEntityStub.throws(rejectedResponse);
            getPageIDStub.returns('DOLLY-1234');
        });

        it('should pass error to next middleware', done => {
            pageMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.be.calledWith(rejectedResponse);
                    done();
                })
                .catch(done);
        });
    });

    describe(`when the req is a preview page`, () => {
        before(() => {
            req = {
                app: { locals: { config } },
                query: { section: validSection, page: validPage, preview: 'preview' }
            };
            next = sinon.spy();
            APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                getEntity: getEntityStub
            });
            getEntityStub.resolves(entity);
            getPageIDStub.returns('DOLLY-1234');
        });

        it('should call makeRequest with saved data', done => {
            pageMiddleware(req, res, next)
                .then(() => {
                    expect(getEntityStub).to.have.been.calledWith(`DOLLY-1234?saved=true`);
                    done();
                })
                .catch(done);
        });
    });

    describe('when the remote returns an entity in the response and is not a preview page', () => {
        describe('and the url does not match the url in response', () => {
            beforeEach(() => {
                req = {
                    app: { locals: { config } },
                    query: { section: validSection, subsection: validSubsection, page: validPage }
                };
                next = sinon.spy();
                APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                    getEntity: getEntityStub
                });
                getEntityStub.resolves(entity);
                getPageIDStub.returns('DOLLY-1234');
            });

            it('should call makeRequest without saved data', done => {
                req.query.section = 'anotherSection';
                pageMiddleware(req, res, next)
                    .then(() => {
                        expect(getEntityStub).to.have.been.calledWith('DOLLY-1234?saved=false');
                        done();
                    })
                    .catch(done);
            });

            it('should return an error when section does not match remote', done => {
                req.query.section = 'anotherSection';
                req.query.subsection = 'anotherSubsection';
                pageMiddleware(req, res, next)
                    .then(() => {
                        expect(next).to.be.calledWith(
                            sinon.match(err => {
                                return err.message === `Path /anotherSection/anotherSubsection/${validPage} does not match page`;
                            })
                        );
                        done();
                    })
                    .catch(done);
            });

            it('should return an error when the page does not match remote', done => {
                req.query.page = `another-page-${validPageId}`;
                pageMiddleware(req, res, next)
                    .then(() => {
                        expect(next).to.be.calledWith(
                            sinon.match(err => {
                                return err.message === `Path /${validSection}/${validSubsection}/another-page-${validPageId} does not match page`;
                            })
                        );
                        done();
                    })
                    .catch(done);
            });
        });

        describe('and the url matches the data.url of the response', () => {
            beforeEach(() => {
                req = {
                    app: { locals: { config } },
                    query: {
                        section: validSection,
                        subsection: validSubsection,
                        page: validPage
                    }
                };
                APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                    getEntity: getEntityStub
                });
                next = sinon.spy();
                getEntityStub.resolves(entity);
                getPageIDStub.returns('DOLLY-1234');
            });

            it('should store the entity in `req.data`', done => {
                pageMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.entity).to.deep.equal(entity);
                        done();
                    })
                    .catch(done);
            });

            it('should store the section in `req.data`', done => {
                pageMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.section).to.deep.equal({ id: entity.sectionId, name: 'fashion', urlName: 'fashion' });
                        expect(req.data.subsection).to.deep.equal({ name: 'models', urlName: 'models' });
                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe('when the request contains existing data', () => {
        before(() => {
            req = {
                app: { locals: { config } },
                data: { header: 'Test' },
                app: { locals: { config } },
                query: { section: validSection, page: validPage }
            };
            APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                getEntity: getEntityStub
            });
            next = sinon.spy();
            getEntityStub.resolves(entity);
            getPageIDStub.returns('DOLLY-1234');
        });

        it(`should keep the existing header data in 'req.data'`, done => {
            pageMiddleware(req, res, next)
                .then(() => {
                    expect(req.data.header).to.equal(req.data.header);
                    done();
                })
                .catch(done);
        });
    });
});
