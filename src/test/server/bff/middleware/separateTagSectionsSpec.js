import proxyquire, { noCallThru } from 'proxyquire';
import { MiddlewareTestFactory } from '@bxm/unit-test-utils';
import { withCommercialTags, withoutCommercialTags, tagSections, commercialTagSections } from '../../../mocks/tagSections';

const APIUtilsStub = sinon.stub();
const loggerStub = sinon.stub();
const createListingQueryStub = sinon.stub();

noCallThru();

const separateTagSections = proxyquire('../../../../app/server/bff/middleware/separateTagSections', {
    '@bxm/api-utils': APIUtilsStub,
    '../../../../logger': loggerStub,
    '../helper/createListingQuery': createListingQueryStub
}).default;

const middlewareTest = MiddlewareTestFactory(separateTagSections, { baseRequest: { data: {} } });

describe('separateTagSections middleware', () => {
    afterEach(() => {
        APIUtilsStub.reset();
    });

    describe('when there are no tag sections returned from the entity', () => {
        let testArgs;
        let callMiddlware;
        let result;

        before(async () => {
            [testArgs, callMiddlware] = await middlewareTest({ req: { app: { locals: { config: {} } } } });

            const getEntityStub = sinon.stub();

            APIUtilsStub.withArgs(loggerStub, testArgs.req.app.locals.config).returns({
                getEntity: getEntityStub
            });
            getEntityStub.withArgs('alltagsections').resolves([]);

            result = await callMiddlware();
        });

        it('does not modify the request data', () => {
            expect(result.req.data).to.deep.eq(testArgs.req.data);
        });

        it('calls next', () => {
            expect(testArgs.next).to.be.called;
        });
    });
    describe('when there are tag sections', () => {
        describe('and no commercial tag sections', () => {
            let testArgs;
            let callMiddlware;
            let excludeTagQuery;
            let result;

            before(async () => {
                [testArgs, callMiddlware] = await middlewareTest({ req: { app: { locals: { config: {} } } } });

                const getEntityStub = sinon.stub();
                excludeTagQuery = 'mock query';
                APIUtilsStub.withArgs(loggerStub, testArgs.req.app.locals.config).returns({
                    getEntity: getEntityStub
                });
                getEntityStub.withArgs('alltagsections').resolves(withoutCommercialTags);
                createListingQueryStub.withArgs([], { operator: 'ne' }).returns(excludeTagQuery);

                result = await callMiddlware();
            });

            it('adds the tag setions, commercial tag sections and query to exclude commercial tags to the request data', () => {
                expect(result.req.data).to.deep.eq({
                    tagSections: withoutCommercialTags,
                    commercialTagSections: [],
                    excludeTagQuery
                });

                it('calls next', () => {
                    expect(testArgs.next).to.be.called;
                });
            });
        });
        describe('and commercial tag sections', () => {
            let testArgs;
            let callMiddlware;
            let result;
            let excludeTagQuery;

            before(async () => {
                [testArgs, callMiddlware] = await middlewareTest({ req: { app: { locals: { config: {} } } } });

                const getEntityStub = sinon.stub();
                excludeTagQuery = 'mock query';
                APIUtilsStub.withArgs(loggerStub, testArgs.req.app.locals.config).returns({
                    getEntity: getEntityStub
                });
                getEntityStub.withArgs('alltagsections').resolves(withCommercialTags);
                createListingQueryStub.withArgs([], { operator: 'ne' }).returns(excludeTagQuery);

                result = await callMiddlware();
            });

            it('adds the tag sections, commercial tag sections and query to exclude commercial tags to the request data', () => {
                expect(result.req.data).to.deep.eq({
                    tagSections,
                    commercialTagSections,
                    excludeTagQuery
                });
            });

            it('calls next', () => {
                expect(testArgs.next).to.be.called;
            });
        });
    });
});
