import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();
const parseEntitiesStub = sinon.stub();

const createRepeatableList = proxyquire('../../../../app/server/bff/helper/createReapeatableList', {
    './parseEntity': {
        parseEntities: parseEntitiesStub
    }
}).default;

function baseArgs() {
    return {
        host: 'www.site.com',
        basePath: '/',
        pageNo: 0,
        skip: 5,
        items: [],
        totalCount: 0,
        listName: 'home',
        startFrom: 0
    };
}

const createArray = num => Array.from({ length: num }, (x, i) => i);

describe('createRepeatableList utility function', () => {
    describe('with no arguemnts', () => {
        let result;

        before(() => {
            result = createRepeatableList();
        });

        it('returns an empty object', () => {
            expect(result).to.deep.eq({});
        });
    });

    describe('with valid arguments', () => {
        describe('and page number is equal to 1 item skipped item length is greater than total count', () => {
            let result;
            let args;

            before(() => {
                args = {
                    ...baseArgs(),
                    pageNo: 1,
                    items: createArray(20),
                    totalCount: 20,
                    skip: 5,
                    startFrom: 6,
                    additionalParams: {}
                };

                parseEntitiesStub.returnsArg(0);

                result = createRepeatableList(args);
            });

            it('creates a list object with the listName set', () => {
                const { listName } = args;

                expect(result)
                    .to.have.property('listName')
                    .eq(listName);
            });

            it('creates a list object with the params set', () => {
                const { pageNo } = args;

                expect(result)
                    .to.have.property('params')
                    .deep.eq({ pageNo });
            });

            it('creates a list object previous page set to null', () => {
                expect(result).to.have.property('previous').and.be.null;
            });

            it('creates a list object with a current page property', () => {
                const { basePath, host } = args;

                expect(result)
                    .to.have.property('current')
                    .and.to.deep.eq({
                        path: `${basePath}`,
                        url: `${host}${basePath}`
                    });
            });

            it('creates a list object with a nested array of items cut from the value passed as startFrom', () => {
                const { items, startFrom } = args;

                expect(result)
                    .to.have.property('items')
                    .and.to.deep.eq([items.slice(startFrom)]);
            });

            it('creates a list object with next page set to null', () => {
                expect(result).to.have.property('next').and.be.null;
            });
        });

        describe('and page number is equal to 1 and skipped item length is less than total count', () => {
            let result;
            let args;

            before(() => {
                args = {
                    ...baseArgs(),
                    pageNo: 1,
                    items: createArray(20),
                    totalCount: 52,
                    skip: 5,
                    startFrom: 6,
                    additionalParams: {}
                };

                parseEntitiesStub.returnsArg(0);

                result = createRepeatableList(args);
            });

            it('creates a list object with the list name set', () => {
                const { listName } = args;

                expect(result)
                    .to.have.property('listName')
                    .eq(listName);
            });

            it('creates a list object with the params set', () => {
                const { pageNo } = args;

                expect(result)
                    .to.have.property('params')
                    .deep.eq({ pageNo });
            });

            it('creates a list object with a nested array of items cut from the value passed as startFrom', () => {
                const { items, startFrom } = args;

                expect(result)
                    .to.have.property('items')
                    .and.to.deep.eq([items.slice(startFrom)]);
            });

            it('creates a list object previous page set to null', () => {
                expect(result).to.have.property('previous').and.to.be.null;
            });

            it('creates a list object with current page set', () => {
                const { basePath, host } = args;

                expect(result)
                    .to.have.property('current')
                    .and.to.deep.eq({
                        path: `${basePath}`,
                        url: `${host}${basePath}`
                    });
            });

            it('creates a list object with next page set', () => {
                const { basePath, pageNo, host } = args;

                expect(result)
                    .to.have.property('next')
                    .and.to.deep.eq({
                        path: `${basePath}?pageNo=${pageNo + 1}`,
                        url: `${host}${basePath}?pageNo=${pageNo + 1}`
                    });
            });
        });

        describe('and page number is greater than 1 but not 2 and item skipped item length is less than total count', () => {
            let result;
            let args;

            before(() => {
                args = {
                    ...baseArgs(),
                    pageNo: 3,
                    items: createArray(20),
                    totalCount: 50,
                    skip: 5,
                    startFrom: 6,
                    additionalParams: {}
                };

                parseEntitiesStub.returnsArg(0);

                result = createRepeatableList(args);
            });

            it('creates a list object with the listName set', () => {
                const { listName } = args;

                expect(result)
                    .to.have.property('listName')
                    .eq(listName);
            });

            it('creates a list object with the params set', () => {
                const { pageNo } = args;

                expect(result)
                    .to.have.property('params')
                    .deep.eq({ pageNo });
            });

            it('creates a list object with a previous page property', () => {
                const { basePath, pageNo, host } = args;

                expect(result)
                    .to.have.property('previous')
                    .and.to.deep.eq({
                        path: `${basePath}?pageNo=${pageNo - 1}`,
                        url: `${host}${basePath}?pageNo=${pageNo - 1}`
                    });
            });

            it('creates a list object with a current page property', () => {
                const { basePath, pageNo, host } = args;

                expect(result)
                    .to.have.property('current')
                    .and.to.deep.eq({
                        path: `${basePath}?pageNo=${pageNo}`,
                        url: `${host}${basePath}?pageNo=${pageNo}`
                    });
            });

            it('creates a list object with a nested array of items cut from the value passed as startFrom', () => {
                const { items, startFrom } = args;

                expect(result)
                    .to.have.property('items')
                    .and.to.deep.eq([items.slice(startFrom)]);
            });

            it('creates a list object with a next page property', () => {
                const { basePath, pageNo, host } = args;

                expect(result)
                    .to.have.property('next')
                    .and.to.deep.eq({
                        path: `${basePath}?pageNo=${pageNo + 1}`,
                        url: `${host}${basePath}?pageNo=${pageNo + 1}`
                    });
            });
        });

        describe('and page number is 2 and item skipped item length is less than total count', () => {
            let result;
            let args;

            before(() => {
                args = {
                    ...baseArgs(),
                    pageNo: 2,
                    items: createArray(20),
                    totalCount: 50,
                    skip: 5,
                    startFrom: 6,
                    additionalParams: {}
                };

                parseEntitiesStub.returnsArg(0);

                result = createRepeatableList(args);
            });

            it('creates a list object with the list name set', () => {
                const { listName } = args;

                expect(result)
                    .to.have.property('listName')
                    .eq(listName);
            });

            it('creates a list object with the params set', () => {
                const { pageNo } = args;

                expect(result)
                    .to.have.property('params')
                    .deep.eq({ pageNo });
            });

            it('creates a list object with a nested array of items cut from the value passed as startFrom', () => {
                const { items, startFrom } = args;

                expect(result)
                    .to.have.property('items')
                    .and.to.deep.eq([items.slice(startFrom)]);
            });

            it('creates a list object with a previous page property', () => {
                const { basePath, host } = args;

                expect(result)
                    .to.have.property('previous')
                    .and.to.deep.eq({
                        path: `${basePath}`,
                        url: `${host}${basePath}`
                    });
            });

            it('creates a list object with a current page property', () => {
                const { basePath, pageNo, host } = args;

                expect(result)
                    .to.have.property('current')
                    .and.to.deep.eq({
                        path: `${basePath}?pageNo=${pageNo}`,
                        url: `${host}${basePath}?pageNo=${pageNo}`
                    });
            });

            it('creates a list object with a next page property', () => {
                const { basePath, pageNo, host } = args;

                expect(result)
                    .to.have.property('next')
                    .and.to.deep.eq({
                        path: `${basePath}?pageNo=${pageNo + 1}`,
                        url: `${host}${basePath}?pageNo=${pageNo + 1}`
                    });
            });
        });

        describe('and page number is 2 and item skipped item length is greater than total count', () => {
            let result;
            let args;

            before(() => {
                args = {
                    ...baseArgs(),
                    pageNo: 2,
                    items: createArray(20),
                    totalCount: 19,
                    skip: 5,
                    startFrom: 6,
                    additionalParams: {}
                };

                parseEntitiesStub.returnsArg(0);

                result = createRepeatableList(args);
            });

            it('creates a list object with the list name set', () => {
                const { listName } = args;

                expect(result)
                    .to.have.property('listName')
                    .eq(listName);
            });

            it('creates a list object with the params set', () => {
                const { pageNo } = args;

                expect(result)
                    .to.have.property('params')
                    .deep.eq({ pageNo });
            });

            it('creates a list object with a nested array of items cut from the value passed as startFrom', () => {
                const { items, startFrom } = args;

                expect(result)
                    .to.have.property('items')
                    .and.to.deep.eq([items.slice(startFrom)]);
            });

            it('creates a list object with a previous page property', () => {
                const { basePath, host } = args;

                expect(result)
                    .to.have.property('previous')
                    .and.to.deep.eq({
                        path: `${basePath}`,
                        url: `${host}${basePath}`
                    });
            });

            it('creates a list object with a current page property', () => {
                const { basePath, pageNo, host } = args;

                expect(result)
                    .to.have.property('current')
                    .and.to.deep.eq({
                        path: `${basePath}?pageNo=${pageNo}`,
                        url: `${host}${basePath}?pageNo=${pageNo}`
                    });
            });

            it('creates a list object with a next page property set to null', () => {
                expect(result).to.have.property('next').and.to.be.null;
            });
        });
    });
});
