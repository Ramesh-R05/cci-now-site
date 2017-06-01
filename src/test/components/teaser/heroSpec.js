import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
import { shallow } from 'enzyme';
noCallThru();

const TeaserStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const PromotedStub = Context.createStubComponent();

const HeroTeaser = proxyquire('../../../app/components/teaser/hero', {
    './teaser': TeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../promoted/promoted': PromotedStub
}).default;

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
}

describe('Hero Teaser Component', () => {
    const article = {id: 'HERO-TEASER', title: 'title', source: 'Australian women\'s weekly'};
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
        });

        it(`should render the teaser component with relevant props`, () => {
            expect(TeaserComponent.props).to.deep.eq({
                className: "hero-teaser",
                article,
                imageSizes: defaultImageSizes,
                sourceClassName: "hero-teaser__source",
                showDate: true
            })
        });

        it('should render 1 ad', () => {
            const wrapper =  shallow(<HeroTeaser article={article} />);
            const elm = wrapper.find(TeaserStub);
            expect(elm.length).to.be.equal(1);
        });
    });

    describe('when passing both article, imageSizes and showDate prop', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(HeroTeaser, {article, imageSizes, showDate: false});
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
