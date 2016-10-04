import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const PageStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();
const TeaserGridViewStub = Context.createStubComponent();
const TeaserListViewStub = Context.createStubComponent();
const TitleStub = Context.createStubComponent();
const RepeatableStub = Context.createStubComponent();

const SectionContainer = proxyquire('../../../app/components/page/section', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../teaser/grid': TeaserGridViewStub,
    '../teaser/list': TeaserListViewStub,
    '../title': TitleStub,
    './wrapper': PageStub,
    '../repeatable': RepeatableStub
}).default;

describe('Section Container', () => {

    Context.addStore('PageStore', {
        getTitle() {
            return 'Title';
        }
    });

    Context.addStore('TeaserStore', {
        getLatestTeasers() {
            return [1, 2, 3, 4, 5, 6, 7];
        },

        getList() {
            return {
                items: [
                    [8, 9, 10, 11, 12, 13, 14]
                ]
            };
        },

        getListPrevParams() {
            return {};
        },

        getListNextParams() {
            return {};
        }
    });

    after(Context.cleanup);

    it(`should render 3 ads in total`, () => {
        const reactModule = Context.mountComponent(SectionContainer);
        const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        expect(AdComponents.length).to.eq(3);
    });
});
