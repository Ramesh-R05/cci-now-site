import {load} from '@bxm/config';
const config = load();

export function getPlaceholderImage(data) {
    const imagePlaceholderUrl = config.defaultImageUrl || 'http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/now/defaultimage.png';
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            data[key].contentImageUrl = data[key].contentImageUrl || imagePlaceholderUrl;
        }
    }
    return data;
}
