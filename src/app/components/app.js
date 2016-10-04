import React, {Component, PropTypes} from 'react';
import {connectToStores, provideContext} from '@bxm/flux';
import {handleHistory} from 'fluxible-router';
import platform from '@bxm/ui/lib/common/platform';
import ErrorPage from './page/error';
import {canUseDOM} from 'exenv';

class Application extends Component {

    static propTypes = {
        currentRoute: PropTypes.object,
        userAgent: PropTypes.string,
        nodeType: PropTypes.string,
        error: PropTypes.object,
        isNavigateComplete: PropTypes.bool
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        platform.set(props.userAgent);
    }

    componentDidMount() {
        // Temp added here due to unforseen update of versions when updating react.
        // This loads <picture> element in older browsers and IE
        require('picturefill');
    }

    shouldComponentUpdate(nextProps) {
        return !!nextProps.isNavigateComplete;
    }

    componentDidUpdate(prevProps) {
        let newProps = this.props;
        if (newProps.title === prevProps.title) {
            return;
        }
        document.title = newProps.title;
    }

    render() {
        if (this.props.error) {
            return (
                <ErrorPage
                    currentUrl={ this.props.currentRoute.url }
                    status={this.props.error.status} />
            );
        }

        const Handler = this.props.currentRoute.handler;

        const className = canUseDOM ? '' : 'no-js';
        return (
            <div className={className}>
                <Handler
                    currentUrl={ this.props.currentRoute.url }
                    nodeType={this.props.nodeType} />
            </div>
        );
    }
}

Application = connectToStores(Application, ['PageStore', 'RouteStore'], (context) => {
    return {
        nodeType: context.getStore('PageStore').getNodeType(),
        error: context.getStore('PageStore').getErrorStatus(),
        isNavigateComplete: context.getStore('RouteStore').isNavigateComplete()
    };
});

export default provideContext(handleHistory(Application), {
    config: PropTypes.object
});
