import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const TeaserStub = Context.createStubComponent();

const HeroTeaser = proxyquire('../../../app/components/teaser/hero', {
    '@bxm/teaser/lib/components/teaser': TeaserStub
}).default;

describe('Hero Teaser Component', () => {
    const article = {id: 'HERO-TEASER', title: 'title'};
    const defaultImageSizes = {
        s: { w: 700, h: 583 },
        m: { w: 619, h: 515 },
        l: { w: 810, h: 456 },
        xl: { w: 619, h: 515 }
    };
    const imageSizes = { xl: { w: 619, h: 515 } };
    let reactModule;
    let TeaserComponent;

    after(Context.cleanup);

    describe('when not passing an article', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(HeroTeaser);
        });

        it(`should not render`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('when passing an article', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(HeroTeaser, {article});
            TeaserComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub);
        });

        it(`should render a div around the teaser component with class 'hero-wrapper'`, () => {
            const wrapper = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'div')[0];
            expect(wrapper.props.className).to.eq('hero-wrapper');
            expect(ReactDOM.findDOMNode(wrapper).innerHTML).to.deep.eq(ReactDOM.findDOMNode(TeaserComponent).outerHTML);
        });

        it(`should render the teaser component with relevant props`, () => {
            expect(TeaserComponent.props).to.deep.eq({
                className: "hero-teaser",
                article,
                imageSizes: defaultImageSizes,
                showDateCreated: false,
                showSubSection: true
            })
        });
    });

    describe('when passing both article and imageSizes', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(HeroTeaser, {article, imageSizes});
            TeaserComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub);
        });

        it(`should pass the imageSize prop to the Teaser component`, () => {
            expect(TeaserComponent.props.imageSizes).to.deep.eq(imageSizes);
        })
    });
});
