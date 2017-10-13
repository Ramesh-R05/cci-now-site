import { backendLogger as logger } from '@bxm/winston-logger';
import amp from '@bxm/server/lib/middleware/amp';

export default function stubServer(siteServer, siteConfig) {

    const config = siteConfig;
    const server = siteServer;

    server.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTION, POST, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
        return next();
    });

    // Home page only
    server.use(config.services.endpoints.page, (req, res, next) => {
        try{
            if (req.query) {
                const { page, section, tag } = req.query;

                if (page || section || tag) {
                    return next('route');
                }
            }
            const home = require('../../automation/test_data/home').default;
            return res.json(home);
        }catch(e){
            logger.error('contentApi: Error', e);
        }
    });

    // Load More
    server.get(config.services.endpoints.list, function(req, res, next) {
        const loadMoreData = require('../test_data/listing/loadMore').default;
        res.json(loadMoreData);
    });

    // For pages with url /section (a section page)
    server.get(config.services.endpoints.page, (req, res, next) => {
        const { page, section, tag } = req.query;

        if (page || tag) {
            return next('route');
        }

        // /section landing pages and brand landing pages
        if (section === 'section' || section === 'fashion') {
            const section = require('../test_data/listing/section').default;
            return res.json(section);
        } if (section === 'beauty') { //beauty section has the Inskin ad
            const section = require('../test_data/listing/section_inskin').default;
            return res.json(section);
        } if (section === 'aww') { //AWW brand page
            const section = require('../test_data/pages/brand_aww').default;
            return res.json(section);
        } if (section === 'womansday') { //Woman's Day brand page
            const section = require('../test_data/pages/brand_wd').default;
            return res.json(section);
        } if (section === 'good-health') { //Good Health brand page
            const section = require('../test_data/pages/brand_gh').default;
            return res.json(section);
        } if (section === 'okmagazine') { //OK Magazine brand page
            const section = require('../test_data/pages/brand_ok').default;
            return res.json(section);
        } if (section === 'shop-til-you-drop') { //Shop Til You Drop brand page
            const section = require('../test_data/pages/brand_shop').default;
            return res.json(section);
        } if (section === 'nw') { //NW brand page
            const section = require('../test_data/pages/brand_nw').default;
            return res.json(section);
        } if (section === 'take5mag') { //Take 5 brand page
            const section = require('../test_data/pages/brand_take5').default;
            return res.json(section);
        } if (section === 'yours') { //Yours brand page
            const section = require('../test_data/pages/brand_yours').default;
            return res.json(section);
        } if (section === 'mother-and-baby') { //Mother & Baby brand page
            const section = require('../test_data/pages/brand_mb').default;
            return res.json(section);
        } if (section === 'tvweek') { //TV Week brand page
            const section = require('../test_data/pages/brand_tvweek').default;
            return res.json(section);
        } if (section === 'prizestolove') { //Prizes To Love brand page
            const section = require('../test_data/pages/brand_ptl').default;
            return res.json(section);
        } else {
            return next({body: "Could not find the section page", err: null, status: 404});
        }
    });

    // For pages with url /tags/(:tag) (a tag page)
    server.get(config.services.endpoints.page, function(req, res, next) {
        const { page, tag } = req.query;

        if (page) {
            return next('route');
        }

        // /section
        if (tag === 'video') {
            const tagData = require('../test_data/listing/tag').default;
            return res.json(tagData);
        } else {
            return next({body: "Could not find the tag page", err: null, status: 404});
        }
    });

    // For pages with url /section/page (a Gallery or Article page)
    server.get(config.services.endpoints.page, function(req, res, next) {
        const { page } = req.query;
        let data;

        // /anything/page_name_id
        switch (page){
            case 'kendall-jenners-skin-doctor-tells-us-what-mistake-3640':
                data = require('../test_data/pages/article').default;
                break;
            case 'automation-test-article-with-hero-video-3664':
                data = require('../test_data/pages/article_hero_video').default;
                break;
            case 'automation-test-article-with-hero-image-3663':
                data = require('../test_data/pages/article_hero_image').default;
                break;
            case 'automation-test-article-with-social-embed-3663':
                data = require('../test_data/pages/article_social_embeds').default;
                break;
            case 'automation-test-article-with-ad-in-paragraph-18396':
                data = require('../test_data/pages/article_ad_in_paragraph').default;
                break;
            case 'automation-test-gallery-13302':
                data = require('../test_data/pages/gallery').default;
                break;
            case 'automation-test-gallery-inskin-13303':
                data = require('../test_data/pages/gallery_inskin').default;
                break;
            default:
                return next({body: "Could not find the article page", err: null, status: 404});
        }
        return res.json(data);
    });

    server.get('/amp/:section/:subsection/:page', (req, res, next) => {
        const pageId = req.url.match(/\d{3,}/)[0];
        var ampArticle;
        try {
            switch (pageId){
                case '41699':
                    ampArticle = require('../../automation/test_data/pages/article_hero_image').default;
                    res.body = ampArticle;
                    break;
                case '3663':
                    ampArticle = require('../../automation/test_data/pages/article_social_embeds').default;
                    res.body = ampArticle;
                    break;
            }

            next();
        }catch(e){
            logger.error('AMP: Error', e);
            next(e);
        }
    }, amp);

    server.use((err, req, res, next) => {
        return res.status(404).json({response: {...err}});
    });

    logger.info('stub routes added to server');

};
