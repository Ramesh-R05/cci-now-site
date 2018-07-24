import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

let getModulesStub = () => {};

const pageModulesMiddleware = proxyquire('../../../../app/server/bff/middleware/pageModules', {
    '../api/module': () => getModulesStub(),
    '../../../../logger': { error() {} }
}).default;

describe('PageModules middleware', () => {
    const res = {};
    const module = [];
    let req = {};
    let next;

    describe('when the response is valid', () => {
        before(() => {
            next = sinon.spy();
            getModulesStub = sinon.stub().resolves({ headernavigation: module });
        });

        after(() => {
            req = {};
        });

        it('should set `req.data.headernavigation` to equal the response', done => {
            pageModulesMiddleware(req, res, next)
                .then(() => {
                    expect(req.data).to.deep.eq({ headernavigation: module });
                    expect(next).to.be.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('when the response returns an error', () => {
        before(() => {
            req = { test: '123' };
            next = sinon.spy();
            getModulesStub = sinon.stub().rejects();
        });

        after(() => {
            req = {};
        });

        it('should have not changed `req.data` and call next without any args', done => {
            pageModulesMiddleware(req, res, next)
                .then(() => {
                    expect(req).to.deep.eq(req);
                    expect(next).to.be.calledWith();
                    done();
                })
                .catch(done);
        });
    });
});
