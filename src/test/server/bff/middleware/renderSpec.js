import renderMiddleware from '../../../../app/server/bff/middleware/render';
import article from '../../../mocks/article';

describe('Render middleware', () => {
    let res = {
        body: article,
        header() {},
        json() {}
    };
    let req = {};
    let next;
    let jsonStub;
    let headerStub;

    before(() => {
        next = sinon.spy();
        jsonStub = sinon.stub(res, 'json');
        headerStub = sinon.stub(res, 'header');
    });

    it('should set response json to `res.body`', () => {
        renderMiddleware(req, res, next);
        expect(jsonStub).to.be.calledWith(res.body);
    });

    it('should set the cache headers', () => {
        renderMiddleware(req, res, next);
        expect(headerStub).to.be.calledWith('Cache-Control', `public, max-age=0`);
    });
});
