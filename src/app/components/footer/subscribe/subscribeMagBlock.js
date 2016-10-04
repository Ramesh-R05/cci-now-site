import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';

class SubscribeMagBlock extends Component {
    static propTypes = {
        inSideNav: PropTypes.bool,
        footer: PropTypes.object.isRequired,
        subscribeMagUrl: PropTypes.string,
        subscribeIpadUrl: PropTypes.string
    };

    render() {
        const {inSideNav, footer, subscribeMagUrl, subscribeIpadUrl} = this.props;
        if(inSideNav) return null;


        return (
            <div className="subscription__image small-12 medium-6 columns">
                <a className="subscription__image--mag" href={subscribeMagUrl} target="_blank">
                    <img className="subs-cover" src={footer.moduleImageUrl}/>
                </a>
                <a className="subscription__image--ipad" href={subscribeIpadUrl} target="itunes_store">
                    <img className="subs-cover--ipad" src={footer.moduleImageUrl}/>
                </a>
         </div>
        );
    }
}

export default connectToStores(SubscribeMagBlock, ['PageStore'], (context) => {
    return {
        footer: context.getStore('PageStore').getFooter()
    };
});
