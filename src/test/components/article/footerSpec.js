import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const SiteFooterStub = Context.createStubComponent();

const ArticleFooter = proxyquire('../../../app/components/article/footer', {
    [`../../../app-${process.env.APP_KEY}/components/article/footer`]: null,
    '../footer': SiteFooterStub
}).default;

describe('ArticleFooter Component', () => {
    let reactModule;

    describe('site footer', () => {
        let SiteFooterComponent;

        beforeEach(() => {
            reactModule = Context.mountComponent(ArticleFooter);
            SiteFooterComponent = TestUtils.findRenderedComponentWithType(reactModule, SiteFooterStub);
        });

        it(`should pass the appropriate props`, () => {
            expect(SiteFooterComponent.props).to.deep.eq({
                iframeKey: "wnfooter",
                modifier :"article"
            });
        });
    });
});
