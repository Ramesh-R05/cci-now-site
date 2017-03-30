import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import { getMoreGalleries } from '../api/listing';
import momentTimezone from 'moment-timezone';

export default async function gallery(req, res, next) {
    try {
        const nodeTypeAlias = get(req, 'data.entity.nodeTypeAlias', '');
        if (nodeTypeAlias !== 'Gallery') {
            next();
            return;
        }

        const source = get(req, 'data.entity.source', '');
        const adBrand = find(req.app.config.brands.uniheader, b => b.title === source);
        req.data.entity.adBrand = get(adBrand, 'id', 'ntl');
        //  TODO - Fix the pageDateCreated time so that it comes through in correct NZ format for NTLNZ
        req.data.entity.pageDateCreated = momentTimezone.tz(req.data.entity.pageDateCreated, 'Australia/Sydney').format('YYYY-MM-DDTHH:mm:ss');
        req.data.moreGalleries = await getMoreGalleries();

        next();
    } catch (error) {
        next(error);
    }
}
