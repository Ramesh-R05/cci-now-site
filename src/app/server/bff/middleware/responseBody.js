import get from 'lodash/object/get';
import {parseEntity, parseEntities} from '../helper/parseEntity';
import {parseHeaderMetaData} from '../helper/parseHeaderMetaData';
import {parseModule} from '../helper/parseModule';
import getPlaceholderImage from '../helper/getPlaceholderImage';

export default function responseBody(req, res, next) {

    try {
        res.body = {
            entity: parseEntity(req.data.entity),
            headerMetaData: parseHeaderMetaData(req.data.entity, get(req, 'data.headerMetaData', {}))
        };

        if (get(req, 'data.headernavigation')) {
            res.body.headerNavigation = {
                items: parseEntities(req.data.headernavigation, { contentTitle: 'name' })
            };
        }

        if (get(req, 'data.hamburgernavigation')) {
            res.body.hamburgerNavigation = {
                items: parseEntities(req.data.hamburgernavigation, { contentTitle: 'name' })
            };
        }

        if (get(req, 'data.footer')) {
            res.body.footer = parseModule(req.data.footer);
        }

        if (get(req, 'data.leftHandSide')) {
            var lhsData = getPlaceholderImage(req.data.leftHandSide.data);
            res.body.leftHandSide = { items:  parseEntities(lhsData)};
        }

        if (get(req, 'data.trendingItems')) {
            res.body.trendingItems = parseEntities(req.data.trendingItems, {
                title: 'title', imageUrl: 'imageUrl', location: 'url'
            });
        }

        if (req.data.moreGalleries) {
            res.body.moreGalleries = parseEntities(req.data.moreGalleries.data);
        }

        if (get(req, 'data.heroTeaser')) {
            res.body.heroTeaser = parseEntity(req.data.heroTeaser);
        }

        if (get(req, 'data.latestTeasers')) {
            res.body.latestTeasers = parseEntities(req.data.latestTeasers);
        }

        if (get(req, 'data.list')) {
            res.body.list = req.data.list;
        }

        if (get(req, 'data.videoGalleryTeasers')) {
            res.body.videoGalleryTeasers = parseEntities(req.data.videoGalleryTeasers.data);
        }

        if (get(req, 'data.section')) {
            res.body.section = req.data.section;
        }

        next();
    } catch(error) {
        next(error);
    }
}
