import React, { Component, PropTypes } from 'react';
import watchResize from '@bxm/behaviour/lib/components/resizeViewport';

const styles = {
    adStyle: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    adContainerStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1
    }
};

class StickyAndDockAd extends Component {
    static displayName = 'StickyAndDockAd';
    static propTypes = {
        offsetTop: PropTypes.number,
        offsetBottom: PropTypes.number,
        viewport: PropTypes.object.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element
        ]),
        adStyle: PropTypes.object,
        adContainerStyle: PropTypes.object,
        customiseBreakpoint: PropTypes.number,
        topElm: PropTypes.element.isRequired,
        bottomElm: PropTypes.element.isRequired
    };

    static defaultProps = {
        offsetTop: 0,
        offsetBottom: 0,
        children: [],
        adStyle: {},
        adContainerStyle: {},
        customiseBreakpoint: 0
    };

    state = {
        styles: {
            stickyContainer: null
        }
    };

    componentDidMount() {
        if (this.props.viewport.width < this.props.customiseBreakpoint) return;

        this.addListener();
        this.onScroll();
    }

    componentWillUnmount() {
        this.removeListener();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.viewport.width < this.props.customiseBreakpoint) {
            this.removeListener();

            this.setState({
                styles: {
                    stickyContainer: null
                }
            });
        } else {
            this.addListener();
        }
    }

    removeListener() {
        window.removeEventListener('scroll', this.onScroll);
    }

    addListener() {
        window.addEventListener('scroll', this.onScroll);
    }

    getTopOffset(el) { // eslint-disable-line class-methods-use-this
        return el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0);
    }

    onScroll = () => {
        const { bottomElm, topElm, offsetTop, offsetBottom } = this.props;
        let style = null;

        if (!topElm && !bottomElm) return;

        const disFromTop = window.pageYOffset;
        const topElmPosition = this.getTopOffset(topElm);
        const bottomElmPosition = this.getTopOffset(bottomElm);
        const bottomBreakPoint = bottomElmPosition - offsetTop - (this.ad.clientHeight || 0);

        if (disFromTop >= bottomBreakPoint - offsetBottom) {
            const top = offsetTop - (disFromTop - bottomBreakPoint) - offsetBottom;
            style = {
                position: 'fixed',
                top
            };
        } else if (disFromTop >= topElmPosition - offsetTop) {
            style = {
                position: 'fixed',
                top: offsetTop
            };
        }

        this.setState({
            styles: {
                stickyContainer: style
            }
        });
    };

    render() {
        const { adStyle, adContainerStyle, children } = this.props;
        const adStyleWithDefault = Object.assign(styles.adStyle, adStyle);
        const adContainerStyleWithDefault = Object.assign(styles.adContainerStyle, adContainerStyle);

        return (
            <div style={adContainerStyleWithDefault}>
                <span style={this.state.styles.stickyContainer}>
                    <div style={adStyleWithDefault} ref={(c) => { this.ad = c; }}>
                        {children}
                    </div>
                </span>
            </div>
        );
    }
}

export default watchResize(StickyAndDockAd);
