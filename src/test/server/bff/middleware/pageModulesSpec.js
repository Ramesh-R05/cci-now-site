import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const APIUtilsStub = sinon.stub();
const getModulesStub = sinon.stub();
const loggerStub = sinon.stub();

const pageModulesMiddleware = proxyquire('../../../../app/server/bff/middleware/pageModules', {
    '@bxm/api-utils': APIUtilsStub,
    '../../../../logger': loggerStub
}).default;

function resetStubs() {
    getModulesStub.reset();
}

describe('PageModules middleware', () => {
    describe('when the response is valid', () => {
        let config;
        let moduleArgs;
        let res;
        let req;
        let moduleResponse;
        let processedModuleResponse;
        let next;

        before(() => {
            config = {
                foo: 'bar'
            };
            req = {
                app: {
                    locals: {
                        config
                    }
                }
            };
            moduleArgs = ['headernavigation', 'hamburgernavigation', 'footer', 'mustread', 'promoted', 'hero', `homehero`, `hometheme`];
            req.app.locals.config = config;

            next = sinon.spy();
            moduleResponse = {
                totalCount: 11,
                data: [
                    {
                        id: 'NOW-32798',
                        url: '/superboosterday/modules/hamburger',
                        moduleName: 'hamburgernavigation',
                        pageDateCreated: '2017-05-24T06:06:04.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-31870',
                        url: '/modules/hamburger',
                        moduleName: 'hamburgernavigation',
                        pageDateCreated: '2016-11-24T03:06:31.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-31869',
                        url: '/modules/header-navigation',
                        moduleName: 'headernavigation',
                        themeColour: '#cccccc',
                        pageDateCreated: '2016-11-24T03:06:13.00Z',
                        themeTextColour: '#000000',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-32797',
                        url: '/superboosterday/modules/header-navigation',
                        moduleName: 'headernavigation',
                        pageDateCreated: '2017-05-24T06:06:04.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-31868',
                        url: '/modules/hero',
                        moduleName: 'hero',
                        moduleTitle: 'Hero Title',
                        pageDateCreated: '2016-11-24T03:06:00.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-32796',
                        url: '/superboosterday/modules/hero',
                        moduleName: 'hero',
                        moduleTitle: 'Hero Title',
                        pageDateCreated: '2017-05-24T06:06:04.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-32655',
                        url: '/modules/hometheme',
                        themeName: 'Royal wedding',
                        moduleName: 'hometheme',
                        themeAlignment: 'center',
                        pageDateCreated: '2017-02-07T01:27:43.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-31884',
                        url: '/modules/must-read',
                        moduleName: 'mustread',
                        pageDateCreated: '2016-12-14T00:37:05.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-32799',
                        url: '/superboosterday/modules/must-read',
                        moduleName: 'mustread',
                        pageDateCreated: '2017-05-24T06:06:04.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-32800',
                        url: '/superboosterday/modules/promoted',
                        moduleName: 'promoted',
                        moduleTitle: 'KICKSTART 2017',
                        pageDateCreated: '2017-05-24T06:06:04.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    },
                    {
                        id: 'NOW-31903',
                        url: '/modules/promoted',
                        moduleName: 'promoted',
                        moduleTitle: 'KICKSTART 2017',
                        pageDateCreated: '2016-12-16T05:02:18.00Z',
                        moduleManualContent: { data: [], totalCount: 0 }
                    }
                ]
            };
            processedModuleResponse = {
                headernavigation: [],
                hamburgernavigation: [],
                footer: {},
                mustread: [],
                promoted: { items: [], title: 'KICKSTART 2017' },
                hero: null,
                homehero: [],
                theme: {
                    id: 'NOW-32655',
                    url: '/modules/hometheme',
                    themeName: 'Royal wedding',
                    moduleName: 'hometheme',
                    themeAlignment: 'center',
                    pageDateCreated: '2017-02-07T01:27:43.00Z',
                    moduleManualContent: { data: [], totalCount: 0 }
                }
            };

            APIUtilsStub.withArgs(loggerStub, config).returns({
                getModules: getModulesStub
            });

            getModulesStub.withArgs(moduleArgs, sinon.match.func).callsArgWith(1, moduleArgs, moduleResponse);
        });

        after(resetStubs);

        it('should set `req.data.headernavigation` to equal the response', done => {
            pageModulesMiddleware(req, res, next)
                .then(() => {
                    expect(req.data).to.deep.eq(processedModuleResponse);
                    expect(next).to.be.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('when the response returns an error', () => {
        let config;
        let res;
        let error;
        let req;
        let next;

        before(() => {
            config = {
                foo: 'bar'
            };
            req = {
                app: { locals: { config } },
                query: {}
            };

            error = {
                status: 500,
                text: 'something did not go right'
            };

            next = sinon.spy();
            APIUtilsStub.withArgs(loggerStub, config).returns({
                getModules: getModulesStub
            });

            getModulesStub.rejects(error);
        });

        after(resetStubs);

        it('should have not changed `req.data` and call next with the error', done => {
            pageModulesMiddleware(req, res, next)
                .then(() => {
                    expect(req).to.deep.eq(req);
                    expect(next).to.be.calledWith(error);
                    done();
                })
                .catch(done);
        });
    });
});
