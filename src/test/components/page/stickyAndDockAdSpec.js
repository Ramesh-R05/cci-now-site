import React from 'react';
import ReactDOM from 'react-dom';
import proxyquire from 'proxyquire';
import { shallow, mount } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
proxyquire.noCallThru();

describe('Component', () => {
    const StickyAndDockAd = proxyquire('../../../app/components/page/stickyAndDockAd', {
        '@bxm/behaviour/lib/components/resizeViewport': component => {
            return component;
        }
    }).default;

    describe('StickyAndDockAd', () => {
        const wrapper = shallow(<StickyAndDockAd />);

        it('should render out the default style', () => {
            expect(wrapper.node.props.style).deep.eq({
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1
            });
        });

        it('should render out the children', () => {
            const wrapperWithChildren = shallow(
                <StickyAndDockAd>
                    <section />
                </StickyAndDockAd>
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
                bottomElm: 1,
                topElm: 1
            };

            beforeEach(() => {
                sandbox = sinon.sandbox.create();
            });

            afterEach(() => {
                sandbox.restore();
            });

            it('should make the component stick to the top of the screen', () => {
                sandbox.stub(StickyAndDockAd.prototype, 'getTopOffset').callsFake(() => 0);
                const component = TestUtils.renderIntoDocument(<StickyAndDockAd {...props} />);
                const renderedDOM = ReactDOM.findDOMNode(component);
                expect(renderedDOM.querySelector('span').style._values).to.deep.equal({ position: 'fixed', top: '0px' });
            });

            it('shoud make the component stick to the top of the bottom element', () => {
                sandbox.stub(StickyAndDockAd.prototype, 'getTopOffset').callsFake(() => -500);
                const component = TestUtils.renderIntoDocument(<StickyAndDockAd {...props} />);
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
                bottomElm: 1,
                topElm: 1
            };

            it('shoud make no style change to the component', () => {
                const component = TestUtils.renderIntoDocument(<StickyAndDockAd {...props} />);
                const renderedDOM = ReactDOM.findDOMNode(component);
                expect(renderedDOM.querySelector('span').style._values).to.deep.equal({});
            });
        });
    });
});
