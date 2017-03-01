import React, { Component, PropTypes } from 'react';
import Subscribe from './subscribe/subscribe';
import Newsletter from '@bxm/newsletter/lib/components/newsletter';

export default class FooterSubscribe extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
        isDisplayed: PropTypes.bool
    };

    static defaultProps = {
        isDisplayed: false
    };

    render() {
        const { content, url, isDisplayed } = this.props;

        return isDisplayed ? (
            <div id="footer-sign-up" className="row">
                <Newsletter url={url} />
                <Subscribe content={content} />
            </div>
        ) : null;
    }
}
