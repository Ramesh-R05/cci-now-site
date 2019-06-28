import { MiddlewareTestFactory } from '@bxm/unit-test-utils';
import proxyquire, { noCallThru } from 'proxyquire';
import homepageTeasersMock from '../../../mocks/listing';
import homePagEntityMock from '../../../mocks/home';

noCallThru();

const configBase = {
    services: { remote: { entity: 'http://entitiesUrl.com/' } },
    site: { host: 'http://site-host.com' }
};

const repeatableListDataMock = {
    listName: 'Home',
    params: {
        pageNo: 1
    },
    items: [],
    previous: {},
    current: {},
    next: {}
};

const makeRequestStub = sinon.stub();
const getLatestTeasersStub = sinon.stub();
const transformTeaserPageDateCreatedStub = sinon.stub();
const createRepeatableListStub = sinon.stub();

const homeMiddleware = proxyquire('../../../../app/server/bff/middleware/home', {
    '../../makeRequest': makeRequestStub,
    '../api/listing': {
        getLatestTeasers: getLatestTeasersStub
    },
    '../helper/createReapeatableList': createRepeatableListStub,
    '../helper/transformTeaserPageDateCreated': transformTeaserPageDateCreatedStub
}).default;

const MiddlewareTestWrapper = new MiddlewareTestFactory(homeMiddleware, {
    baseRequest: {
        data: {},
        app: {
            locals: {
                config: configBase
            }
        }
    }
});

