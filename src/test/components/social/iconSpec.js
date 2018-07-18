import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
const InlineSVGStub = Context.createStubComponent();

const SocialIcon = proxyquire('../../../app/components/social/icon', {
    'react': React,
    'react-inlinesvg': InlineSVGStub
}).default;

const dataLayerStub = {
    push: sinon.spy()
};

describe(`SocialIcon`, () => {
    const svgFile = 'facebook.svg';
    const name = 'socialName';
    const url = 'http://www.socialpage.com';
    const label = '@IamaLabel';
    const className = `social-link`;

    let previousDataLayer;
    let reactModule;
    let anchor;
    let svgSpan;
    let labelSpan;

    before(() => {
        previousDataLayer = window.dataLayer;
        window.dataLayer = dataLayerStub;

        reactModule = Context.mountComponent(SocialIcon, { svgFile, name, url, label });
        anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a')[0];
        svgSpan = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'social-link__icon')[0];
        labelSpan = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'social-link__label')[0];
    });

    beforeEach(() => {
        dataLayerStub.push.resetHistory();
    });

    after(() => {
        window.dataLayer = previousDataLayer;
    });

    it(`renders`, () => {
        expect(ReactDOM.findDOMNode(reactModule)).to.exist;
    });

    it(`sets the className to "${className} social-link--socialName"`, () => {
        expect(ReactDOM.findDOMNode(reactModule).props.className).to.equal(className + ' social-link--socialName');
    });

    it(`renders the link with href "${url}"`, () => {
        expect(anchor.props.href).to.eq(url);
    });

    it(`renders the label with text "${label}"`, () => {
        expect(ReactDOM.findDOMNode(labelSpan).textContent).to.eq(label);
    });

    it(`sends clicks to the data layer`, () => {
        TestUtils.Simulate.click(anchor);
        expect(dataLayerStub.push).to.have.been.calledOnce;
        expect(dataLayerStub.push).to.have.been.calledWith({
            event: `click:social:${name}`
        });
    });
});


describe(`SocialIcon without URL`, () => {
    const svgFile = 'facebook.svg';
    const name = 'socialName';
    const label = '@IamaLabel';
    const className = `social-link`;

    let reactModule;
    let anchor;
    let svgSpan;
    let labelSpan;

    before(() => {
        reactModule = Context.mountComponent(SocialIcon, { svgFile, name, label });
        anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a')[0];
        svgSpan = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'social-link__icon')[0];
        labelSpan = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'social-link__label')[0];
    });

    it(`renders`, () => {
        expect(ReactDOM.findDOMNode(reactModule)).to.exist;
    });

    it(`sets the className to "${className} social-link--socialName"`, () => {
        expect(ReactDOM.findDOMNode(reactModule).props.className).to.equal(className + ' social-link--socialName');
    });

    it(`should not renders the link`, () => {
        expect(anchor).to.eq(undefined);
    });

    it(`renders the label with text "${label}"`, () => {
        expect(ReactDOM.findDOMNode(labelSpan).textContent).to.eq(label);
    });
});
