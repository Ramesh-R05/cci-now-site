import React, {Component, PropTypes} from 'react';
import {connectToStores, provideContext} from '@bxm/flux';
import {handleHistory} from 'fluxible-router';
import platform from '@bxm/ui/lib/common/platform';
import ErrorPage from '../components/page/error';
import {canUseDOM} from 'exenv';

function mapStateToProps(context) {
    return {
        nodeType: context.getStore('PageStore').getNodeType(),
        error: context.getStore('PageStore').getErrorStatus(),
        theme: context.getStore('PageStore').getModule('theme'),
        isNavigateComplete: context.getStore('RouteStore').isNavigateComplete(),
    };
}

@connectToStores(['PageStore', 'RouteStore'], mapStateToProps)
class Application extends Component {

    static propTypes = {
        currentRoute: PropTypes.object,
        userAgent: PropTypes.string,
        nodeType: PropTypes.string,
        error: PropTypes.object,
        theme: PropTypes.object,
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
                    nodeType={this.props.nodeType}
                    theme={this.props.theme} />
            </div>
        );
    }
}

// Unit tests break when provideContext is used as a decorator. handleHistory works fine as a decorator, but to keep
// the pattern consistent with other containers, only the connectToStore is used as a decorator.
export default provideContext(handleHistory(Application), { config: PropTypes.object });
