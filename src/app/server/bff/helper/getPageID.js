import config from '../../../config';

export default function getPageID(slug) {
    const idMatch = slug.match(/\d+$/);

    if (!idMatch || !idMatch.length) {
        return '';
    }

    return `${config.site.prefix}-${idMatch[0]}`;
}
