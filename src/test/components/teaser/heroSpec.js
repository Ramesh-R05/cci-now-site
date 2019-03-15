import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
import { shallow } from 'enzyme';
noCallThru();

const TeaserStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const PromotedStub = Context.createStubComponent();
const SocialContainer = Context.createStubComponent();

const HeroTeaser = proxyquire('../../../app/components/teaser/hero', {
    './teaser': TeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../promoted/promoted': PromotedStub,
    '@bxm/social/lib/components/socialIcons/socialContainer': SocialContainer
}).default;

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

describe('Hero Teaser Component', () => {
    const article = { id: 'HERO-TEASER', title: 'title', source: "Australian women's weekly" };
    const defaultImageSizes = {
        s: { w: 690, h: 575 },
        m: { w: 768, h: 476 },
        l: { w: 636, h: 504 },
        xl: { w: 636, h: 504 }
    };
    const imageSizes = { xl: { w: 636, h: 504 } };
    let reactModule;
    let TeaserComponent;
    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            urls: {
                newsletterUrl: 'http://someurl.com'
            },
            site: {
                defaultSocialLinks: {
                    facebook: 'https://www.facebook.com/nowtoloveau',
                    twitter: 'https://twitter.com/nowtoloveau',
                    instagram: 'https://www.instagram.com/nowtoloveau'
                }
            }
        }
    };

    after(Context.cleanup);

    describe('when not passing an article', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(HeroTeaser, {}, [contextConfigStub]);
        });

        it(`should not render hero teaser`, () => {
            TeaserComponent = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            expect(TeaserComponent.length).to.eq(0);
        });

        it(`should attach \'hero-wrapper--no-teaser\' to wrapper`, () => {
            const wrapper = shallow(<HeroTeaser />, { context: { config: { site: { defaultSocialLinks: {} } } } });
            expect(wrapper.props().className).to.eq('hero-wrapper hero-wrapper--no-teaser');
        });
    });

    describe('when passing an article', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(HeroTeaser, { article }, [contextConfigStub]);
            TeaserComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub);
        });

        it(`should render a div around the teaser component with class 'hero-wrapper'`, () => {
            const wrapper = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'div')[0];
            expect(wrapper.className).to.eq('hero-wrapper');
        });

        it(`should render the teaser component with relevant props`, () => {
            expect(TeaserComponent.props).to.deep.eq({
                className: 'hero-teaser',
                article,
                imageSizes: defaultImageSizes,
                sourceClassName: 'hero-teaser__source',
                showDate: true
            });
        });

        it('should render 1 ad', () => {
            const wrapper = shallow(<HeroTeaser article={article} />, { context: { config: { site: { defaultSocialLinks: {} } } } });
            const elm = wrapper.find(TeaserStub);
            expect(elm.length).to.be.equal(1);
        });
    });

    describe('when passing both article, imageSizes and showDate prop', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(HeroTeaser, { article, imageSizes, showDate: false }, [contextConfigStub]);
            TeaserComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub);
        });

        it(`should pass the imageSize prop to the Teaser component`, () => {
            expect(TeaserComponent.props.imageSizes).to.deep.eq(imageSizes);
        });

        it(`should pass the showDate to the Teaser component`, () => {
            expect(TeaserComponent.props.showDate).to.eq(false);
        });
    });
});
