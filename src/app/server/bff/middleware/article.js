import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import momentTimezone from 'moment-timezone';
import { getLatestTeasers } from '../api/listing';

const TOP = 20;

export default async function article(req, res, next) {
    try {
        const nodeTypeAlias = get(req, 'data.entity.nodeTypeAlias', '');

        if (nodeTypeAlias !== 'Article') {
            next();

            return;
        }

        const source = get(req, 'data.entity.articleSource', '');
        const adBrand = find(req.app.locals.config.brands.site, b => b.title === source);

        let listingQuery = '';

        if (get(req, 'data.entity.parentUrl', '').includes('barbie')) {
            listingQuery = "parentUrl eq 'barbie'";
        } else {
            listingQuery = "nodeTypeAlias eq 'Article' or nodeTypeAlias eq 'Gallery'";
        }

        const leftHandSide = await getLatestTeasers(TOP, undefined, listingQuery);

        req.data = {
            ...req.data,
            entity: {
                ...req.data.entity,
                adBrand: get(adBrand, 'id', 'ntl'),
                // TODO - Fix the pageDateCreated time so that it comes through in correct NZ format for NTLNZ
                pageDateCreated: momentTimezone.tz(req.data.entity.pageDateCreated, 'Australia/Sydney').format('YYYY-MM-DDTHH:mm:ss')
            },
            leftHandSide
        };

        next();
    } catch (error) {
        next(error);
    }
}
