import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createElementWithContext } from 'fluxible-addons-react';
import app from './app';
import AppContainer from './containers/app';
import fluxibleConfigPlugin from 'fluxible-plugin-context-config';
import batchedUpdatePlugin from 'fluxible-addons-react/batchedUpdatePlugin';
import adConfig from './config/ads';
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore';

const dehydratedState = window.App;
const reduxStore = configureStore(dehydratedState.reduxStoreState);

window.React = React; // For chrome dev tool support

app.plug(fluxibleConfigPlugin());
app.plug(batchedUpdatePlugin());

app.rehydrate(dehydratedState, (err, context) => {
    if (err) throw err;
    const userAgent = window.navigator.userAgent;
    adConfig.init(context.getComponentContext().config.site.adTaggingId);
    //const rootElement = ReactDOM.render(createElementWithContext(context, { userAgent }), mountNode, () => {});

    ReactDOM.render(
        <Provider store={reduxStore}>
            <AppContainer />
        </Provider>,
        document.getElementById('app')
    );
});
