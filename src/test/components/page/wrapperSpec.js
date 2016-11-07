import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const OffCanvasStub = Context.createStubComponentWithChildren();
const UniHeaderStub = Context.createStubComponent();
const SiteHeaderStub = Context.createStubComponent();
const SiteFooterStub = Context.createStubComponent();
const NavigationStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();

let reactModuleInstance;
const toggleMenuStub = sinon.stub();
const PageWrapper = proxyquire('../../../app/components/page/wrapper', {
    'react': React,
    '@bxm/nav/lib/components/hamburgerWrapper': (Component) => {
        return class extends React.Component {
            render() {
                reactModuleInstance = Component;
                return <Component { ...this.props } toggleSideMenu={ toggleMenuStub } />;
            }
        };
    },
    '@bxm/nav/lib/components/offcanvas/content': OffCanvasStub,
    '@bxm/site-header': SiteHeaderStub,
    '../footer': SiteFooterStub,
    '../uniheader': UniHeaderStub,
    '@bxm/site-header/lib/components/navigation': NavigationStub,
    '@bxm/ad/lib/google/components/ad': AdStub
}).default;

describe('PageWrapper Component', () => {
    const siteName = 'Dolly';
    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            get() {
                return siteName;
            }
        }
    };
    const headerItems = [
        { name: 'Test 1', url: '/test-1' },
        { name: 'Test 2', url: '/test-2' }];
    let hamburgerItems = [
        { name: 'Test 1', url: '/test-1' },
        { name: 'Test 2', url: '/test-2' },
        { name: 'Test 3', url: '/test-3' },
        { name: 'Test 4', url: '/test-4' }];
    let reactModule;
    let offCanvas;
    let uniHeaderStub;
    let siteHeaderStub;
    let siteFooterStub;
    let navigationStub;
    let closeButton;
    let currentInstance;
    let adStub;

    Context.addStore('NavigationStore', {
        getHeaderItems() {
            return headerItems;
        },

        getHamburgerItems() {
            return hamburgerItems;
        }
    });

    Context.addStore('articleStore', {
        getContent() {
            return { tags: [1,2,3], source: 'wd', pageId: 1234 };
        }
    });

    describe(`when passing all props`, () => {
        const props = {
            className: 'customClass',
            children: <h1>Test Children</h1>,
            headerExpanded: true,
            hideFooter: false,
            menuClasses: 'site-menu',
            currentUrl: '/'
        };

        before(() => {
            reactModule = Context.mountComponent(PageWrapper, props, [contextConfigStub]);
            currentInstance = TestUtils.findRenderedComponentWithType(reactModule, reactModuleInstance);
            offCanvas = TestUtils.findRenderedComponentWithType(reactModule, OffCanvasStub);
            uniHeaderStub = TestUtils.findRenderedComponentWithType(reactModule, UniHeaderStub);
            siteHeaderStub = TestUtils.findRenderedComponentWithType(reactModule, SiteHeaderStub);
            siteFooterStub = TestUtils.findRenderedComponentWithType(reactModule, SiteFooterStub);
            navigationStub = TestUtils.findRenderedComponentWithType(reactModule, NavigationStub);
            adStub = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            closeButton = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'button');
        });

        it(`should render`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render with className "page ${props.className}"`, () => {
            const comp = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, `page ${props.className}`);
            expect(ReactDOM.findDOMNode(comp[0])).to.exist;
        });

        it(`should render a wrapped element inside a className ${props.menuClasses}`, () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, props.menuClasses)[0]).to.exist;
        });

        it(`should render the Uni Header component`, () => {      
            expect(ReactDOM.findDOMNode(uniHeaderStub)).to.exist;      
        });

        it(`should render the Header component, passing the appropriate props`, () => {
            expect(siteHeaderStub.props).to.deep.eq({
                currentUrl: props.currentUrl,
                isExpanded: props.headerExpanded,
                navItems: headerItems,
                siteName: siteName,
                toggleMenu: currentInstance.toggleMenu
            });
        });

        it(`should render the children and footer inside a content-wrapper div`, () => {
            const wrapper = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'content-wrapper');
            expect(ReactDOM.findDOMNode(wrapper).getElementsByTagName('h1')[0].outerHTML + ReactDOM.findDOMNode(siteFooterStub).outerHTML)
                .to.eq(ReactDOM.findDOMNode(wrapper).innerHTML);
        });

        it(`should render the offCanvas menu with the appropriate props`, () => {
            expect(ReactDOM.findDOMNode(offCanvas)).to.exist;
            expect(offCanvas.props).to.deep.contain({
                side: 'left',
                toggleSideMenu: currentInstance.toggleMenu
            });
        });

        it(`should pass the correct props to the Navigation component`, () => {
            const mobileNav = hamburgerItems.slice();
            mobileNav.unshift({name: 'Home', url: '/'});

            expect(navigationStub.props).to.deep.eq({
                className: 'mobile-menu',
                items: mobileNav,
                currentUrl: props.currentUrl
            });
        });

        it(`should pass the toggleMenu function to the button as an onClick`, () => {
            expect(closeButton.props.onClick).to.eq(currentInstance.toggleMenu);
        });

        it(`should render close button and Navigation component as children of the offCanvas component`, () => {
            const offCanvasInnterHTML = ReactDOM.findDOMNode(offCanvas).innerHTML;
            expect(offCanvasInnterHTML).to.contain(React.findDOMNode(navigationStub).outerHTML);
            expect(offCanvasInnterHTML).to.contain(React.findDOMNode(closeButton).outerHTML);
        });

        it('should render an top ad banner', () => {
            expect(adStub[0].props.className).to.be.equal('ad--section-top-leaderboard');
        });

        it(`should render an out of page ad`, () => {
            expect(adStub[1].props).to.contain({
                sizes: 'out-of-page'
            });
        });

        describe(`when the close button is clicked`, () => {
            before(() => {
                TestUtils.Simulate.click(closeButton);
            });

            it(`should call the toggleSideMenu prop with the argument 'left'`, () => {
                toggleMenuStub.should.have.been.calledWith('left');
            });
        });
    });

    describe(`when hiding the footer`, () => {
        const props = {
            className: 'customClass',
            children: <h1>Test Children</h1>,
            headerExpanded: true,
            hideFooter: true,
            menuClasses: 'site-menu',
            siteName: 'Dolly'
        };

        before(() => {
            reactModule = Context.mountComponent(PageWrapper, props, [contextConfigStub]);
        });

        it(`shouldn't render the footer`, () => {
            const footer = TestUtils.scryRenderedComponentsWithType(reactModule, SiteFooterStub);
            expect(footer.length).to.eq(0);
        });
    });

    describe(`when there is no hamburgerNavItems prop`, () => {
        const props = {
            className: 'customClass',
            children: <h1>Test Children</h1>,
            headerExpanded: true,
            hideFooter: false,
            menuClasses: 'site-menu',
            currentUrl: '/'
        };
        let prevItems;

        before(() => {
            prevItems = [ ...hamburgerItems ];
            hamburgerItems = null;
            reactModule = Context.mountComponent(PageWrapper, props, [contextConfigStub]);
            siteHeaderStub = TestUtils.findRenderedComponentWithType(reactModule, SiteHeaderStub);
            navigationStub = TestUtils.findRenderedComponentWithType(reactModule, NavigationStub);
        });

        after(() => {
            hamburgerItems = prevItems;
        });

        it(`should pass the correct props to the Navigation component, containing the headerNavItems props with a link to the home page`, () => {
            const mobileNav = headerItems.slice();
            mobileNav.unshift({name: 'Home', url: '/'});

            expect(navigationStub.props).to.deep.eq({
                className: 'mobile-menu',
                items: mobileNav,
                currentUrl: props.currentUrl
            });
        });
    });
});
