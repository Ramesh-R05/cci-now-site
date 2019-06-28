import makeRequest from '../../makeRequest';
import { getLatestTeasers } from '../api/listing';
import createRepeatableList from '../helper/createReapeatableList';
import transformTeaserPageDateCreated from '../helper/transformTeaserPageDateCreated';
import logger from '../../../../logger';

const latestTeaserCount = 6;
const listCount = 14;

export default async function home(req, res, next) {
    try {
        let pageNo = 1;

        if (req.query) {
            const { page, section, tag } = req.query;

            if (page || section || tag) {
                next();

                return;
            }

            pageNo = parseInt(req.query.pageNo || pageNo, 10);
        }

        const skip = (pageNo - 1) * listCount;

        const [pageData, latestTeasersResp] = await Promise.all([
            makeRequest(`${req.app.locals.config.services.remote.entity}/homepage`)
                .then(data => data)
                .catch(e => {
                    const error = new Error(`entity not found for homepage`);
                    error.status = 404;
                    logger.error({ msg: 'listing middleware: entity not found', e });

                    throw error;
                }),
            getLatestTeasers(listCount, skip)
        ]);

        const latestTeasers = latestTeasersResp && transformTeaserPageDateCreated(latestTeasersResp.data);
        const totalCount = latestTeasersResp.totalCount;

        const list = createRepeatableList({
            host: req.app.locals.config.site.host,
            basePath: '/',
            pageNo,
            skip,
            items: latestTeasers,
            totalCount,
            listName: 'home',
            startFrom: latestTeaserCount
        });

        req.data = {
            ...req.data,
            entity: { ...pageData },
            latestTeasers: latestTeasers.slice(0, latestTeaserCount),
            section: { id: pageData.id, name: 'Home', urlName: 'home' },
            list
        };

        next();
    } catch (error) {
        next(error);
    }
}
