import get from 'lodash/object/get';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const configStub = { site: { prodDomain: 'www.dolly.com.au' } };
const headerMetaMiddleware = proxyquire('../../../../app/server/bff/middleware/headerMeta', {}).default;


describe('HeaderMeta middleware', () => {
    let currentEnv;
    const config = { ...configStub, gtm: { masthead: 'dolly' } };
    let baseReq = { app: { locals: { config } } };
    let res = {};
    let next;

    afterEach(() => {
        process.env.APP_ENV = currentEnv;
    });

    beforeEach(() => {
        currentEnv = get(process, 'env.APP_ENV');
        next = sinon.spy();
    });

    describe(`when there is no APP_ENV set and is not on prod domain` , () => {
        let req;

        beforeEach(() => {
            process.env.APP_ENV = '';
            req = {
                ...baseReq, query: { hostname: 'dev.url.com' }
            };
        });

        describe('and there is no entity and no data in the req object', () => {
            beforeEach(() => {
                headerMetaMiddleware(req, res, next);
            });

            it(`should set the req data object to contain 'headerMetaData' object`, () => {
                expect(req.data).to.deep.eq({
                    headerMetaData: {
                        googleTagManagerEnvironment: 'local',
                        googleTagManagerMasthead: config.gtm.masthead,
                        robots: 'NOINDEX,NOFOLLOW'
                    }
                });
            });

            it(`should have called next`, () => {
                expect(next).to.have.been.called;
            });
        });

        describe('and there is an entity object', () => {
            describe('that contains contentSummary and contentTitle', () => {
                const contentTitle = 'Title';
                const contentSummary = 'Summary';

                beforeEach(() => {
                    req.data = {};
                    req.data.entity = { contentSummary, contentTitle};
                    headerMetaMiddleware(req, res, next);
                });

                it(`should set the req data object to contain 'headerMetaData' and updated entity object`, () => {
                    expect(req.data).to.deep.eq({
                        entity: {
                            contentSummary,
                            contentTitle,
                            pageTitle: contentTitle,
                            pageMetaDescription: contentSummary
                        },
                        headerMetaData: {
                            googleTagManagerEnvironment: 'local',
                            googleTagManagerMasthead: config.gtm.masthead,
                            robots: 'NOINDEX,NOFOLLOW'
                        }
                    });
                });

                it(`should have called next`, () => {
                    expect(next).to.have.been.called;
                });
            });
        });

        describe('that contains contentSummary, contentTitle, pageTitle and pageMetaDescription', () => {
            const contentTitle = 'Title';
            const pageTitle = 'SEO TITLE';
            const contentSummary = 'Summary';
            const pageMetaDescription = 'SEO DESCRIPTION';

            beforeEach(() => {
                req.data = {};
                req.data.entity = { contentSummary, contentTitle, pageTitle, pageMetaDescription};
                headerMetaMiddleware(req, res, next);
            });

            it(`should set the req data object to contain 'headerMetaData' and updated entity object`, () => {
                expect(req.data).to.deep.eq({
                    entity: {
                        contentSummary,
                        contentTitle,
                        pageTitle,
                        pageMetaDescription
                    },
                    headerMetaData: {
                        googleTagManagerEnvironment: 'local',
                        googleTagManagerMasthead: config.gtm.masthead,
                        robots: 'NOINDEX,NOFOLLOW'
                    }
                });
            });

            it(`should have called next`, () => {
                expect(next).to.have.been.called;
            });
        });
    });

    describe(`when APP_ENV equals to 'prod' and is not on prod domain` , () => {
        let req;

        beforeEach(() => {
            process.env.APP_ENV = 'prod';
            req = {
                ...baseReq, query: { hostname: 'prelive.url.com' }
            };
            headerMetaMiddleware(req, res, next);
        });

        it(`should set the req data object to contain 'headerMetaData' object`, () => {
            expect(req.data).to.deep.eq({
                headerMetaData: {
                    googleTagManagerEnvironment: 'prod',
                    googleTagManagerMasthead: config.gtm.masthead,
                    robots: 'NOINDEX,NOFOLLOW'
                }
            });
        });

        it(`should have called next`, () => {
            expect(next).to.have.been.called;
        });
    });

    describe(`when APP_ENV equals to 'prod' and is on prod domain` , () => {
        let req;

        describe(`and is not the preview site` , () => {
            beforeEach(() => {
                process.env.APP_ENV = 'prod';
                req = {
                    ...baseReq, query: { hostname: configStub.site.prodDomain }
                };
                headerMetaMiddleware(req, res, next);
            });

            it(`should set the req data object to contain 'headerMetaData' object`, () => {
                expect(req.data).to.deep.eq({
                    headerMetaData: {
                        googleTagManagerEnvironment: 'prod',
                        googleTagManagerMasthead: config.gtm.masthead,
                        robots: 'INDEX,FOLLOW'
                    }
                });
            });

            it(`should have called next`, () => {
                expect(next).to.have.been.called;
            });
        });

        describe(`and is the preview site` , () => {
            beforeEach(() => {
                process.env.APP_ENV = 'prod';
                req = {
                    ...baseReq, query: { hostname: configStub.site.prodDomain, preview: 'preview' }
                };
                headerMetaMiddleware(req, res, next);
            });

            it(`should set the robots to NOINDEX,NOFOLLOW`, () => {
                expect(req.data.headerMetaData.robots).to.eq('NOINDEX,NOFOLLOW');
            });

            it(`should have called next`, () => {
                expect(next).to.have.been.called;
            });
        });
    });
});
