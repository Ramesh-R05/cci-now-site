import proxyquire, { noCallThru } from 'proxyquire';
import gallery from '../../../mocks/gallery';
import listing from '../../../mocks/listing';
noCallThru();

const APIUtilsStub = sinon.stub();
const loggerStub = sinon.stub();
const getLatestTeasersStub = sinon.stub();

const APIUtilsReturn = {
    getLatestTeasers: getLatestTeasersStub
};

const galleryMiddleware = proxyquire('../../../../app/server/bff/middleware/gallery', {
    '@bxm/api-utils': APIUtilsStub,
    '../../../../logger': loggerStub
}).default;

function resetStubs() {
    APIUtilsStub.reset();
    getLatestTeasersStub.reset();
}

describe('Gallery middleware', () => {
    const config = {
        brands: {
            site: [
                {
                    id: 'aww',
                    imageUrl: '/assets/images/headerlogos/AWW-logo.svg',
                    url: '/aww',
                    title: "Australian Women's Weekly"
                },
                {
                    id: 'wd',
                    imageUrl: '/assets/images/headerlogos/WD-logo.svg',
                    url: '/womansday',
                    title: "Woman's Day"
                },
                {
                    id: 'gh',
                    imageUrl: '/assets/images/headerlogos/GH-logo.svg',
                    url: '/good-health',
                    title: 'Good Health'
                }
            ]
        }
    };
    const res = {};
    const validNodeType = gallery.nodeTypeAlias;
    const validSectionId = gallery.sectionId;
    const validSection = 'fashion';
    const validSubsection = 'models';
    const validPageName = 'kendall-jenners-skin-doctor-tells-us-what-mistake';
    const validPageId = 3640;
    const validPage = `${validPageName}-${validPageId}`;
    let next;
    let req;

    describe('when nodeTypeAlias is NOT `Gallery`', () => {
        before(() => {
            req = {
                app: {
                    locals: {
                        config
                    }
                },
                data: { entity: gallery }
            };
            APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns(APIUtilsReturn);
            next = sinon.spy();
            req.data.entity.nodeTypeAlias = 'Article';
            getLatestTeasersStub.resolves(listing);
        });

        after(() => {
            resetStubs();
            req.data.entity.nodeTypeAlias = validNodeType;
        });

        it('should not set leftHandSide on `req.data` object', done => {
            galleryMiddleware(req, res, next)
                .then(() => {
                    expect(req.data).to.not.include.keys('leftHandSide');
                    expect(next).to.be.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('when nodeTypeAlias is `Gallery`', () => {
        let res = {};
        let next;
        let req;
        let reqBase;

        describe('when articleSource is Good Health', () => {
            before(() => {
                reqBase = {
                    app: { locals: { config } },
                    query: {
                        section: validSection,
                        subsection: validSubsection,
                        page: validPage
                    },
                    data: {
                        entity: {
                            url: gallery.url,
                            sectionId: gallery.sectionId,
                            nodeTypeAlias: 'Gallery',
                            source: 'Good Health'
                        }
                    }
                };
                req = { ...reqBase };
                APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns(APIUtilsReturn);
                next = sinon.spy();
            });

            after(resetStubs);

            it('should set adBrand as gh', done => {
                galleryMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.entity.adBrand).to.equal('gh');
                        done();
                    })
                    .catch(done);
            });
        });

        describe('when articleSource is undefined', () => {
            before(() => {
                reqBase = {
                    app: { locals: { config } },
                    query: {
                        section: validSection,
                        subsection: validSubsection,
                        page: validPage
                    },
                    data: {
                        entity: {
                            url: gallery.url,
                            sectionId: gallery.sectionId,
                            nodeTypeAlias: 'Gallery'
                        }
                    }
                };
                req = { ...reqBase };
                APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns(APIUtilsReturn);
                next = sinon.spy();
            });

            after(resetStubs);

            it('should set adBrand as ntl', done => {
                galleryMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.entity.adBrand).to.equal('ntl');
                        done();
                    })
                    .catch(done);
            });
        });

        describe('when sectionId has a value', () => {
            before(() => {
                reqBase = {
                    app: { locals: { config } },
                    query: {
                        section: validSection,
                        subsection: validSubsection,
                        page: validPage
                    },
                    data: {
                        entity: {
                            url: gallery.url,
                            sectionId: gallery.sectionId,
                            nodeTypeAlias: 'Gallery',
                            articleSource: 'Good Health'
                        }
                    }
                };
                req = { ...reqBase };
                next = sinon.spy();
                APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns(APIUtilsReturn);
                getLatestTeasersStub.resolves(listing);
            });

            after(resetStubs);

            it('should set leftHandSide in req.data with `getLatestTeasers` response', done => {
                galleryMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data).to.include.keys('leftHandSide');
                        expect(req.data.leftHandSide).to.equal(listing);
                        expect(next).to.be.called;
                        done();
                    })
                    .catch(done);
            });
        });
    });
});
