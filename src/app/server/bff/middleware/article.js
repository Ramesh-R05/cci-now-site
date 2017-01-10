import get from 'lodash/object/get';
import {getLatestTeasers} from '../api/listing';

const TOP = 20;

export default async function article(req, res, next) {
    try {
        if (get(req, 'data.entity.nodeTypeAlias', '') !== 'Article') {
            next();
            return;
        }

        const sectionId = req.data.entity.sectionId;
        const listingQuery = `path eq %27${sectionId}%27`;
        if (sectionId) {
            req.data.leftHandSide = await getLatestTeasers(TOP, undefined, listingQuery);
        }

        next();
    } catch(error) {
        next(error);
    }
}
