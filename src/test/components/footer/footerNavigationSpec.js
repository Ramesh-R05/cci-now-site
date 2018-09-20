import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const FooterNavigation = proxyquire('../../../app/components/footer/footerNavigation', {
    react: React
}).default;

const nbAnchors = 4;
const footerUrls = {
    privacy: 'http://www.testurl.com/privacy',
    advertise: 'http://www.testurl.com/advertise',
    terms: 'http://www.testurl.com/terms'
};

describe(`FooterNavigation`, () => {
    let reactModule;
    let anchors;
    let anchorHrefs;

    describe(`rendering footer without props`, () => {
        before(() => {
            reactModule = Context.mountComponent(FooterNavigation);
            anchors = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, `a`);
        });

        it(`shouldnt render the FooterNavigation Component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.eq(null);
        });
    });

    describe(`rendering footer with props`, () => {
        before(() => {
            reactModule = Context.mountComponent(FooterNavigation, { footerUrls });
            anchors = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, `a`);
        });

        it(`should render default anchor urls if nothing is passed`, () => {
            anchorHrefs = [];
            anchors.forEach(a => {
                anchorHrefs.push(a.props.href);
            });

            expect(anchorHrefs).to.deep.eq(['http://www.testurl.com/privacy', 'http://www.testurl.com/advertise', 'http://www.testurl.com/terms']);
        });
    });
});
