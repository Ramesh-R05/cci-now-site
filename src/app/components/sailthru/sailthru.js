import React, { PropTypes, Component } from 'react';
import loadScript from '@bxm/react-script-loader';
import { get } from 'lodash';

@loadScript((props, context) => context.config.isFeatureEnabled('sailthru') ? get(context, 'config.sailthru.scriptUrl', null) : null)
class Sailthru extends Component {

    static contextTypes = {
        config: PropTypes.object
    };

    static propTypes = {
        isScriptLoaded: PropTypes.bool
    }

    static defaultProps = {
        isScriptLoaded: false
    };

    constructor(props, context) {
        super(props, context);
        this.isSailthruEnabled = context.config.isFeatureEnabled('sailthru');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isScriptLoaded && !this.props.isScriptLoaded && this.isSailthruEnabled) {
            const customerId = get(this.context, 'config.sailthru.customerId', '');
            const scriptElemInit = document.createElement('script');
            scriptElemInit.innerHTML = `Sailthru.init({ customerId: '${customerId}' });console.log('Sailthru Loaded...');`;
            this.sailthruContainer.appendChild(scriptElemInit);
        }
    }

    render() {
        if (!this.isSailthruEnabled) return null;
        return (<div ref={(ref) => { this.sailthruContainer = ref; }} id="sailthruContainer" />);
    }
}

export default Sailthru;
