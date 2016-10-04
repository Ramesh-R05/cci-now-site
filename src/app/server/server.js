import * as React from 'react';
import {navigateAction} from 'fluxible-router';
import Server from '@bxm/server';
import env from '@bxm/server/lib/env';
import AdScript from '@bxm/ad/lib/google/components/script';
import {load} from '@bxm/config';
import contentApiStub from '../../automation/test_data/contentApi';
import app from '../app';
import bff from './bff';
import networkHeaderMock from '@bxm/services-stubs/lib/templates/header/header';
// import giphyEmbed from './giphyEmbed';
const config = load();

const server = new Server({
    React: React,
    config: config,
    app: app,
    navigateAction: navigateAction,
    additionalHeadComponents: [AdScript],
    siteMiddlewares: (siteServer) => {
        // Hack to get JS embed working within articles
        // If emebeded directly to the page, ads stop displaying
        // siteServer.get('/giphy/embed', giphyEmbed);
        bff(siteServer);

        if (env.stubbed || env.automation) {
            //Network Header Stub
            siteServer.get('/stub/wn-header', (req, res) => res.json(networkHeaderMock));

            contentApiStub(3000, env.appKey);
        }
    }
});

server.start();
