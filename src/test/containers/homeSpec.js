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
const TrendingStub = Context.createStubComponent();
const SocialLinks = Context.createStubComponent();
const RepeatableStub = Context.createStubComponent();
const StickyAndDockStub = Context.createStubComponent();

const HomeContainer = proxyquire('../../app/containers/home', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    './page': PageStub,
    '../components/teaser/hero': HeroTeaserStub,
    '../components/teaser/grid': TeaserGridViewStub,
    '../components/teaser/list': TeaserListViewStub,
    '../components/trending/trending': TrendingStub,
    '../components/repeatable': RepeatableStub,
    '../components/social/block': SocialLinks,
    '../components/page/stickyAndDockAd': StickyAndDockStub
}).default;

describe('Home Container', () => {

    let reactModule;

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
        }
    };

    Context.addStore('PageStore', {
        getTrendingItems() {
            return [];
        }
    });

    Context.addStore('TeaserStore', {
        getHeroTeaser() {
            return {id: 'HERO-TEASER'};
        },

        getLatestTeasers() {
            return [1, 2, 3, 4, 5, 6, 7];
        },

        getList() {
            return [8, 9, 10, 11, 12, 13, 14];
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
        reactModule = Context.mountComponent(HomeContainer, {}, [contextConfigStub]);
        const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        expect(AdComponents.length).to.eq(2);
    });

});
