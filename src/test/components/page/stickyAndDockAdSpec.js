import { shallow } from 'enzyme';
import { betterMockComponentContext } from '@bxm/flux';

const { React, ReactDOM, TestUtils } = betterMockComponentContext();

const topElmStub = <div />;
const bottomElmStub = <div />;

import { UnwrappedStickyAndDockAd } from '../../../app/components/page/stickyAndDockAd';

describe('StickyAndDockAd component', () => {
    const wrapper = shallow(<UnwrappedStickyAndDockAd viewport={{ width: 100 }} />);

    it('should render out the default style', () => {
        expect(wrapper.at(0).props().style).deep.eq({
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1
        });
    });

    it('should render out the children', () => {
        const wrapperWithChildren = shallow(
            <UnwrappedStickyAndDockAd viewport={{ width: 100 }}>
                <section />
            </UnwrappedStickyAndDockAd>
        );
        expect(wrapperWithChildren.find('section')).to.exist;
    });

    describe('when the window size greater than 1200', () => {
        let sandbox;
        const props = {
            viewport: {
                width: 1201
            },
            customiseBreakpoint: 1200,
            bottomElm: bottomElmStub,
            topElm: topElmStub
        };

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('shoud make the component stick to the top of the screen', () => {
            sandbox.stub(UnwrappedStickyAndDockAd.prototype, 'getTopOffset').callsFake(() => {
                return 0;
            });
            const component = TestUtils.renderIntoDocument(<UnwrappedStickyAndDockAd {...props} />);
            const renderedDOM = ReactDOM.findDOMNode(component);
            expect(renderedDOM.querySelector('span').style._values).to.deep.equal({ position: 'fixed', top: '0px' });
        });

        it('shoud make the component stick to the top of the bottom element', () => {
            sandbox.stub(UnwrappedStickyAndDockAd.prototype, 'getTopOffset').callsFake(() => {
                return -500;
            });
            const component = TestUtils.renderIntoDocument(<UnwrappedStickyAndDockAd {...props} />);
            const renderedDOM = ReactDOM.findDOMNode(component);
            expect(renderedDOM.querySelector('span').style._values).to.deep.equal({ position: 'fixed', top: '-500px' });
        });
    });

    describe('when the window size is less than 1200', () => {
        const props = {
            viewport: {
                width: 1100
            },
            customiseBreakpoint: 1200,
            bottomElm: bottomElmStub,
            topElm: topElmStub
        };

        it('shoud make no style change to the component', () => {
            const component = TestUtils.renderIntoDocument(<UnwrappedStickyAndDockAd {...props} />);
            const renderedDOM = ReactDOM.findDOMNode(component);
            expect(renderedDOM.querySelector('span').style._values).to.deep.equal({});
        });
    });
});
