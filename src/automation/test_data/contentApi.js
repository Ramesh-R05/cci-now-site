import { load } from '@bxm/config';
import express from 'express';
const config = load();

export default function start(port, site) {
    const siteRouter = require(`../../app/automation/contentApi`).default;
    const server = express();

    server.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTION, POST, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
        next();
    });

    server.use(config.services.endpoints.page, siteRouter);

    // Home page only
    server.use(config.services.endpoints.page, (req, res, next) => {
        try{
            if (req.query) {
                const { page, section, tag } = req.query;

                if (page || section || tag) {
                    next('route');
                    return
                }
            }
            const home = require('../../automation/test_data/home').default;
            res.json(home);
        }catch(e){
            console.error('contentApi: Error', e);
        }
    });

    // For pages with url /section (a section page)
    server.get(config.services.endpoints.page, (req, res, next) => {
        const { page, section, tag } = req.query;

        if (page || tag) {
            next('route');
            return
        }

        // /section and fashion page
        if (section === 'section' || section === 'fashion') {
            const section = require('../test_data/listing/section').default;
            res.json(section);
        } if (section === 'beauty') { //beauty section has the Inskin ad
            const section = require('../test_data/listing/section_inskin').default;
            res.json(section);
        } else {
            next({body: "Could not find the section page", err: null, status: 404});
        }
    });

    // For pages with url /tags/(:tag) (a tag page)
    server.get(config.services.endpoints.page, function(req, res, next) {
        const { page, tag } = req.query;

        if (page) {
            next('route');
            return
        }

        // /section
        if (tag === 'video') {
            const tagData = require('../test_data/listing/tag').default;
            res.json(tagData);
        } else {
            next({body: "Could not find the tag page", err: null, status: 404});
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
            case 'automation-test-gallery-13302':
                data = require('../test_data/pages/gallery').default;
                break;
            case 'automation-test-gallery-inskin-13303':
                data = require('../test_data/pages/gallery_inskin').default;
                break;
            default:
                next({body: "Could not find the article page", err: null, status: 404});
        }
        res.json(data);
    });

    server.use((err, req, res, next) => {
        res.status(404).json({response: {...err}});
    });

    server.listen(port);
    console.info('listening on port ' + port);
};
