import config from '../../../config';

export default function getPlaceholderImage(data) {
    const dataWithPlaceholdImg = { ...data };
    const imagePlaceholderUrl = config.defaultImageUrl || 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/now/defaultimage.png';
    Object.keys(dataWithPlaceholdImg).forEach(key => {
        dataWithPlaceholdImg[key].contentImageUrl = dataWithPlaceholdImg[key].contentImageUrl || imagePlaceholderUrl;
    });
    return dataWithPlaceholdImg;
}
