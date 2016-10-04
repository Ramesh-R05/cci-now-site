import {load} from '@bxm/config';
const config = load();

export default function(slug) {
    const idMatch = slug.match(/\d+$/);
    if (!idMatch || !idMatch.length) return;
    return `${config.site.prefix}-${idMatch[0]}`;
}
