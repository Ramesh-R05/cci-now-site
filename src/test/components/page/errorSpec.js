import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const NavLinkStub = Context.createStubComponent();
const PageStub = Context.createStubComponentWithChildren();

const Error = proxyquire('../../../app/components/page/error', {
    'fluxible-router': { NavLink: NavLinkStub },
    '../../containers/page': PageStub
}).default;

const errorConfigStub = {
    404: {
        title: '404 error title',
        symbol: '#',
        content: ['404 error content'],
        emojiSrc: '/error/emoji.png',
        returnHomeText: 'Return to homepage'
    },
    503: {
        title: '503 error title',
        content: ['503 error content line 1', '503 error content line 2'],
        emojiSrc: '/error/emoji.png',
        returnHomeText: 'Return to homepage'
    }
};

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        error: errorConfigStub
    }
};

describe('ErrorPage Component', () => {
    let reactModule;

    afterEach(Context.cleanup);

    describe('when status is not defined', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(Error, {}, [contextConfigStub]);
        });

        it('should render ', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('should render a 503 h1', () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(ReactDOM.findDOMNode(heading).textContent).to.eq(`${errorConfigStub['503'].title}`);
        });

        it('should render a 500 message', () => {
            const para = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'error-page-container__body-item');
            expect(ReactDOM.findDOMNode(para[0]).textContent).to.contain(errorConfigStub['503'].content[0]);
            expect(ReactDOM.findDOMNode(para[1]).textContent).to.contain(errorConfigStub['503'].content[1]);
        });
    });

    describe('when status is 404', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(Error, { status: 404 }, [contextConfigStub]);
        });

        it('should render ', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('should render a 404 h1', () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(ReactDOM.findDOMNode(heading).textContent).to.eq(`${errorConfigStub['404'].symbol}${errorConfigStub['404'].title}`);
        });

        it('should render a 404 message', () => {
            const para = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'error-page-container__body-item');
            expect(ReactDOM.findDOMNode(para).textContent).to.contain(errorConfigStub['404'].content[0]);
        });

        it('should render an emoji at the end of the last paragraph', () => {
            const lastPara = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'error-page-container__body-item');
            const emoji = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'img');
            console.log(ReactDOM.findDOMNode(lastPara).innerHTML);
            expect(ReactDOM.findDOMNode(lastPara).innerHTML).to.contain(ReactDOM.findDOMNode(emoji).outerHTML);
        });
    });

    describe('when status is 500', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(Error, { status: 500 }, [contextConfigStub]);
        });

        it('should render ', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('should render a 500 h1', () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(ReactDOM.findDOMNode(heading).textContent).to.eq(`${errorConfigStub['503'].title}`);
        });
    });

    describe(`Page Component`, () => {
        const headerPinPoints = { expanded: {} };
        const navItems = [];
        const siteName = 'Dolly';

        beforeEach(() => {
            reactModule = Context.mountComponent(Error, { status: 500, headerPinPoints, navItems, siteName, currentUrl: '/url' }, [
                contextConfigStub
            ]);
        });

        it('should pass the appropriate props', () => {
            const PageComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
            expect(PageComponent.props).to.deep.contain({
                headerExpanded: true,
                className: 'error-page',
                currentUrl: '/url'
            });
        });

        it('should wrap the Error Component ', () => {
            const ErrorContainer = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'error-page-container');
            const PageComponent = TestUtils.findRenderedComponentWithType(reactModule, PageStub);
            expect(ReactDOM.findDOMNode(PageComponent).innerHTML).to.eq(ReactDOM.findDOMNode(ErrorContainer).outerHTML);
        });
    });
});
