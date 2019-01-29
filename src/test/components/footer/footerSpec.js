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
    let footerNavigation;
    let socialLinks;
    let backToTop;

    describe('with default props', () => {
        before(() => {
            reactModule = Context.mountComponent(Footer, {}, [contextConfigStub]);
            footerNavigation = TestUtils.findRenderedComponentWithType(reactModule, FooterNavigationStub);
            socialLinks = TestUtils.findRenderedComponentWithType(reactModule, SocialLinksStub);
            backToTop = TestUtils.findRenderedComponentWithType(reactModule, BackToTopStub);
        });

        it(`should render the FooterNavigation Component`, () => {
            expect(footerNavigation).to.exist;
        });
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
                    modifier
                },
                [contextConfigStub]
            );

            footer = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'footer');
        });

        const expectedModifierClassName = `footer footer--${modifier}`;
        it(`should render footer with the ${expectedModifierClassName} class`, () => {
            expect(footer.className).to.equal(expectedModifierClassName);
        });
    });
});
