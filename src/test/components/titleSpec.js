import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Title = proxyquire('../../app/components/title', {}).default;

describe(`Title Component`, () => {
    let reactModule;
    const className = 'cust-class';
    const title = 'Title';
    const symbol = '//';

    describe(`when passing all props`, () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(Title, { className, title, symbol });
        });

        it(`should render`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render the component with class '${className}'`, () => {
            expect(ReactDOM.findDOMNode(reactModule).className).to.contain(className);
        });

        it(`should render the title '${title}' in an h1 tag`, () => {
            const h1 = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(ReactDOM.findDOMNode(h1).textContent).to.eq(`${title}`);
        });
    });

    describe(`when passing all props but symbol is empty`, () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(Title, { className, title, symbol: '' });
        });

        it(`should render the title '${title}' in an h1 tag`, () => {
            const h1 = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(ReactDOM.findDOMNode(h1).textContent).to.eq(title);
        });
    });

    describe(`when passing all props but title is empty`, () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(Title, { className, title: '', symbol });
        });

        it(`should not render`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
