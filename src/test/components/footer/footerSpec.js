import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const SocialLinksStub = Context.createStubComponentWithChildren();
const FooterNavigationStub = Context.createStubComponentWithChildren();
const SubscribeStub = Context.createStubComponentWithChildren();
const NewsletterStub = Context.createStubComponent();
const BackToTopStub = Context.createStubComponent();
const LogosStub = Context.createStubComponent();
const Footer = proxyquire('../../../app/components/footer', {
    react: React,
    './subscribe/subscribe': SubscribeStub,
    './footerNavigation': FooterNavigationStub,
    '@bxm/newsletter/lib/components/newsletter': NewsletterStub,
    '../social/block': SocialLinksStub,
    '@bxm/ui/lib/back-to-top/backToTop': BackToTopStub,
    '../page/logos': LogosStub
}).default;

describe(`Footer`, () => {
    const configData = {
        subscribe: {
            subscribeCoverImage: 'magazines.png',
            subscribeCoverAltText: "Women's Weekly Cookbooks",
            subscribeHeading: 'More ways to read',
            subscribeText:
                'Subscribe to our homes mags to gain access to more inspiring homes and gardens, plus renovating, decorating, food and travel stories.',
            subscribeUrl: 'https://www.magshop.com.au/store/homestolove'
        },
        newsletterIframeUrl: 'https://iframe.url.com',
        urls: {
            footerUrls: {
                privacy: 'http://www.bauer-media.com.au/privacy',
                advertise: 'http://www.bauer-media.com.au/advertising/advertise-with-us',
                terms: 'http://www.bauer-media.com.au/terms/website-terms'
            }
        }
    };
    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            urls: configData.urls,
            get(arg) {
                if (arg === 'subscribe') return configData.subscribe;
                if (arg === 'newsletterIframeUrl') return configData.newsletterIframeUrl;
            }
        }
    };
    let reactModule;
    let subscribe;
    let footerNavigation;
    let newsletter;
    let socialLinks;
    let backToTop;
    let logos;

    describe('with default props', () => {
        before(() => {
            reactModule = Context.mountComponent(Footer, {}, [contextConfigStub]);
            //-------------the subscribe iframe will be used in future so the tests aren't being removed.----------
            //subscribe = TestUtils.findRenderedComponentWithType(reactModule, SubscribeStub);
            footerNavigation = TestUtils.findRenderedComponentWithType(reactModule, FooterNavigationStub);
            //-------------the subscribe iframe will be used in future so the tests aren't being removed.----------
            //newsletter = TestUtils.findRenderedComponentWithType(reactModule, NewsletterStub);
            socialLinks = TestUtils.findRenderedComponentWithType(reactModule, SocialLinksStub);
            backToTop = TestUtils.findRenderedComponentWithType(reactModule, BackToTopStub);
            logos = TestUtils.findRenderedComponentWithType(reactModule, LogosStub);
        });

        //-------------the subscribe iframe will be used in future so the tests aren't being removed.----------
        // it(`should render the Subscribe Component`, () => {
        //     expect(subscribe).to.exist;
        // });

        // it(`should set the subscribe 'content' props to correct config`, () => {
        //     expect(subscribe.props.content).to.deep.equal(configData.subscribe);
        // });

        it(`should render the FooterNavigation Component`, () => {
            expect(footerNavigation).to.exist;
        });

        //-------------the subscribe iframe will be used in future so the tests aren't being removed.----------
        // it(`should render the Newsletter Component`, () => {
        //     expect(newsletter).to.exist;
        // });

        // const expectedIframeUrl = `${configData.newsletterIframeUrl}!wnfooter`;
        // it(`should set newsletter 'url' prop to ${expectedIframeUrl}`, () => {
        //     expect(newsletter.props.url).to.equal(expectedIframeUrl);
        // });

        it(`should render the socialLinks Component`, () => {
            expect(socialLinks).to.exist;
        });

        const expectedBackToTopClassName = 'button';
        it(`should render the BackToTop with the classname prop equal to ${expectedBackToTopClassName} `, () => {
            expect(backToTop.props.className).to.equal(expectedBackToTopClassName);
        });
    });

    describe('with a modifier prop', () => {
        const modifier = 'article';
        let footer;

        before(() => {
            reactModule = Context.mountComponent(
                Footer,
                {
                    modifier: modifier
                },
                [contextConfigStub]
            );

            footer = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'footer');
        });

        const expectedModifierClassName = `footer footer--${modifier}`;
        it(`should render footer with the ${expectedModifierClassName} class`, () => {
            expect(footer.props.className).to.equal(expectedModifierClassName);
        });
    });
    //-------------the subscribe iframe will be used in future so the tests aren't being removed.----------
    // describe('with an iframeKey prop', () => {
    //     const iframeKey = 'article';
    //     const expectedIframeUrl = `${configData.newsletterIframeUrl}!${iframeKey}`;

    //     before(() => {
    //         reactModule = Context.mountComponent(Footer, {
    //             iframeKey: iframeKey,
    //         }, [contextConfigStub]);

    //         newsletter = TestUtils.findRenderedComponentWithType(reactModule, NewsletterStub);
    //     });

    //     it(`should set newsletter 'url' prop to ${expectedIframeUrl}`, () => {
    //         expect(newsletter.props.url).to.equal(expectedIframeUrl);
    //     });
    // });
});
