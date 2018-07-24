import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        get() {
            return {
                subscribeCoverAltText: "Women's Weekly Cookbooks",
                subscribeHeading: 'More ways to read',
                subscribeText:
                    'Subscribe to our homes mags to gain access to more inspiring homes and gardens, plus renovating, decorating, food and travel stories.',
                subscribeMagUrl: 'https://www.magshop.com.au/store/homestolove',
                subscribeIpadUrl: 'https://www.magshop.com.au/store/homestolove'
            };
        }
    }
};

const SubscribeMagBlockStub = Context.createStubComponent();

const Subscribe = proxyquire('../../../../app/components/footer/subscribe/subscribe', {
    react: React,
    './subscribeMagBlock': SubscribeMagBlockStub
}).default;

describe(`Subscribe`, () => {
    let reactModule;
    let domElement;

    beforeEach(() => {
        reactModule = Context.mountComponent(
            Subscribe,
            {
                inSideNav: false
            },
            [contextConfigStub]
        );
        domElement = ReactDOM.findDOMNode(reactModule);
    });

    afterEach(Context.cleanup);

    it(`should render the Subscribe Component`, () => {
        expect(reactModule).to.exist;
    });

    describe(`SubscribeMagBlock Component`, () => {
        it(`should render the Subscribe Component`, () => {
            expect(reactModule).to.exist;
        });

        it('should pass the appropriate props', () => {
            const SubscribeMagBlockComponent = TestUtils.findRenderedComponentWithType(reactModule, SubscribeMagBlockStub);

            expect(SubscribeMagBlockComponent.props).to.deep.contain({
                inSideNav: false,
                subscribeMagUrl: 'https://www.magshop.com.au/store/homestolove',
                subscribeIpadUrl: 'https://www.magshop.com.au/store/homestolove'
            });
        });
    });

    describe(`#onClick`, () => {
        let datalayerStub;

        beforeEach(() => {
            window.dataLayer = { push() {} };
            datalayerStub = sinon.stub(window.dataLayer, 'push');
            const button = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'button--subscribe');
            TestUtils.Simulate.click(ReactDOM.findDOMNode(button));
        });

        afterEach(() => {
            delete window.dataLayer;
        });

        it('should fire a dataLayer event', () => {
            expect(datalayerStub).to.have.been.calledWith({ event: 'subscribe.click' });
        });
    });
});
