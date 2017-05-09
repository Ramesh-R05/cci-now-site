import proxyquire, {noCallThru} from 'proxyquire';

noCallThru();

let makeRequestStub = (args) => {};

const remoteModuleUrl = 'http://remoteModuleUrl.com/api';
const configStub = {
    services: { remote: { module: remoteModuleUrl } }
};

const getModules = proxyquire('../../../../app/server/bff/api/module', {
    '../../makeRequest': args => makeRequestStub(args),
    '../../../config': configStub
}).default;

describe(`Module API`, () => {
    describe(`#getModules`, () => {
        let footerModuleData;
        let headerModuleData;
        let themeModuleData;
        let heroModuleData;
        let expectedHeroData;

        describe(`when passing no arguments`, () => {
            it(`should return an empty object`, (done) => {
                getModules().then((modules) => {
                    expect(modules).to.deep.eq({});
                    done()
                }).catch(done);
            });
        });

        describe(`when passing 2 arguments`, () => {
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
                    getModules('footer', 'header').then((modules) => {
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
                        getModules('footer', 'header').then((modules) => {
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
                            getModules('footer', 'header').then((modules) => {
                                expect(modules).to.deep.eq({footer: footerModuleData, header: headerModuleData});
                                expect(modules).to.not.have.property('traveltheme');
                                done();
                            }).catch(done);
                        });
                    });
                });

                describe(`and there is a moduleName that contains 'theme'`, () => {
                    beforeEach(() => {
                        footerModuleData = {};
                        themeModuleData = { moduleName: 'traveltheme' };
                        makeRequestStub = sinon.stub().resolves({
                            data: [
                                themeModuleData
                            ]
                        });
                    });

                    it(`should return an object which contains the data for traveltheme`, (done) => {
                        getModules('traveltheme', 'footer').then((modules) => {
                            expect(modules).to.deep.eq({theme: themeModuleData, footer: footerModuleData});
                            done();
                        }).catch(done);
                    });
                });

                describe(`and there is a moduleName equal to 'hero'`, () => {
                    describe(`and there is heroModule data `, () => {
                        before(() => {
                            footerModuleData = {};
                            heroModuleData = { moduleName: 'hero', moduleManualContent: { data: [ { id: "NOW-19532" } ] } };
                            expectedHeroData = { id: 'NOW-19532' };
                            makeRequestStub = sinon.stub().resolves({
                                data: [
                                    heroModuleData
                                ]
                            });
                        });

                        it(`should return an object which contains the data for hero`, (done) => {
                            getModules('hero', 'footer').then((modules) => {
                                expect(modules).to.deep.eq({ hero: expectedHeroData, footer: {} });
                                done();
                            }).catch(done);
                        });
                    });

                    describe(`and there is no heroModule data `, () => {
                        before(() => {
                            heroModuleData = { moduleName: 'hero', moduleManualContent: { data: [] } };
                            makeRequestStub = sinon.stub().resolves({
                                data: [
                                    heroModuleData
                                ]
                            });
                        });

                        it(`should return null`, (done) => {
                            getModules('hero', 'footer').then((modules) => {
                                expect(modules).to.deep.eq({ hero: null, footer: {} });
                                done();
                            }).catch(done);
                        });
                    });
                });
            });
        });
    });
});
