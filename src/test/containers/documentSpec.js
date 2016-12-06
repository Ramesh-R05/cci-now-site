import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const ArticleStub = Context.createStubComponent();
const GalleryPageStub = Context.createStubComponent();
const PageStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();
const CustomisedTeaserStub = Context.createStubComponent();

const Document = proxyquire('../../app/containers/document', {
    '@bxm/article/lib/article': ArticleStub,
    './gallery': GalleryPageStub,
    './page': PageStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../components/teaser/teaser': CustomisedTeaserStub
}).default;

describe('Document Component', () => {
    const headerPinPoints = {expanded: {}};
    const navItems = [];
    const siteName = 'Dolly';
    const articleContent = { title: 'Title Test' };

    Context.addStore('articleStore', {
        getContent() {
            return articleContent;
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

            expect(ArticleComponent.props).to.deep.eq({
                enableTeads: true,
                articleHeaderOrder: ['Source', 'Section', 'Title', 'Summary', 'Date', 'Author', 'NativeAd', 'Hero', headerAd],
                contentBodyConfig: Document.articleContentBodyConfig,
                showAdBeforeRecommendations: true,
                CustomisedTeaser: CustomisedTeaserStub
            });
        });

    describe(`Page Component`, () => {
        it ('should pass the appropriate props', () => {
            const PageComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
            expect(PageComponent.props).to.deep.contain({
                headerExpanded: false,
                currentUrl: '/url',
                hideFooter: false
            });
        });

        it('should wrap the Article Component ', () => {
            const ArticleComponent = TestUtils.findRenderedComponentWithType(reactModule, ArticleStub);
            const PageComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
            expect(ReactDOM.findDOMNode(PageComponent).innerHTML).to.eq(ReactDOM.findDOMNode(ArticleComponent).outerHTML);
        });
    });

    describe('when nodeType is Gallery', () => {
        const nodeType = 'Gallery';
        let reactModule;
        let adStub;

        beforeEach(() => {
            reactModule = Context.mountComponent(Document, {headerPinPoints, navItems, siteName, nodeType});
            adStub = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
        });

        it(`should render the Gallery Component`, () => {
            TestUtils.findRenderedComponentWithType(reactModule, GalleryPageStub);
        });

        it(`should render an out of page ad`, () => {
            expect(adStub.props).to.contain({
                sizes: 'out-of-page'
            });
        });
    });
  });
});
