import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import { getMoreGalleries } from '../api/listing';

export default async function gallery(req, res, next) {
    try {
        const nodeTypeAlias = get(req, 'data.entity.nodeTypeAlias', '');
        if (nodeTypeAlias !== 'Gallery') {
            next();
            return;
        }

        const source =  get(req, 'data.entity.source', '');
        const adBrand = find(req.app.config.brands.uniheader, (b) => { return b.title === source });
        req.data.entity.adBrand = get(adBrand, 'id', 'ntl');

        req.data.moreGalleries = await getMoreGalleries();

        next();
    } catch(error) {
        next(error);
    }
}
