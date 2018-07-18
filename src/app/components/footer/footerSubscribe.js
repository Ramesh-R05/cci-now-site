import React, { Component, PropTypes } from 'react';
import Newsletter from '@bxm/newsletter/lib/components/newsletter';
import Subscribe from './subscribe/subscribe';

export default class FooterSubscribe extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        isDisplayed: PropTypes.bool
    };

    static defaultProps = {
        isDisplayed: false
    };

    render() {
        const { url, isDisplayed } = this.props;

        return isDisplayed ? (
            <div id="footer-sign-up" className="row">
                <Newsletter url={url} />
                <Subscribe />
            </div>
        ) : null;
    }
}
