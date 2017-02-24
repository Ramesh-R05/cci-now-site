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
const PromotedStub = Context.createStubComponent();
const MustReadStub = Context.createStubComponent();

import polarConfig from '../mocks/polar';

const HomeContainer = proxyquire('../../app/containers/home', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    './page': PageStub,
    '../components/teaser/hero': HeroTeaserStub,
    '../components/teaser/grid': TeaserGridViewStub,
    '../components/teaser/list': TeaserListViewStub,
    '../components/trending/trending': TrendingStub,
    '../components/repeatable': RepeatableStub,
    '../components/social/block': SocialLinks,
    '../components/page/stickyAndDockAd': StickyAndDockStub,
    '../components/promoted/promoted':  PromotedStub,
    '../components/mustRead/mustRead':  MustReadStub
}).default;

describe('Home Container', () => {

    let reactModule;

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            polar: polarConfig.polarSetting,
            urls: {
                socialUrls: {
                    facebookUrl: 'https://www.facebook.com/nowtolovenz',
                    twitterUrl: 'https://twitter.com/NowToLovenz',
                    instagramUrl: 'https://www.instagram.com/NowToLovenz'
                }
            }
        }
    };

    Context.addStore('PageStore', {
        getTrendingItems() {
            return [];
        },

        promotedItems() {
            return [];
        },

        getMustReadItems() {
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

    it(`should render MustRead Component`, () => {
        reactModule = Context.mountComponent(HomeContainer, {}, [contextConfigStub]);
        const MustReadComponents = TestUtils.scryRenderedComponentsWithType(reactModule, MustReadStub);
        expect(MustReadComponents.length).to.eq(1);
    });

});
