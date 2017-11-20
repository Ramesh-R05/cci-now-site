import { betterMockComponentContext, connectToStores } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
const ErrorStub = Context.createStubComponent();
const platformStub = {
    set() {}
};
const App = proxyquire('../../app/containers/app', {
    'fluxible-router': { handleHistory: Component => Component },
    '@bxm/flux': { provideContext: Component => Component, connectToStores },
    '../components/page/error': ErrorStub,
    '@bxm/ui/lib/common/platform': platformStub
}).default;

const Handler = Context.createStubComponent();

describe('App Component', () => {
    const title = 'Title';
    const siteName = 'Dolly';
    const nodeType = 'NodeType';
    const themeMock = {
        id: 'NOW-32655',
        dateCreated: '2017-02-07T01:27:43.00Z',
        url: '/modules/hometheme',
        themeName: 'Confetti',
        themeColour: '#31c7ce',
        themeTextColour: '#ffffff',
        themeImage: 'http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/Now/2017/02/08/32655/recording-(3).gif',
        themeAlignment: 'center'
    };
    let error = null;

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            site: {}
        }
    };

    Context.addStore('PageStore', {
        getErrorStatus() {
            return error;
        },
        getTitle() {
            return title;
        },
        getNodeType() {
            return nodeType;
        },
        getModule() {
            return themeMock;
        }
    });

    Context.addStore('RouteStore', {
        isNavigateComplete() {
            return true
        }
    });

    const currentRoute = {
        handler: Handler,
        url: '/url'
    };
    let ErrorComponent;
    let HandlerComponent;
    let reactModule;

    afterEach(Context.cleanup);

    describe(`when error is not defined`, () => {
        beforeEach(() => {
            platformStub.set = sinon.stub();
            reactModule = Context.mountComponent(App, { currentRoute }, [contextConfigStub]);
            HandlerComponent = TestUtils.findRenderedComponentWithType(reactModule, Handler);
            ErrorComponent = TestUtils.scryRenderedComponentsWithType(reactModule, ErrorStub)
        });

        it(`should pass appropriate props to the Handler Component`, () => {
            expect(HandlerComponent.props).to.deep.eq({ currentUrl: currentRoute.url, nodeType, theme: themeMock })
        });

        it(`should not render the Error Component`, () => {
            expect(ErrorComponent.length).to.eq(0);
        });
    });

    describe(`when the error is defined`, () => {
        beforeEach(() => {
            error = {status: 404};
            reactModule = Context.mountComponent(App, { currentRoute }, [contextConfigStub]);
            HandlerComponent = TestUtils.scryRenderedComponentsWithType(reactModule, Handler);
            ErrorComponent = TestUtils.findRenderedComponentWithType(reactModule, ErrorStub)
        });

        afterEach(() => {
            error = null;
        });

        it(`should pass appropriate props to the Error Component`, () => {
            expect(ErrorComponent.props).to.deep.eq({ currentUrl: currentRoute.url, status: error.status })
        });

        it(`should pass the error status code to the Error Component`, () => {
            expect(ErrorComponent.props.status).to.eq(error.status);
        });

        it(`should not render the Handler Component`, () => {
            expect(HandlerComponent.length).to.eq(0);
        });
    });

    describe('when region is NZ', () => {
        beforeEach(() => {
            const contextConfigStub = {
                key: 'config',
                type: '',
                value: {
                    site: {
                        region: 'nz'
                    }
                }
            };
            reactModule = Context.mountComponent(App, { currentRoute }, [contextConfigStub]);
            HandlerComponent = TestUtils.findRenderedComponentWithType(reactModule, Handler);
            ErrorComponent = TestUtils.scryRenderedComponentsWithType(reactModule, ErrorStub)
        });

        it(`should render with className 'region--nz'`, () => {
            const comp = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'region--nz');
            expect(ReactDOM.findDOMNode(comp[0])).to.exist;
        });
    });
});
