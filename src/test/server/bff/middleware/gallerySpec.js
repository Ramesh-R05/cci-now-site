import proxyquire, {noCallThru} from 'proxyquire';
import gallery from '../../../mocks/gallery'
import moreGalleries from '../../../mocks/moreGalleries'
noCallThru();

let getMoreGalleriesStub = () => {};

const galleryMiddleware = proxyquire('../../../../app/server/bff/middleware/gallery', {
    '../api/listing': {
        getMoreGalleries: () => { return getMoreGalleriesStub() }
    }
}).default;

describe('Gallery middleware', () => {
    const res = {};
    const validNodeType = gallery.nodeTypeAlias;
    const validSectionId = gallery.sectionId;
    let next;
    let req = {
        data: { entity: gallery }
    };

    before(() => {
        next = sinon.spy();
        getMoreGalleriesStub = sinon.stub().resolves(moreGalleries);
    });

    describe('when nodeTypeAlias is NOT `Gallery`', () => {

        before(() => {
            req.data.entity.nodeTypeAlias = 'Article';
        });

        after(() => {
            req.data.entity.nodeTypeAlias = validNodeType;
        });

        it('should not set moreGalleries on `req.data` object', (done) => {
            galleryMiddleware(req, res, next).then(() => {
                expect(req.data).to.not.include.keys('moreGalleries');
                expect(next).to.be.called;
                done();
            }).catch(done);
        });
    });

    describe('when nodeTypeAlias is `Gallery`', () => {

        it('should set moreGalleries in req.data with `getMoreGalleries` response', (done) => {
            galleryMiddleware(req, res, next).then(() => {
                expect(req.data).to.include.keys('moreGalleries');
                expect(req.data.moreGalleries).to.equal(moreGalleries);
                expect(next).to.be.called;
                done();
            }).catch(done);
        });
    });
});
