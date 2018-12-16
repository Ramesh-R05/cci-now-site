import React, { Component, PropTypes } from 'react';
import { connectToStores } from '@bxm/flux';

class SubscribeMagBlock extends Component {
    static propTypes = {
        inSideNav: PropTypes.bool.isRequired,
        footer: PropTypes.object.isRequired,
        subscribeMagUrl: PropTypes.string.isRequired,
        subscribeIpadUrl: PropTypes.string.isRequired
    };

    render() {
        const { inSideNav, footer, subscribeMagUrl, subscribeIpadUrl } = this.props;

        if (inSideNav) {
            return null;
        }

        return (
            <div className="subscription__image small-12 medium-6 columns">
                <a className="subscription__image--mag" href={subscribeMagUrl} target="_blank">
                    <img className="subs-cover" src={footer.moduleImageUrl} alt="subscribe magazine" />
                </a>
                <a className="subscription__image--ipad" href={subscribeIpadUrl} target="itunes_store">
                    <img className="subs-cover--ipad" src={footer.moduleImageUrl} alt="subscribe ipad" />
                </a>
            </div>
        );
    }
}

export default connectToStores(SubscribeMagBlock, ['PageStore'], context => ({
    footer: context.getStore('PageStore').getFooter()
}));
