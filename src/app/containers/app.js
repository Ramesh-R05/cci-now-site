import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connectToStores, provideContext } from '@bxm/flux';
import AdManager from '@bxm/ad/lib/google/components/adManager';
import { handleHistory } from 'fluxible-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ErrorPage from '../components/page/error';

function mapStateToProps(context) {
    return {
        nodeType: context.getStore('PageStore').getNodeType(),
        error: context.getStore('PageStore').getErrorStatus(),
        theme: context.getStore('PageStore').getModule('theme'),
        siteAlert: context.getStore('PageStore').getSiteAlert(),
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
        theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        siteAlert: PropTypes.object,
        isNavigateComplete: PropTypes.bool.isRequired,
        title: PropTypes.string
    };

    static defaultProps = {
        error: null,
        theme: {},
        siteAlert: {},
        currentRoute: null,
        currentNavigateError: null,
        title: ''
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

    componentDidCatch(error, info) {
        // eslint-disable-next-line no-console
        console.log(`error------`, error);
        // eslint-disable-next-line no-console
        console.log(`info----`, info);
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
        const { currentRoute, currentNavigate, error, currentNavigateError, nodeType, theme, siteAlert } = this.props;

        if (!currentRoute) {
            return <ErrorPage currentUrl={currentNavigate && currentNavigate.url} status={currentNavigateError && currentNavigateError.statusCode} />;
        }

        if (error) {
            return <ErrorPage currentUrl={currentRoute && currentRoute.url} status={error.status} />;
        }

        const Handler = (currentRoute && currentRoute.handler) || ErrorPage;

        const muiTheme = getMuiTheme({
            fontFamily: '"Amsi Pro Narrow",sans-serif',
            userAgent: '' // TODO: get userAgent from request header or window.navigator
        });
        const regionClassName = this.region ? `region--${this.region}` : '';

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<style type="text/css">
                            .load-more {
                                display: none !important;
                            }

                            .pagination {
                                padding-left: 15px;
                                padding-right: 15px;
                                width: 100%;
                                float: left;
                                display: block !important;
                                text-align: center;
                            }

                            .pagination .button {
                                margin-left: 10px;
                            }

                            .lazyload {
                                display: none !important;
                            }
                        </style>`
                    }}
                />
                <div className={regionClassName}>
                    <Handler currentUrl={currentRoute && currentRoute.url} nodeType={nodeType} theme={theme} siteAlert={siteAlert} />
                </div>
            </MuiThemeProvider>
        );
    }
}

// Unit tests break when provideContext is used as a decorator. handleHistory works fine as a decorator, but to keep
// the pattern consistent with other containers, only the connectToStore is used as a decorator.
export default provideContext(handleHistory(AdManager(Application)), { config: PropTypes.object });
