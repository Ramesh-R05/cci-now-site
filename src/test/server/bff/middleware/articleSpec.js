import proxyquire, {noCallThru} from 'proxyquire';
import article from '../../../mocks/article'
import listing from '../../../mocks/listing'
noCallThru();

let getLatestTeasersStub = () => {};

const articleMiddleware = proxyquire('../../../../app/server/bff/middleware/article', {
    '../api/listing': {
        getLatestTeasers: () => { return getLatestTeasersStub() }
    }
}).default;

describe('Article middleware', () => {
    const res = {};
    const validNodeType = article.nodeTypeAlias;
    const validSectionId = article.sectionId;
    let next;
    let req = {
        data: { entity: article }
    };

    before(() => {
        next = sinon.spy();
        getLatestTeasersStub = sinon.stub().resolves(listing);
    });

    describe('when nodeTypeAlias is NOT `Article`', () => {

        before(() => {
            req.data.entity.nodeTypeAlias = 'Gallery';
        });

        after(() => {
            req.data.entity.nodeTypeAlias = validNodeType;
        });

        it('should not set leftHandSide on `req.data` object', (done) => {
            articleMiddleware(req, res, next).then(() => {
                expect(req.data).to.not.include.keys('leftHandSide');
                expect(next).to.be.called;
                done();
            }).catch(done);
        });
    });

    describe('when there is no sectionId', () => {

        before(() => {
            delete req.data.entity.sectionId;
        });

        after(() => {
            req.data.entity.sectionId = validSectionId;
        });

        it('should not set leftHandSide on `req.data` object', (done) => {
            articleMiddleware(req, res, next).then(() => {
                expect(req.data).to.not.include.keys('leftHandSide');
                expect(next).to.be.called;
                done();
            }).catch(done);
        });
    });

    describe('when nodeTypeAlias is `Article`', () => {
        it('should set leftHandSide in req.data with `getLatestTeasers` response', (done) => {
            articleMiddleware(req, res, next).then(() => {
                expect(req.data).to.include.keys('leftHandSide');
                expect(req.data.leftHandSide).to.equal(listing);
                expect(next).to.be.called;
                done();
            }).catch(done);
        });
    });
});
