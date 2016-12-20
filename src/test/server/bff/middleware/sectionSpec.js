import proxyquire, {noCallThru} from 'proxyquire';

noCallThru();

let getLatestTeasersStub = () => {};

const sectionMiddleware = proxyquire('../../../../app/server/bff/middleware/section', {
    '../api/listing': {
        getLatestTeasers: (...args) => { return getLatestTeasersStub(...args) }
    }
}).default;

describe('Section middleware', () => {
    const validRes = {data: [1, 2]};
    const res = {};
    let next;
    let req;
    let reqBase;
    let rejectedResponse;

    describe('when there is a section in the query param and nodeTypeAlias equal to Section', () => {
        before(() => {
            reqBase = { data: { entity: { nodeTypeAlias: 'Section' } }, query: { section: 'sec' } };
        });

        describe('when the remote returns an error response', () => {
            before(() => {
                rejectedResponse = {
                    body: 'Could not find the article DOLLY-36424',
                    err: 'Error 404',
                    status: 404
                };

                next = sinon.spy();
                req = { ...reqBase };
                getLatestTeasersStub = sinon.stub().rejects(rejectedResponse);
            });

            it('should pass error to next middleware', (done) => {
                sectionMiddleware(req, res, next).then(() => {
                    expect(next).to.be.calledWith(rejectedResponse);
                    done();
                }).catch(done);
            });
        });

        describe('when the remote returns the list of teasers', () => {
            before(() => {
                req = { ...reqBase, app: { config: {site: { host: 'http://site-host.com'}}} };
                req.data.headerNav = [1, 2, 3];
                next = sinon.spy();
                getLatestTeasersStub = sinon.stub().resolves(validRes);
            });

            it('should store the latest teasers in `req.data`', (done) => {
                sectionMiddleware(req, res, next).then(() => {
                    expect(getLatestTeasersStub).to.have.been.calledWith(14, 0, `/${req.query.section}/`, 'parentUrl');
                    done();
                }).catch(done);
            });

            it('should have valid section value in `req.data.list`', (done) => {
                sectionMiddleware(req, res, next).then(() => {
                    expect(req.data.list.params.section).to.equal('/sec/');
                    done();
                }).catch(done);
            });
        });

        describe('when a query param of pageNo 2 is passed in', () => {
            before(() => {
                req = { ...reqBase, app: { config: {site: { host: 'http://site-host.com'}}} };
                req.query.pageNo = 2;
                next = sinon.spy();
                getLatestTeasersStub = sinon.stub().resolves(validRes);
            });

            it('should not have a query param in the previous page url', (done) => {
                sectionMiddleware(req, res, next).then(() => {
                    expect(req.data.list.previous.url).to.equal('http://site-host.com/sec');
                    done();
                }).catch(done);
            });
        });
    });

    describe('when there is a page query param and nodeTypeAlias equal to Section', () => {
        before(() => {
            req = { data: { entity: { nodeTypeAlias: 'Section' } }, query: { page: 'page' } };
            next = sinon.stub();
            getLatestTeasersStub = sinon.stub();
        });

        it(`should call next without making a request`, (done) => {
            sectionMiddleware(req, res, next).then(() => {
                expect(next).to.have.been.called;
                expect(getLatestTeasersStub).to.not.have.been.called;
                done();
            }).catch(done);
        });
    });

    describe('when there is a page and section query param along with a nodeTypeAlias equal to Section', () => {
        before(() => {
            req = { data: { entity: { nodeTypeAlias: 'Section' } }, query: { page: 'page', section: 'section' } };
            next = sinon.stub();
            getLatestTeasersStub = sinon.stub();
        });

        it(`should call next without making a request`, (done) => {
            sectionMiddleware(req, res, next).then(() => {
                expect(next).to.have.been.called;
                expect(getLatestTeasersStub).to.not.have.been.called;
                done();
            }).catch(done);
        });
    });

    describe('when there is a section in the query param and nodeTypeAlias equal to Article', () => {
        before(() => {
            reqBase = { data: { entity: { nodeTypeAlias: 'Article' } }, query: { section: 'section' } };
        });

        describe('and there is a nodeTypeAlias equal Section', () => {
            before(() => {
                req = { ...reqBase, data: { entity: 'Section' } };
                next = sinon.stub();
                getLatestTeasersStub = sinon.stub();
            });

            it(`should call next without making a request`, (done) => {
                sectionMiddleware(req, res, next).then(() => {
                    expect(next).to.have.been.called;
                    expect(getLatestTeasersStub).to.not.have.been.called;
                    done();
                }).catch(done);
            });
        });
    });
});
