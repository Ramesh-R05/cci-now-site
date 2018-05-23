import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const PageStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponent();
const TeaserListViewStub = Context.createStubComponent();
const RepeatableStub = Context.createStubComponent();
const SocialLinks = Context.createStubComponent();
const StickyAndDockStub = Context.createStubComponent();
const BrandTitleStub = Context.createStubComponent();

const SearchContainer = proxyquire('../../app/containers/search', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyAdStub,
    '../components/teaser/list': TeaserListViewStub,
    './page': PageStub,
    '../components/repeatable': RepeatableStub,
    '../components/social/block': SocialLinks,
    '../components/page/stickyAndDockAd': StickyAndDockStub,
    '../components/brand/brandTitle': BrandTitleStub
}).default;

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const context = {
    config: {
        urls: {
            socialUrls: {}
        },
        features: {
            headerExpanded: true,
            mustRead: {
                showOutsideContainer: true,
                showInsideContainer: false
            },
            promoted: {
                showBelowHero: false,
                showAboveBottomTeasers: true
            }
        },
        brands: {
            uniheader: [
                {
                    "id": "aww",
                    "title": "Australian Women's Weekly",
                    "magazineTitle": "The Weekly",
                    "imageUrl": "/assets/images/headerlogos/AWW-logo.svg",
                    "url": "/aww",
                    "socialLinks": {
                        "facebookUrl": "https://www.facebook.com/WomensWeeklyMag",
                        "twitterUrl": "https://twitter.com/womensweeklymag",
                        "instagramUrl": "https://www.instagram.com/womensweeklymag"
                    }
                }]
        }
    }
};

describe('Search Container', () => {

    Context.addStore('SearchStore', {
        getTitle() {
            return 'Title';
        },

        getMagazineImageUrl() {
            return 'http://stubbedimages.biz/content.jpg';
        },

        getSearchTotal() {
            return 7;
        },

        getInitialSearchResults() {
            return [1, 2, 3, 4, 5, 6, 7];
        },

        getSearchResultsList() {
            return {
                items: [
                    [8, 9, 10, 11, 12, 13, 14]
                ]
            }
        },

        getSearchListNextParams() {
            return {};
        }
    });

    after(Context.cleanup);

    // TODO - Figure out how to test this properly, possibly using Enzyme.
    // it(`should render 1 normal ad in total`, () => {
    //     const wrapper = shallow(<SearchContainer brand={brandStub} />, { context });
    //
    //     const reactModule = Context.mountComponent(SearchContainer,{},[contextConfigStub]);
    //     const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
    //     expect(AdComponents.length).to.eq(1);
    // });

    // it(`should render 1 sticky ad in total`, () => {
    //     const reactModule = Context.mountComponent(SearchContainer,{},[contextConfigStub]);
    //     const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, StickyAdStub);
    //     expect(AdComponents.length).to.eq(1);
    // });
    //
    // it('should render a teaser list', () => {
    //     const reactModule = Context.mountComponent(SearchContainer,{},[contextConfigStub]);
    //     const TeaserListViewComponent = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserListViewStub);
    //     expect(TeaserListViewComponent.length).to.eq(1);
    // });
});