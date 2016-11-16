import { getLatestTeasers } from '../api/listing';
import { parseEntities } from '../helper/parseEntity';
const listCount = 12;

export default async function list(req, res, next) {
    try {
        const pageNo = parseInt(req.query.pageNo, 10);
        const {section, filter} = req.query;
        const top = listCount;
        const skip = (pageNo - 1) * listCount;
        const listResp = await getLatestTeasers(top, skip, section, filter);

        const basePath = section ? `/${section}` : `/`;
        let previousPage = null;
        if (pageNo > 1) {
            const path = `${basePath}?pageNo=${pageNo - 1}`;
            previousPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            }
        }

        let nextPage = null;
        if (skip + listResp.data.length < listResp.totalCount) {
            const path = `${basePath}?pageNo=${pageNo + 1}`;
            nextPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            };
        }

        const path = pageNo > 1 ? `${basePath}?pageNo=${pageNo}` : basePath;
        const currentPage = {
            path,
            url: `${req.app.config.site.host}${path}`
        };

        res.body = {
            list: {
                listName: section || 'home',
                params: {
                    ...req.query,
                    pageNo
                },
                items: [parseEntities(listResp.data)],
                previous: previousPage,
                current: currentPage,
                next: nextPage
            }
        };

        next();
    } catch(error) {
        next(error);
    }
}
