import get from 'lodash/object/get';
import {getMoreGalleries} from '../api/listing';

export default async function gallery(req, res, next) {
    try {
        if (get(req, 'data.entity.nodeTypeAlias', '') !== 'Gallery') {
            next();
            return;
        }

        req.data.moreGalleries = await getMoreGalleries();

        next();
    } catch(error) {
        next(error);
    }
}
