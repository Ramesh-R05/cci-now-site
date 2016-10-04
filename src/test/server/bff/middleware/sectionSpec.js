import proxyquire, {noCallThru} from 'proxyquire';

noCallThru();

let getLatestTeasersStub = () => {};

const sectionMiddleware = proxyquire('../../../../app/server/bff/middleware/section', {
    '../api/listing': {
        getLatestTeasers: (...args) => { return getLatestTeasersStub(...args) }
    }
}).default;

describe('Section middleware', () => {
    const validRes = [1, 2];
    const res = {};
    let next;

    describe('when there is a section in the query param and nodeTypeAlias equal to Section', () => {
        const reqBase = { data: { entity: { nodeTypeAlias: 'Section' } }, query: { section: 'sec' } };
        describe('when the remote returns an error response', () => {
            const req = { ...reqBase };
            const rejectedResponse = {
                body: 'Could not find the article DOLLY-36424',
                err: 'Error 404',
                status: 404
            };

            before(() => {
                next = sinon.spy();
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
            const req = { ...reqBase };
            req.data.headerNav = [1, 2, 3];

            before(() => {
                next = sinon.spy();
                getLatestTeasersStub = sinon.stub().resolves(validRes);
            });

            it('should store the latest teasers in `req.data`', (done) => {
                sectionMiddleware(req, res, next).then(() => {
                    expect(getLatestTeasersStub).to.have.been.calledWith(14, 0, req.query.section, 'parentUrl');
                    done();
                }).catch(done);
            });
        });
    });

    describe('when there is a page query param and nodeTypeAlias equal to Section', () => {
        const req = { data: { entity: { nodeTypeAlias: 'Section' } }, query: { page: 'page' } };

        before(() => {
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
        const req = { data: { entity: { nodeTypeAlias: 'Section' } }, query: { page: 'page', section: 'section' } };

        before(() => {
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
        const baseReq = { data: { entity: { nodeTypeAlias: 'Article' } }, query: { section: 'section' } };

        describe('and there is a nodeTypeAlias equal Section', () => {
            const req = { ...baseReq, data: { entity: 'Section' } };

            before(() => {
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
