/* eslint-disable global-require */
import express from 'express';
import setModuleData from './setModuleData';
const router = express.Router();

setModuleData();

// Home page only
router.use((req, res, next) => {
    if (req.query) {
        const { page, section, tag } = req.query;

        if (page || section || tag) {
            next('route');
            return;
        }
    }
    const home = require('../../automation/test_data/home').default;
    home.headerMetaData.title = 'Cosmo Home';
    res.json(home);
});

// For pages with url /section/page (a Gallery or Article page)
router.use((req, res, next) => {
    const { page, tag } = req.query;

    if (!page || tag) {
        next('route');
        return;
    }

    let data;

    // /anything/page_name_id
    switch (page) {
    case 'cosmo-test-page-does-not-work-in-dolly':
        data = require('./test-data/pages/article').default;
        break;
    default:
        data = null;
        break;
    }
    if (data) res.json(data);
    else next('route');
});

export default router;
