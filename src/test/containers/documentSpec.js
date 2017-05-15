import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const ArticleStub = Context.createStubComponent();
const GalleryPageStub = Context.createStubComponent();
const VerticalGalleryStub = Context.createStubComponent();
const PageStub = Context.createStubComponentWithChildren();
const CustomisedTeaserStub = Context.createStubComponent();
const FooterStub = Context.createStubComponent();
const AdWrapperStub = Context.createStubComponentWithChildren();
const SailthruStub = Context.createStubComponent();

const Document = proxyquire('../../app/containers/document', {
    '@bxm/article/lib/article': ArticleStub,
    './gallery': GalleryPageStub,
    '@bxm/article/lib/gallery': VerticalGalleryStub,
    './page': PageStub,
    '../components/teaser/teaser': CustomisedTeaserStub,
    '../components/article/footer': FooterStub,
    '../components/sailthru/sailthru': SailthruStub,
}).default;

describe('Document Component', () => {
    const headerPinPoints = {expanded: {}};
    const navItems = [];
    const siteName = 'Dolly';
    const articleContent = { title: 'Title Test' };
    let requestContent = { query: {} };

    Context.addStore('articleStore', {
        getContent() {
            return articleContent;
        }
    });

    Context.addStore('PageStore', {
        getRequest() {
            return requestContent;
        }
    });

    describe('when nodeType is Article', () => {
        const nodeType = 'Article';
        let reactModule;

        beforeEach(() => {
            reactModule = Context.mountComponent(Document, {headerPinPoints, navItems, siteName, nodeType, currentUrl: '/url'});
        });

        it(`should render the Article Component passing down relevant props`, () => {
            const ArticleComponent = TestUtils.findRenderedComponentWithType(reactModule, ArticleStub);
            const headerAd = {
                type: 'Ad',
                config: Document.headerAdConfig
            };
            const socialShare = {
                facebook: true,
                pinterest: true
            };

            expect(ArticleComponent.props).to.deep.eq({
                enableTeads: true,
                articleHeaderOrder: ['Source', 'Section', 'Title', 'Summary', 'Date', 'Author', 'NativeAd', 'Hero', headerAd],
                contentBodyConfig: Document.articleContentBodyConfig,
                showAdBeforeRecommendations: true,
                CustomisedTeaser: CustomisedTeaserStub,
                showSocialShare: true,
                socialShare: socialShare,
                theme: {}
            });
        });

        it ('should pass the appropriate props', () => {
            const PageComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
            expect(PageComponent.props).to.deep.contain({
                headerExpanded: false,
                currentUrl: '/url',
                hideFooter: false
            });
        });

        it('should wrap the Article Component and Sailthru Component', () => {
            const ArticleComponent = TestUtils.findRenderedComponentWithType(reactModule, ArticleStub);
            const SailthruComponent = TestUtils.findRenderedComponentWithType(reactModule, SailthruStub);
            const PageComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
            expect(ReactDOM.findDOMNode(PageComponent).innerHTML).to.contain(ReactDOM.findDOMNode(ArticleComponent).outerHTML);
            expect(ReactDOM.findDOMNode(PageComponent).innerHTML).to.contain(ReactDOM.findDOMNode(SailthruComponent).outerHTML);
        });
    });

    describe('when nodeType is Gallery', () => {
        const nodeType = 'Gallery';
        let reactModule;

        describe('and is default Gallery', () => {
            before(() => {
                reactModule = Context.mountComponent(Document, {headerPinPoints, navItems, siteName, nodeType, request: requestContent });
            });

            it(`should render the Gallery Component`, () => {
                TestUtils.findRenderedComponentWithType(reactModule, GalleryPageStub);
            });
        });

        describe('and is Vertical Gallery', () => {
            before(() => {
                requestContent = { query: { g: 'v'} };
                reactModule = Context.mountComponent(Document, {headerPinPoints, navItems, siteName, nodeType, request: requestContent });
            });

            it(`should render the Gallery Component`, () => {
                TestUtils.findRenderedComponentWithType(reactModule, VerticalGalleryStub);
            });

            it(`should render the Sailthru Component`, () => {
                TestUtils.findRenderedComponentWithType(reactModule, SailthruStub);
            });
        });
    });
});

