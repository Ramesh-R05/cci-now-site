import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const SubscribeStub = Context.createStubComponent();
const NewsletterStub = Context.createStubComponent();

const FooterSubscribe = proxyquire('../../../app/components/footer/footerSubscribe', {
    react: React,
    './subscribe/subscribe': SubscribeStub,
    '@bxm/newsletter/lib/components/newsletter': NewsletterStub
}).default;

const nbAnchors = 4;

describe(`FooterSubscribe`, () => {
    let reactModule;
    let anchors;

    before(() => {
        reactModule = Context.mountComponent(FooterSubscribe);
    });

    it(`should not render the FooterSubscribe Component`, () => {
        expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
    });

    describe('when passing true to isDisplayed prop', () => {
        before(() => {
            reactModule = Context.mountComponent(FooterSubscribe, {
                isDisplayed: true
            });
        });

        it('Should render the footer subscribe', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });
});
