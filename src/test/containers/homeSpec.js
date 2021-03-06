import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const PageStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();
const HeroTeaserStub = Context.createStubComponent();
const TeaserGridViewStub = Context.createStubComponent();
const TeaserListViewStub = Context.createStubComponent();
const SocialLinks = Context.createStubComponent();
const RepeatableStub = Context.createStubComponent();
const StickyAndDockStub = Context.createStubComponent();
const PromotedStub = Context.createStubComponent();
const MustReadStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponent();

import googleNativeAdsConfig from '../mocks/googleNativeAds';

const HomeContainer = proxyquire('../../app/containers/home', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyAdStub,
    './page': PageStub,
    '../components/teaser/hero': HeroTeaserStub,
    '../components/teaser/grid': TeaserGridViewStub,
    '../components/teaser/list': TeaserListViewStub,
    '../components/repeatable': RepeatableStub,
    '../components/social/block': SocialLinks,
    '../components/page/stickyAndDockAd': StickyAndDockStub,
    '../components/promoted/promoted': PromotedStub,
    '../components/mustRead/mustRead': MustReadStub
}).default;

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

describe('Home Container', () => {
    let reactModule;

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            googleNativeAds: googleNativeAdsConfig.googleNativeAdsSetting,
            site: {
                defaultSocialLinks: {
                    facebook: 'https://www.facebook.com/nowtoloveau',
                    twitter: 'https://twitter.com/nowtoloveau',
                    instagram: 'https://www.instagram.com/nowtoloveau'
                }
            }
        }
    };

    Context.addStore('PageStore', {
        promotedItems() {
            return [];
        },

        getMustReadItems() {
            return [];
        }
    });

    Context.addStore('TeaserStore', {
        getHeroTeaser() {
            return { id: 'HERO-TEASER' };
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

    it(`should render 1 normal ad in total`, () => {
        reactModule = Context.mountComponent(HomeContainer, {}, [contextConfigStub]);
        const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        expect(AdComponents.length).to.eq(1);
    });

    it(`should render 1 sticky ad in total`, () => {
        reactModule = Context.mountComponent(HomeContainer, {}, [contextConfigStub]);
        const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, StickyAdStub);
        expect(AdComponents.length).to.eq(1);
    });

    it(`should render MustRead Component`, () => {
        reactModule = Context.mountComponent(HomeContainer, {}, [contextConfigStub]);
        const MustReadComponents = TestUtils.scryRenderedComponentsWithType(reactModule, MustReadStub);
        expect(MustReadComponents.length).to.eq(1);
    });
});
