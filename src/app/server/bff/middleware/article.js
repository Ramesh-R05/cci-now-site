import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import { getLatestTeasers } from '../api/listing';
import momentTimezone from 'moment-timezone';

const TOP = 20;

export default async function article(req, res, next) {
    try {
        const nodeTypeAlias = get(req, 'data.entity.nodeTypeAlias', '');
        if (nodeTypeAlias !== 'Article') {
            next();
            return;
        }

        const source = get(req, 'data.entity.articleSource', '');
        const adBrand = find(req.app.locals.config.brands.uniheader, b => b.title === source);
        req.data.entity.adBrand = get(adBrand, 'id', 'ntl');
        // TODO - Fix the pageDateCreated time so that it comes through in correct NZ format for NTLNZ
        req.data.entity.pageDateCreated = momentTimezone.tz(req.data.entity.pageDateCreated, 'Australia/Sydney').format('YYYY-MM-DDTHH:mm:ss');

        let listingQuery = '';
        if (get(req, 'data.entity.parentUrl', '').includes('barbie')) {
            listingQuery = 'parentUrl eq \'barbie\'';
        } else {
            listingQuery = 'nodeTypeAlias eq \'Article\' or nodeTypeAlias eq \'Gallery\'';
        }
        req.data.leftHandSide = await getLatestTeasers(TOP, undefined, listingQuery);

        next();
    } catch (error) {
        next(error);
    }
}
