import proxyquire, { noCallThru } from 'proxyquire';
import article from '../../../mocks/article';
import listing from '../../../mocks/listing';
noCallThru();

const APIUtilsStub = sinon.stub();
const loggerStub = sinon.stub();
const getLatestTeasersStub = sinon.stub();

const articleMiddleware = proxyquire('../../../../app/server/bff/middleware/article', {
    '@bxm/api-utils': APIUtilsStub,
    '../../../../logger': loggerStub
}).default;

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

function resetStubs() {
    getLatestTeasersStub.reset();
    APIUtilsStub.reset();
}

describe('Article middleware', () => {
    const res = {};
    const validNodeType = article.nodeTypeAlias;
    const validSection = 'fashion';
    const validSubsection = 'models';
    const validPageName = 'kendall-jenners-skin-doctor-tells-us-what-mistake';
    const validPageId = 3640;
    const validPage = `${validPageName}-${validPageId}`;
    let next;
    let req;

    describe('when nodeTypeAlias is NOT `Article`', () => {
        before(() => {
            req = {
                app: {
                    locals: {
                        config
                    }
                },
                data: { entity: {} }
            };
            APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                getLatestTeasers: getLatestTeasersStub
            });
            next = sinon.spy();
            getLatestTeasersStub.resolves(listing);
            req.data.entity.nodeTypeAlias = 'Gallery';
        });

        after(() => {
            resetStubs();
            req.data.entity.nodeTypeAlias = validNodeType;
        });

        it('should not set leftHandSide on `req.data` object', done => {
            articleMiddleware(req, res, next)
                .then(() => {
                    expect(req.data).to.not.include.keys('leftHandSide');
                    expect(next).to.be.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('when nodeTypeAlias is `Article`', () => {
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
                            url: article.url,
                            sectionId: article.sectionId,
                            nodeTypeAlias: 'Article',
                            articleSource: 'Good Health'
                        }
                    }
                };
                req = { ...reqBase };
                APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                    getLatestTeasers: getLatestTeasersStub
                });
                next = sinon.spy();
                getLatestTeasersStub.resolves(listing);
            });

            after(resetStubs);

            it('should set adBrand as gh', done => {
                articleMiddleware(req, res, next)
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
                            url: article.url,
                            sectionId: article.sectionId,
                            nodeTypeAlias: 'Article'
                        }
                    }
                };
                req = { ...reqBase };
                APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                    getLatestTeasers: getLatestTeasersStub
                });
                next = sinon.spy();
                getLatestTeasersStub.resolves(listing);
            });

            after(resetStubs);

            it('should set adBrand as ntl', done => {
                articleMiddleware(req, res, next)
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
                            url: article.url,
                            sectionId: article.sectionId,
                            nodeTypeAlias: 'Article',
                            articleSource: 'Good Health'
                        }
                    }
                };
                req = { ...reqBase };
                APIUtilsStub.withArgs(loggerStub, req.app.locals.config).returns({
                    getLatestTeasers: getLatestTeasersStub
                });
                next = sinon.spy();
                getLatestTeasersStub.resolves(listing);
            });

            after(resetStubs);

            it('should set leftHandSide in req.data with `getLatestTeasers` response', done => {
                articleMiddleware(req, res, next)
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
