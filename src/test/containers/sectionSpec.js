import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const PageStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();
const HeroTeaserStub = Context.createStubComponent();
const TeaserGridViewStub = Context.createStubComponent();
const TeaserListViewStub = Context.createStubComponent();
const TitleStub = Context.createStubComponent();
const RepeatableStub = Context.createStubComponent();
const SocialLinks = Context.createStubComponent();
const StickyAndDockStub = Context.createStubComponent();

const SectionContainer = proxyquire('../../app/containers/section', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../components/teaser/grid': TeaserGridViewStub,
    '../components/teaser/list': TeaserListViewStub,
    './page': PageStub,
    '../components/repeatable': RepeatableStub,
    '../components/teaser/hero': HeroTeaserStub,
    '../components/social/block': SocialLinks,
    '../components/page/stickyAndDockAd': StickyAndDockStub
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

    it(`should render 2 ads in total`, () => {
        const reactModule = Context.mountComponent(SectionContainer);
        const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        expect(AdComponents.length).to.eq(2);
    });

    it('should render a teaser grid', () => {
        const reactModule = Context.mountComponent(SectionContainer);
        const HeroTeaserComponent = TestUtils.scryRenderedComponentsWithType(reactModule, HeroTeaserStub);
        expect(HeroTeaserComponent.length).to.eq(1);
    });

    it('should render a hero teaser', () => {
        const reactModule = Context.mountComponent(SectionContainer);
        const TeaserGridViewComponent = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserGridViewStub);
        expect(TeaserGridViewComponent.length).to.eq(1);
    });
});
