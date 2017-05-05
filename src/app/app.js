import { Flux, servicesPlugin } from '@bxm/flux';
import batchedUpdatePlugin from 'fluxible-addons-react/batchedUpdatePlugin';
import AppComponent from './containers/app';
import pageService from './services/page';
import listService from './services/list';
import networkHeaderService from '@bxm/header/lib/header/headerService';
import adConfig from './config/ads';
import AdStore from '@bxm/ad/lib/google/stores/ad';
import ArticleStore from '@bxm/article/lib/stores/articleStore';
import VerticalGalleryStore from '@bxm/article/lib/stores/verticalGalleryStore';
import GalleryPageStore from '@bxm/gallery/lib/stores/galleryPage';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import HtmlStore from '@bxm/server/lib/stores/html';
import NavigationStore from '@bxm/site-header/lib/stores/navigation';
import NetworkHeaderStore from '@bxm/header/lib/header/headerStore';
import PageStore from './stores/page';
import PolarAdStore from '@bxm/ad/lib/polar/stores/PolarAdStore';
import RouteStore from './stores/route';
import SocialStore from '@bxm/social/lib/stores/social';
import TeaserStore from './stores/teaser';
import TrackingStore from './stores/tracking';
import { load, configPlugin } from '@bxm/config';
const config = load();

const adTaggingId = config.site.adTaggingId;
adConfig.init(adTaggingId);

const app = new Flux({
    component: AppComponent,
    stores: [
        AdStore,
        ArticleStore,
        VerticalGalleryStore,
        GalleryPageStore,
        GalleryStore,
        HtmlStore,
        NavigationStore,
        NetworkHeaderStore,
        PageStore,
        PolarAdStore,
        RouteStore,
        SocialStore,
        TeaserStore,
        TrackingStore
    ]
});

const configsPlugin = configPlugin(config);
const servicePlugin = servicesPlugin(config);
servicePlugin.registerService(pageService);
servicePlugin.registerService(listService);
servicePlugin.registerService(networkHeaderService);

app.plug(batchedUpdatePlugin());
app.plug(servicePlugin);
app.plug(configsPlugin);

export default app;
