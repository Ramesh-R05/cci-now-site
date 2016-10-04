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
const InlineGalleryStub = Context.createStubComponent();
const RepeatableStub = Context.createStubComponent();

const HomeContainer = proxyquire('../../../app/components/page/home', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    './wrapper': PageStub,
    '../teaser/hero': HeroTeaserStub,
    '../teaser/grid': TeaserGridViewStub,
    '../teaser/list': TeaserListViewStub,
    '../trending/trending': TrendingStub,
    '../repeatable': RepeatableStub,
    '../social/block': SocialLinks,
    '../inlineGallery/customInlineGallery': InlineGalleryStub
}).default;

describe('Home Container', () => {

    let isGOGEnabled = true;
    let reactModule;

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            isFeatureEnabled() {
                return isGOGEnabled;
            }
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
        getVideoGalleryTeasers() {
            return [1, 2, 3, 4, 5 ,6];
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

    it(`should render 4 ads in total`, () => {
        reactModule = Context.mountComponent(HomeContainer, {}, [contextConfigStub]);
        const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        expect(AdComponents.length).to.eq(4);
    });

    describe(`when the inlineGallery feature is toggled on`, () => {
        before(() => {
            isGOGEnabled = true;
            reactModule = Context.mountComponent(HomeContainer, {}, [contextConfigStub]);
        });

        it(`should render the inlineGallery`, () => {
            const inlineComponents = TestUtils.scryRenderedComponentsWithType(reactModule, InlineGalleryStub);
            expect(inlineComponents.length).to.eq(1);
        });
    });

    describe(`when the inlineGallery feature is toggled off`, () => {
        before(() => {
            isGOGEnabled = false;
            reactModule = Context.mountComponent(HomeContainer, {}, [contextConfigStub]);
        });

        it(`should render the inlineGallery`, () => {
            const inlineComponents = TestUtils.scryRenderedComponentsWithType(reactModule, InlineGalleryStub);
            expect(inlineComponents.length).to.eq(0);
        });
    });


});
