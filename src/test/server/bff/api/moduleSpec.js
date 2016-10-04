import proxyquire, {noCallThru} from 'proxyquire';

noCallThru();

let makeRequestStub = (args) => {};

const remoteModuleUrl = 'http://remoteModuleUrl.com/api';
const configStub = {
    load() {
        return { services: { remote: { module: remoteModuleUrl } } }
    }
};

const moduleApi = proxyquire('../../../../app/server/bff/api/module', {
    '../../makeRequest': (args) => { return makeRequestStub(args) },
    '@bxm/config': configStub
});

describe(`Module API`, () => {
    describe(`#getModules`, () => {
        let footerModuleData;
        let headerModuleData;

        describe(`when passing no arguments`, () => {
            it(`should return an empty object`, (done) => {
                moduleApi.getModules().then((modules) => {
                    expect(modules).to.deep.eq({});
                    done()
                }).catch(done);
            });
        });

        describe(`when passing 1 argument`, () => {
            afterEach(() => {
                footerModuleData = null;
            });

            describe(`and the response returns an empty object`, () => {
                beforeEach(() => {
                    headerModuleData = [];
                    makeRequestStub = sinon.stub().resolves([]);
                });

                it(`should return an empty array`, (done) => {
                    moduleApi.getModules('header').then((modules) => {
                        expect(makeRequestStub).to.have.been.calledWith(`${remoteModuleUrl}/header`);
                        expect(modules).to.deep.eq(headerModuleData);
                        done();
                    }).catch(done);
                });
            });

            describe(`and the response returns an object with an array of data`, () => {
                describe(`and there is no moduleName that matches what is expected`, () => {
                    beforeEach(() => {
                        headerModuleData = [];
                        makeRequestStub = sinon.stub().resolves({ data: [ { moduleName: 'header' } ] });
                    });

                    it(`should return an empty array`, (done) => {
                        moduleApi.getModules('header').then((modules) => {
                            expect(modules).to.deep.eq(headerModuleData);
                            done();
                        }).catch(done);
                    });
                });

                describe(`and there is a moduleName that matches the arg being passed`, () => {
                    describe(`and there is no moduleManualContent property`, () => {
                        beforeEach(() => {
                            headerModuleData = [];
                            makeRequestStub = sinon.stub().resolves({ data: [ { moduleName: 'header' } ] });
                        });

                        it(`should return an empty array`, (done) => {
                            moduleApi.getModules('header').then((modules) => {
                                expect(modules).to.deep.eq(headerModuleData);
                                done();
                            }).catch(done);
                        });
                    });

                    describe(`and there is a moduleManualContent with a data property`, () => {
                        beforeEach(() => {
                            footerModuleData = { moduleName: 'footer', moduleManualContent: { data: ['footer 1', 'footer 2'] } };
                            makeRequestStub = sinon.stub().resolves({
                                data: [ footerModuleData ]
                            });
                        });

                        it(`should return the footer data`, (done) => {
                            moduleApi.getModules('footer').then((modules) => {
                                expect(modules).to.deep.eq(footerModuleData);
                                done();
                            }).catch(done);
                        });
                    });
                });
            });

            describe(`and the response from the module service returns an error`, () => {
                beforeEach(() => {
                    footerModuleData = ['footer 1', 'footer 2'];
                    makeRequestStub = sinon.stub().rejects({});
                });

                it(`should return an empty object`, (done) => {
                    moduleApi.getModules('footer').then((modules) => {
                        expect(modules).to.deep.eq({});
                        done();
                    }).catch(done);
                });
            });
        });

        describe(`when passing 2 argument`, () => {
            afterEach(() => {
                footerModuleData = null;
                headerModuleData = null;
            });

            describe(`and the response returns an empty object`, () => {
                beforeEach(() => {
                    footerModuleData = {};
                    headerModuleData = [];
                    makeRequestStub = sinon.stub().resolves([]);
                });

                it(`should return an object which contains a footer and header property with an empty array`, (done) => {
                    moduleApi.getModules('footer', 'header').then((modules) => {
                        expect(makeRequestStub).to.have.been.calledWith(`${remoteModuleUrl}/footer,header`);
                        expect(modules).to.deep.eq({footer: footerModuleData, header: headerModuleData});
                        done();
                    }).catch(done);
                });
            });

            describe(`and the response returns an object with an array of data`, () => {
                describe(`and there is a moduleName that matches only one of the items`, () => {
                    beforeEach(() => {
                        footerModuleData = {};
                        headerModuleData = ['header-1', 'header-2'];
                        makeRequestStub = sinon.stub().resolves({
                            data: [ { moduleName: 'header', moduleManualContent: { data: headerModuleData } } ]
                        });
                    });

                    it(`should return an object which contains a footer property with an empty array and the header with data`, (done) => {
                        moduleApi.getModules('footer', 'header').then((modules) => {
                            expect(modules).to.deep.eq({footer: footerModuleData, header: headerModuleData});
                            done();
                        }).catch(done);
                    });
                });

                describe(`and there is a moduleName that matches both args being passed`, () => {
                    describe(`and there is a moduleManualContent with a data property`, () => {
                        beforeEach(() => {
                            footerModuleData = {moduleName: 'footer', moduleManualContent: { data: ['footer 1', 'footer 2'] } };
                            headerModuleData = ['header 1', 'header 2'];
                            makeRequestStub = sinon.stub().resolves({
                                data: [
                                    footerModuleData,
                                    { moduleName: 'header', moduleManualContent: { data: headerModuleData } }
                                ]
                            });
                        });

                        it(`should return an object which contains the data for both footer and header`, (done) => {
                            moduleApi.getModules('footer', 'header').then((modules) => {
                                expect(modules).to.deep.eq({footer: footerModuleData, header: headerModuleData});
                                done();
                            }).catch(done);
                        });
                    });
                });
            });
        });
    });

    describe(`#getHeroTeaser`, () => {
        const heroItems = ['test1', 'test2'];
        let getModulesStub;

        afterEach(() => {
            moduleApi.getModules.restore();
        });

        describe(`when getModules returns a valid array`, () => {
            beforeEach(() => {
                getModulesStub = sinon.stub(moduleApi, 'getModules').resolves(heroItems);
            });

            it('should return the first item in the response', () => {
                moduleApi.getHeroTeaser().then((resp) => {
                    expect(getModulesStub).to.have.been.calledWith('hero');
                    expect(resp).to.eq(heroItems[0]);
                });
            });
        });

        describe(`when getModules returns an object response`, () => {
            beforeEach(() => {
                getModulesStub = sinon.stub(moduleApi, 'getModules').resolves({});
            });

            it('should return null', () => {
                moduleApi.getHeroTeaser().then((resp) => {
                    expect(resp).to.eq(null);
                });
            });
        });

        describe(`when getModules returns an error`, () => {
            beforeEach(() => {
                getModulesStub = sinon.stub(moduleApi, 'getModules').rejects({});
            });

            it('should return null', () => {
                moduleApi.getHeroTeaser().then((resp) => {
                    expect(resp).to.eq(null);
                });
            });
        });
    });
});
