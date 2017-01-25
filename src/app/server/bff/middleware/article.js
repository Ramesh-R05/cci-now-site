import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import { getLatestTeasers } from '../api/listing';

const TOP = 20;

export default async function article(req, res, next) {
    try {
        const nodeTypeAlias = get(req, 'data.entity.nodeTypeAlias', '');
        if (nodeTypeAlias !== 'Article') {
            next();
            return;
        }

        const source =  get(req, 'data.entity.articleSource', '');
        const adBrand = find(req.app.config.brands.uniheader, (b) => { return b.title === source });
        req.data.entity.adBrand = get(adBrand, 'id', 'ntl');

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
