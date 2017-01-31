import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import listingMock from '../../mocks/listing';
import polarConfig from '../../mocks/polar';
const teasers = listingMock.data;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const TeaserListStub = Context.createStubComponent();
const TeaserStub = Context.createStubComponent();

const HeroTeaser = proxyquire('../../../app/components/teaser/grid', {
    '@bxm/teaser/lib/components/teaserList': TeaserListStub,
    './teaser': TeaserStub
}).default;


const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        polar: polarConfig.polarSetting
    }
};

describe('TeaserGridView', () => {
    const imageSizes = {
        s: { w: 690, h: 388 },
        m: { w: 486, h: 404 },
        l: { w: 624, h: 518 },
        xl: { w: 368, h: 306 }
    };
    let reactModule;
    let TeaserGridViewComponent;

    after(Context.cleanup);

    describe('when receiving teasers', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(HeroTeaser, {teasers},[contextConfigStub]);
            TeaserGridViewComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserListStub);
        });

        it(`should render the TeaserList component with relevant props`, () => {
            expect(TeaserGridViewComponent.props).to.deep.eq({
                listClassName: "teaser-view-grid",
                articles: teasers,
                imageSizes,
                showSubSection: true,
                CustomisedTeaser: TeaserStub,
                nativeAdConfig: {}
            })
        });
    });

    describe('when setting the adTargets', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(HeroTeaser, {teasers, adTargets: { position: 2 } },[contextConfigStub]);
            TeaserGridViewComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserListStub);
        });
    });
});
