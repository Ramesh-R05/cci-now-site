import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import polarConfig from '../mocks/polar';
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const PageStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();
const HeroTeaserStub = Context.createStubComponent();
const TeaserGridViewStub = Context.createStubComponent();
const TeaserListViewStub = Context.createStubComponent();
const RepeatableStub = Context.createStubComponent();
const SocialLinks = Context.createStubComponent();
const StickyAndDockStub = Context.createStubComponent();
const BrandTitleStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponent();
const SubsectionsListStub = Context.createStubComponent();

const SectionContainer = proxyquire('../../app/containers/section', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyAdStub,
    '../components/teaser/grid': TeaserGridViewStub,
    '../components/teaser/list': TeaserListViewStub,
    './page': PageStub,
    '../components/repeatable': RepeatableStub,
    '../components/teaser/hero': HeroTeaserStub,
    '../components/social/block': SocialLinks,
    '../components/page/stickyAndDockAd': StickyAndDockStub,
    '../components/brand/brandTitle': BrandTitleStub,
    '../components/brandTitle': SubsectionsListStub
}).default;

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        site: {
            defaultSocialLinks: {
                facebook: 'https://www.facebook.com/nowtoloveau',
                twitter: 'https://twitter.com/nowtoloveau',
                instagram: 'https://www.instagram.com/nowtoloveau'
            }
        },
        brands: {
            site: [
                {
                    id: 'aww',
                    title: "Australian Women's Weekly",
                    magazineTitle: 'The Weekly',
                    imageUrl: '/assets/images/headerlogos/AWW-logo.svg',
                    url: '/aww',
                    socialLinks: {
                        facebookUrl: 'https://www.facebook.com/WomensWeeklyMag',
                        twitterUrl: 'https://twitter.com/womensweeklymag',
                        instagramUrl: 'https://www.instagram.com/womensweeklymag'
                    }
                }
            ]
        },
        polar: polarConfig.polarSetting
    }
};

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

describe('Section Container', () => {
    Context.addStore('PageStore', {
        getTitle() {
            return 'Title';
        },
        getShortTitle() {
            return 'Short Title';
        },
        getSummary() {
            return 'Summary';
        },
        getImageUrl() {
            return 'Image Url';
        },
        getSubsections() {
            return {};
        }
    });

    Context.addStore('TeaserStore', {
        getLatestTeasers() {
            return [1, 2, 3, 4, 5, 6, 7];
        },

        getList() {
            return {
                items: [[8, 9, 10, 11, 12, 13, 14]]
            };
        },

        getListPrevParams() {
            return {};
        },

        getListNextParams() {
            return {};
        },

        getHeroTeaser() {
            return {};
        }
    });

    after(Context.cleanup);

    it(`should render 1 normal ad in total`, () => {
        const reactModule = Context.mountComponent(SectionContainer, {}, [contextConfigStub]);
        const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        expect(AdComponents.length).to.eq(1);
    });

    it(`should render 1 sticky ad in total`, () => {
        const reactModule = Context.mountComponent(SectionContainer, {}, [contextConfigStub]);
        const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, StickyAdStub);
        expect(AdComponents.length).to.eq(1);
    });

    it('should render a hero teaser', () => {
        const reactModule = Context.mountComponent(SectionContainer, {}, [contextConfigStub]);
        const HeroTeaserComponent = TestUtils.scryRenderedComponentsWithType(reactModule, HeroTeaserStub);
        expect(HeroTeaserComponent.length).to.eq(1);
    });

    it('should render a teaser grid', () => {
        const reactModule = Context.mountComponent(SectionContainer, {}, [contextConfigStub]);
        const TeaserGridViewComponent = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserGridViewStub);
        expect(TeaserGridViewComponent.length).to.eq(1);
    });

    it('should render a teaser grid view with the correct nativeAdConfig prop', () => {
        const reactModule = Context.mountComponent(SectionContainer, {}, [contextConfigStub]);
        const TeaserGridViewComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserGridViewStub);
        expect(TeaserGridViewComponent.props.nativeAdConfig.slotPositionIndex[0].label).to.eq('section_top_feed_1');
    });

    it('should give the headerThemeClassName a value of empty string', () => {
        const reactModule = Context.mountComponent(SectionContainer, {}, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.headerThemeClassName).to.eq('');
    });

    it('should give the pageTitle a value of empty string', () => {
        const reactModule = Context.mountComponent(SectionContainer, {}, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.pageTitle.type).to.eq('h1');
    });

    it('should render the section banner', () => {
        const reactModule = Context.mountComponent(SectionContainer, {}, [contextConfigStub]);
        const div = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'banner-wrapper');
        expect(div).to.exist;
    });
});

describe('Brand Container', () => {
    it('should render a teaser grid view with the correct nativeAdConfig prop', () => {
        const reactModule = Context.mountComponent(SectionContainer, { currentUrl: '/aww', nodeType: 'Brand' }, [contextConfigStub]);
        const TeaserGridViewComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserGridViewStub);
        expect(TeaserGridViewComponent.props.nativeAdConfig).to.eq(true);
    });

    it('should render page with correct brand props', () => {
        const reactModule = Context.mountComponent(SectionContainer, { currentUrl: '/aww', nodeType: 'Brand' }, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.headerThemeClassName).to.eq('header-aww');
    });

    it('should render page with correct pagetitle prop', () => {
        const reactModule = Context.mountComponent(SectionContainer, { currentUrl: '/aww', nodeType: 'Brand' }, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.pageTitle.props.brand).to.deep.eq(contextConfigStub.value.brands.site[0]);
    });

    it('should render page with correct brand props when params are passed through url', () => {
        const reactModule = Context.mountComponent(SectionContainer, { currentUrl: '/aww?pageNo=2', nodeType: 'Brand' }, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.headerThemeClassName).to.eq('header-aww');
    });

    it('should render page with correct pagetitle prop when params are passed through url', () => {
        const reactModule = Context.mountComponent(SectionContainer, { currentUrl: '/aww?pageNo=2', nodeType: 'Brand' }, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.pageTitle.props.brand).to.deep.eq(contextConfigStub.value.brands.site[0]);
    });

    it('should render the section banner', () => {
        const reactModule = Context.mountComponent(SectionContainer, { currentUrl: '/aww?pageNo=2', nodeType: 'Brand' }, [contextConfigStub]);
        const div = ReactDOM.findDOMNode(reactModule).querySelector('.banner-wrapper');
        expect(div).to.not.exist;
    });
});
