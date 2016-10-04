import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import listingMock from '../../mocks/listing';
const items = listingMock.data;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const TeaserListStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const StickyStub = React.createClass({
    render: function() {
        return <div>{this.props.children}</div>;
    }
});

const TeaserListView = proxyquire('../../../app/components/teaser/list', {
    '@bxm/teaser/lib/components/teaserList': TeaserListStub,
    '@bxm/behaviour/lib/components/sticky': StickyStub,
    '@bxm/ad/lib/google/components/ad': AdStub
}).default;

describe('TeaserListView', () => {
    const imageSizes = {
        s: { w: 323, h: 269 },
        m: { w: 452, h: 254 },
        l: { w: 409, h: 230 },
        xl: { w: 1010, h: 478 }
    };
    let reactModule;
    let TeaserListViewComponent;
    let AdComponent;
    let StickyComponent;

    after(Context.cleanup);

    describe('when receiving teasers', () => {
        describe('and there are more than 1', () => {
            beforeEach(() => {
                reactModule = Context.mountComponent(TeaserListView, {items});
                TeaserListViewComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserListStub);
                AdComponent = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
                StickyComponent = TestUtils.findRenderedComponentWithType(reactModule, StickyStub);
            });

            it(`should render the TeaserList component with relevant props`, () => {
                expect(TeaserListViewComponent.props).to.deep.eq({
                    listClassName: "teaser-view-list",
                    articles: items,
                    imageSizes,
                    showSubSection: true,
                    adConfig: {
                        className: "ad--teaser-list",
                        displayFor: "small",
                        sizes: "mrec",
                        targets: {
                            position: 1
                        }
                    },
                    adPosition: 4
                });
            });

            it(`should render the Ad component with relevant props, inside a sticky Ad`, () => {
                const adDOM = React.findDOMNode(AdComponent);
                const stickyDOM = React.findDOMNode(StickyComponent);
                expect(stickyDOM.innerHTML).to.eq(adDOM.outerHTML);
                expect(AdComponent.props).to.deep.eq({
                    className: 'ad--section-mrec',
                    displayFor: ['medium', 'large', 'xlarge'],
                    sizes: { medium: ['mrec', 'double-mrec'] },
                    targets: { position: 1 }
                });
            });
        });

        describe('and there is only 1', () => {
            beforeEach(() => {
                reactModule = Context.mountComponent(TeaserListView, { items: items.slice(0,1) });
                AdComponent = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
                StickyComponent = TestUtils.scryRenderedComponentsWithType(reactModule, StickyStub);
            });

            it(`should render the Ad component with relevant props, but there should be no sticky block`, () => {
                expect(StickyComponent.length).to.eq(0);
                expect(AdComponent.props).to.deep.eq({
                    className: 'ad--section-mrec',
                    displayFor: ['medium', 'large', 'xlarge'],
                    sizes: { medium: ['mrec', 'double-mrec'] },
                    targets: {position: 1}
                });
            });
        });

        describe('and there are 0', () => {
            beforeEach(() => {
                reactModule = Context.mountComponent(TeaserListView, { items: [] });
            });

            it(`should not render component`, () => {
                expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
            });
        });
    });

    describe('when setting the adTargets', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(TeaserListView, {items, adTargets: { position: 2 }});
            AdComponent = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
        });

        it(`should pass the correct adTargets to the TeaserList component`, () => {
            expect(AdComponent.props).to.deep.eq({
                className: 'ad--section-mrec',
                displayFor: ['medium', 'large', 'xlarge'],
                sizes: { medium: ['mrec', 'double-mrec'] },
                targets: reactModule.props.adTargets
            });
        })
    });
});
