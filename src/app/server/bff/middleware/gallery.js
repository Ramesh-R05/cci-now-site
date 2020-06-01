import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import momentTimezone from 'moment-timezone';
import APIUtils from '@bxm/api-utils';
import logger from '../../../../logger';

const TOP = 20;

export default async function gallery(req, res, next) {
    try {
        const nodeTypeAlias = get(req, 'data.entity.nodeTypeAlias', '');

        if (nodeTypeAlias !== 'Gallery') {
            next();

            return;
        }

        const source = get(req, 'data.entity.source', '');
        const adBrand = find(req.app.locals.config.brands.site, b => b.title === source);
        const { config } = req.app.locals;
        const { getLatestTeasers } = new APIUtils(logger, config);
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
                //  TODO - Fix the pageDateCreated time so that it comes through in correct NZ format for NTLNZ
                pageDateCreated: momentTimezone.tz(req.data.entity.pageDateCreated, 'Australia/Sydney').format('YYYY-MM-DDTHH:mm:ss'),
                adBrand: get(adBrand, 'id', 'ntl')
            },
            leftHandSide
        };

        next();
    } catch (error) {
        next(error);
    }
}
