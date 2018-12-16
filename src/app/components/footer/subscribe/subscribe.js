import React, { Component, PropTypes } from 'react';
import SubscribeMagBlock from './subscribeMagBlock';

export default class Subscribe extends Component {
    static propTypes = {
        inSideNav: PropTypes.bool
    };

    static defaultProps = {
        inSideNav: false
    };

    static contextTypes = {
        config: PropTypes.object
    };

    fireEvent = () => {
        window.dataLayer.push({ event: 'subscribe.click' });
    };

    render() {
        const content = this.context.config.get('subscribe');

        if (!content) {
            return null;
        }

        const { inSideNav } = this.props;
        const { subscribeHeading, subscribeText, subscribeMagUrl, subscribeIpadUrl, subscribeButtonUrl } = content;
        const xLargeGridClass = !inSideNav ? 'xlarge-6' : '';

        return (
            <div className="subscribe">
                <div className="row">
                    <SubscribeMagBlock inSideNav={inSideNav} subscribeMagUrl={subscribeMagUrl} subscribeIpadUrl={subscribeIpadUrl} />

                    <div className={`small-12 ${xLargeGridClass} medium-6 columns`}>
                        <div className="subscribe__subscribe">
                            <h4 className="subscribe__heading">{subscribeHeading}</h4>
                            <p className="subscribe__content">{subscribeText}</p>
                            <p className="subscribe__action">
                                <a
                                    className="button button--link button--subscribe"
                                    href={subscribeButtonUrl}
                                    target="_blank"
                                    onClick={this.fireEvent}
                                >
                                    Subscribe
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
