import listing from '../../../mocks/listing';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const getPlaceholderImage = proxyquire('../../../../app/server/bff/helper/getPlaceholderImage', {
    '@bxm/config': {
        load: () => {
            return {
                defaultImageUrl: 'http://defaultimageurl.com'
            }
        }
    }
}).getPlaceholderImage;

const imagePlaceholderUrl = 'http://defaultimageurl.com';
const contentImageUrl = "http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/Dolly/2016/02/22/11626/Tulips.jpg";
const imagePlaceholderData = listing.data;

describe('#getPlaceholderImage', () => {
    let insertedData;
    before(() => {
        insertedData = getPlaceholderImage(imagePlaceholderData);
    });

    it(`should return the placeholder image - contentImageUrl does not exist`, () => {
        expect(insertedData[0].contentImageUrl).to.equal(imagePlaceholderUrl)
    })
    it(`should return the placeholder image - contentImageUrl exists but empty sting`, () => {
        expect(insertedData[1].contentImageUrl).to.equal(imagePlaceholderUrl)
    });
    it(`should return the article image`, () => {
        expect(insertedData[2].contentImageUrl).to.equal(contentImageUrl)
    });
});