describe('Home middleware', () => {
    afterEach(() => {
        makeRequestStub.reset();
        getLatestTeasersStub.reset();
        transformTeaserPageDateCreatedStub.reset();
        createRepeatableListStub.reset();
    });

    describe('when the entity request returns an error response', () => {
        let testArgs;
        let result;
        let entityResponse;
        let callMiddleware;

        before(async () => {
            [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                req: { query: {} }
            });

            entityResponse = new Error('request error');
            makeRequestStub.withArgs(`${configBase.services.remote.entity}/homepage`).throws(entityResponse);

            result = await callMiddleware();
        });

        it('should pass error to next middleware', () => {
            expect(testArgs.next).to.be.calledWith(entityResponse);
        });

        it('should not modify the request data object', () => {
            expect(result.req.data).to.be.empty;
        });
    });

    describe('when the remote returns an entity in the response', () => {
        describe('and getLatestTeasers returns the teasers', () => {
            let testArgs;
            let result;
            let entityResponse;
            let listingResponse;
            let callMiddleware;

            before(async () => {
                [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                    req: { query: {} }
                });

                entityResponse = homePagEntityMock;
                listingResponse = homepageTeasersMock;

                makeRequestStub.withArgs(`${configBase.services.remote.entity}/homepage`).resolves(entityResponse);
                getLatestTeasersStub.withArgs(14, 0).resolves(listingResponse);
                transformTeaserPageDateCreatedStub.withArgs(listingResponse.data).returnsArg(0);
                createRepeatableListStub
                    .withArgs({
                        host: configBase.site.host,
                        basePath: '/',
                        pageNo: 1,
                        skip: 0,
                        items: listingResponse.data,
                        totalCount: listingResponse.totalCount,
                        listName: 'home',
                        startFrom: 6
                    })
                    .returns(repeatableListDataMock);

                result = await callMiddleware();
            });

            it('should store the entity in the request data', () => {
                expect(result.req.data)
                    .to.have.property('entity')
                    .and.to.deep.eq(entityResponse);
            });
            it('should store the section in the request data', () => {
                expect(result.req.data)
                    .to.have.property('section')
                    .and.to.deep.eq({
                        id: entityResponse.id,
                        name: 'Home',
                        urlName: 'home'
                    });
            });

            it('should store the listing response teasers in the request data', () => {
                expect(result.req.data)
                    .to.have.property('latestTeasers')
                    .and.to.deep.eq(listingResponse.data);
            });

            it('should store the list property on the request data', () => {
                expect(result.req.data)
                    .to.have.property('list')
                    .and.to.deep.eq(repeatableListDataMock);
            });

            it('should only have the correct keys in the request data', () => {
                expect(result.req.data).to.have.keys(['entity', 'latestTeasers', 'section', 'list']);
            });

            it('should call the next middleware', () => {
                expect(testArgs.next).to.calledOnce;
            });
        });

        describe('and getLatestTeasers returns no teasers', () => {
            let testArgs;
            let result;
            let entityResponse;
            let listingResponse;
            let callMiddleware;

            before(async () => {
                [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                    req: { query: {} }
                });

                entityResponse = homePagEntityMock;
                listingResponse = { data: [], totalCount: 0 };

                makeRequestStub.withArgs(`${configBase.services.remote.entity}/homepage`).resolves(entityResponse);
                getLatestTeasersStub.withArgs(14, 0).resolves(listingResponse);
                transformTeaserPageDateCreatedStub.withArgs(listingResponse.data).returnsArg(0);
                createRepeatableListStub
                    .withArgs({
                        host: configBase.site.host,
                        basePath: '/',
                        pageNo: 1,
                        skip: 0,
                        items: listingResponse.data,
                        totalCount: listingResponse.totalCount,
                        listName: 'home',
                        startFrom: 6
                    })
                    .returns(repeatableListDataMock);

                result = await callMiddleware();
            });

            it('should store the entity in the request data', () => {
                expect(result.req.data)
                    .to.have.property('entity')
                    .and.to.deep.eq(entityResponse);
            });
            it('should store the section in the request data', () => {
                expect(result.req.data)
                    .to.have.property('section')
                    .and.to.deep.eq({
                        id: entityResponse.id,
                        name: 'Home',
                        urlName: 'home'
                    });
            });

            it('should store the listing response teasers in the request data', () => {
                expect(result.req.data)
                    .to.have.property('latestTeasers')
                    .and.to.deep.eq(listingResponse.data);
            });

            it('should store the list property on the request data', () => {
                expect(result.req.data)
                    .to.have.property('list')
                    .and.to.deep.eq(repeatableListDataMock);
            });

            it('should only have the correct keys in the request data', () => {
                expect(result.req.data).to.have.keys(['entity', 'latestTeasers', 'section', 'list']);
            });

            it('should call the next middleware', () => {
                expect(testArgs.next).to.calledOnce;
            });
        });
    });

    describe('when the request contains existing data', () => {
        let testArgs;
        let existingData;
        let result;
        let entityResponse;
        let listingResponse;
        let callMiddleware;

        before(async () => {
            existingData = {
                module: 'value'
            };

            [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                req: { query: {}, data: { ...existingData } }
            });

            entityResponse = homePagEntityMock;
            listingResponse = { data: [], totalCount: 0 };

            makeRequestStub.withArgs(`${configBase.services.remote.entity}/homepage`).resolves(entityResponse);
            getLatestTeasersStub.withArgs(14, 0).resolves(listingResponse);
            transformTeaserPageDateCreatedStub.withArgs(listingResponse.data).returnsArg(0);
            createRepeatableListStub
                .withArgs({
                    host: configBase.site.host,
                    basePath: '/',
                    pageNo: 1,
                    skip: 0,
                    items: listingResponse.data,
                    totalCount: listingResponse.totalCount,
                    listName: 'home',
                    startFrom: 6
                })
                .returns(repeatableListDataMock);

            result = await callMiddleware();
        });

        it('should not overwrite the data in req.data', () => {
            expect(result.req.data)
                .to.have.property('module')
                .and.eq(existingData.module);
        });

        it('should have the correct keys in the request data and the key for the existing data', () => {
            expect(result.req.data).to.have.keys(['entity', 'latestTeasers', 'section', 'list', 'module']);
        });
    });

    describe('when there is a query param', () => {
        const skippedQueries = ['page', 'section', 'tag'];

        skippedQueries.forEach(query => {
            let testArgs;
            let result;
            let callMiddleware;

            before(async () => {
                [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                    req: {
                        query: {
                            [query]: query
                        }
                    }
                });

                result = await callMiddleware();
            });

            describe(`and it contains a ${query} value`, () => {
                it('should call next without making a request', () => {
                    expect(testArgs.next).to.be.called;
                });

                it('should not modify the request data', () => {
                    expect(result.req.data).to.be.empty;
                });
            });
        });
    });

    describe('creates the correct data for the repeatable list', () => {
        describe('when a page number query paramater in the request', () => {
            let testArgs;
            let result;
            let entityResponse;
            let listingResponse;
            let callMiddleware;

            before(async () => {
                [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                    req: { query: { pageNo: 2 } }
                });

                entityResponse = homePagEntityMock;
                listingResponse = homepageTeasersMock;

                makeRequestStub.withArgs(`${configBase.services.remote.entity}/homepage`).resolves(entityResponse);
                getLatestTeasersStub.withArgs(14, (testArgs.req.query.pageNo - 1) * 14).resolves(listingResponse);
                transformTeaserPageDateCreatedStub.withArgs(listingResponse.data).returnsArg(0);
                createRepeatableListStub
                    .withArgs({
                        host: configBase.site.host,
                        basePath: '/',
                        pageNo: testArgs.req.query.pageNo,
                        skip: (testArgs.req.query.pageNo - 1) * 14,
                        items: listingResponse.data,
                        totalCount: listingResponse.totalCount,
                        listName: 'home',
                        startFrom: 6
                    })
                    .returns(repeatableListDataMock);

                result = await callMiddleware();
            });

            it('should store the entity in the request data', () => {
                expect(result.req.data)
                    .to.have.property('entity')
                    .and.to.deep.eq(entityResponse);
            });
            it('should store the section in the request data', () => {
                expect(result.req.data)
                    .to.have.property('section')
                    .and.to.deep.eq({
                        id: entityResponse.id,
                        name: 'Home',
                        urlName: 'home'
                    });
            });

            it('should store the listing response teasers in the request data', () => {
                expect(result.req.data)
                    .to.have.property('latestTeasers')
                    .and.to.deep.eq(listingResponse.data);
            });

            it('should store the list property on the request data', () => {
                expect(result.req.data)
                    .to.have.property('list')
                    .and.to.deep.eq(repeatableListDataMock);
            });

            it('should only have the correct keys in the request data', () => {
                expect(result.req.data).to.have.keys(['entity', 'latestTeasers', 'section', 'list']);
            });

            it('should call the next middleware', () => {
                expect(testArgs.next).to.calledOnce;
            });
        });
    });
});
