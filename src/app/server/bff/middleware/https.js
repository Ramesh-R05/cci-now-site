import get from 'lodash.get';
import set from 'lodash.set';

const httpsSet = (obj, path) => {
    const url = get(obj, path);
    if (typeof url === 'string') {
        set(obj, path, url.replace(/http:\/\/+/g, 'https://'));
    }
};

const itemLists = [
    'data.headernavigation',
    'data.promoted.items',
    'data.latestTeasers',
    'data.leftHandSide.data',
    'data.moreGalleries.data',
    'data.mustread',
    'data.hamburgernavigation'
];

const imageUrls = [
    'data.entity.contentImageUrl',
    'data.theme.themeImage',
    'data.hero.contentImageUrl'
];

export default function https(req, res, next) {
    try {
        imageUrls.forEach((imageUrl) => {
            httpsSet(req, imageUrl);
        });

        itemLists.forEach((i) => {
            get(req, i, []).forEach((item) => {
                httpsSet(item, 'contentImageUrl');
            });
        });

        get(req, 'data.entity.contentBody', []).forEach((item) => {
            switch (item.type) {
            case 'image':
            case 'whooshka':
                httpsSet(item, 'content.url');
                break;

            case 'image-revealer':
                httpsSet(item, 'content.left.url');
                httpsSet(item, 'content.right.url');
                break;

            case 'related-content':
                item.content.forEach((related) => {
                    httpsSet(related, 'imageUrl');
                });
                break;

            case 'gallery':
                httpsSet(item, 'content[0].imageUrl');
                break;
            default:
            }
        });

        get(req, 'data.entity.contentGallery', []).forEach((item) => {
            httpsSet(item, 'url');
        });

        get(req, 'data.list.items', []).forEach((item) => {
            httpsSet(item, 'imageUrl');
        });

        next();
    } catch (error) {
        next(error);
    }
}

export { itemLists, imageUrls };
