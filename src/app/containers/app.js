import React, { Component, PropTypes } from 'react';
import { connectToStores, provideContext } from '@bxm/flux';
import { handleHistory } from 'fluxible-router';
import ErrorPage from '../components/page/error';
import { canUseDOM } from 'exenv';

function mapStateToProps(context) {
    return {
        nodeType: context.getStore('PageStore').getNodeType(),
        error: context.getStore('PageStore').getErrorStatus(),
        theme: context.getStore('PageStore').getModule('theme'),
        isNavigateComplete: context.getStore('RouteStore').isNavigateComplete()
    };
}

@connectToStores(['PageStore', 'RouteStore'], mapStateToProps)
class Application extends Component {

    static propTypes = {
        currentRoute: PropTypes.shape({
            url: PropTypes.string.isRequired,
            handler: PropTypes.func.isRequired
        }),
        currentNavigate: PropTypes.shape({
            url: PropTypes.string.isRequired
        }).isRequired,
        currentNavigateError: PropTypes.shape({
            statusCode: PropTypes.number.isRequired
        }),
        nodeType: PropTypes.string.isRequired,
        error: PropTypes.object,
        theme: PropTypes.object
    };

    static defaultProps = {
        error: null,
        theme: {},
        currentRoute: null,
        currentNavigateError: null
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func,
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.region = context.config.site.region;
    }

    componentDidMount() {
        // Temp added here due to unforseen update of versions when updating react.
        // This loads <picture> element in older browsers and IE
        // eslint-disable-next-line global-require
        require('picturefill');
    }

    shouldComponentUpdate(nextProps) {
        return !!nextProps.isNavigateComplete;
    }

    componentDidUpdate(prevProps) {
        const newProps = this.props;
        if (newProps.title === prevProps.title) {
            return;
        }
        document.title = newProps.title;
    }

    render() {
        if (!this.props.currentRoute) {
            return (
                <ErrorPage
                  currentUrl={this.props.currentNavigate.url}
                  status={this.props.currentNavigateError.statusCode}
                />
            );
        }

        if (this.props.error) {
            return (
                <ErrorPage
                  currentUrl={this.props.currentRoute.url}
                  status={this.props.error.status}
                />
            );
        }

        const Handler = this.props.currentRoute.handler;

        const className = canUseDOM ? '' : 'no-js';
        const regionClassName = this.region ? `region--${this.region}` : '';
        return (
            <div className={`${className} ${regionClassName}`}>
                <Handler
                  currentUrl={this.props.currentRoute.url}
                  nodeType={this.props.nodeType}
                  theme={this.props.theme}
                />
            </div>
        );
    }
}

// Unit tests break when provideContext is used as a decorator. handleHistory works fine as a decorator, but to keep
// the pattern consistent with other containers, only the connectToStore is used as a decorator.
export default provideContext(handleHistory(Application), { config: PropTypes.object });
