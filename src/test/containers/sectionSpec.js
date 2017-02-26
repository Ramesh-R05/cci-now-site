import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import polarConfig from '../mocks/polar';
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
const BrandTitleStub = Context.createStubComponent();

const SectionContainer = proxyquire('../../app/containers/section', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../components/teaser/grid': TeaserGridViewStub,
    '../components/teaser/list': TeaserListViewStub,
    './page': PageStub,
    '../components/repeatable': RepeatableStub,
    '../components/teaser/hero': HeroTeaserStub,
    '../components/social/block': SocialLinks,
    '../components/page/stickyAndDockAd': StickyAndDockStub,
    '../components/brand/brandTitle': BrandTitleStub
}).default;

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        urls: {
            socialUrls: {}
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
        },
        polar: polarConfig.polarSetting
    }
};

describe('Section Container', () => {

    Context.addStore('PageStore', {
        getTitle() {
            return 'Title';
        },
        getShortTitle() {
            return 'Short Title'
        },
        getSummary() {
            return 'Summary'
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
        const reactModule = Context.mountComponent(SectionContainer,{},[contextConfigStub]);
        const AdComponents = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        expect(AdComponents.length).to.eq(2);
    });

    it('should render a teaser grid', () => {
        const reactModule = Context.mountComponent(SectionContainer,{},[contextConfigStub]);
        const HeroTeaserComponent = TestUtils.scryRenderedComponentsWithType(reactModule, HeroTeaserStub);
        expect(HeroTeaserComponent.length).to.eq(1);
    });

    it('should render a hero teaser', () => {
        const reactModule = Context.mountComponent(SectionContainer,{},[contextConfigStub]);
        const TeaserGridViewComponent = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserGridViewStub);
        expect(TeaserGridViewComponent.length).to.eq(1);
    });

    it('should give the headerClassName a value of empty string', () => {
        const reactModule = Context.mountComponent(SectionContainer,{},[contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.headerClassName).to.eq('');
    });

    it('should give the pageTitle a value of empty string', () => {
        const reactModule = Context.mountComponent(SectionContainer,{},[contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.pageTitle.type).to.eq('h1');
    });
});

describe('Brand Container', () => {
    it('should render page with correct brand props', () => {
        const reactModule = Context.mountComponent(SectionContainer, {currentUrl: '/aww', nodeType: 'Brand'}, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.headerClassName).to.eq('header-aww');
    });

    it('should render page with correct pagetitle prop', () => {
        const reactModule = Context.mountComponent(SectionContainer, {currentUrl: '/aww', nodeType: 'Brand'}, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.pageTitle.props.brand).to.deep.eq(contextConfigStub.value.brands.uniheader[0]);
    });

    it('should render page with correct brand props when params are passed through url', () => {
        const reactModule = Context.mountComponent(SectionContainer, {currentUrl: '/aww?pageNo=2', nodeType: 'Brand'}, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.headerClassName).to.eq('header-aww');
    });

    it('should render page with correct pagetitle prop when params are passed through url', () => {
        const reactModule = Context.mountComponent(SectionContainer, {currentUrl: '/aww?pageNo=2', nodeType: 'Brand'}, [contextConfigStub]);
        const PageStubComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
        expect(PageStubComponent.props.pageTitle.props.brand).to.deep.eq(contextConfigStub.value.brands.uniheader[0]);
    });
});
