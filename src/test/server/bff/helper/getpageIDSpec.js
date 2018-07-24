import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const sitePrefix = 'DOLLY';
const getPageID = proxyquire('../../../../app/server/bff/helper/getPageID', {
    '../../../config': {
        site: {
            prefix: sitePrefix
        }
    }
}).default;

describe('#getPageID', () => {
    const validPageParam = 'this-is-a-test-1234';
    const validPageID = `${sitePrefix}-1234`;
    const invalidPageParam = 'this-is-a-invalid';

    it(`should return valid page ID ${validPageID}`, () => {
        const pageID = getPageID(validPageParam);
        expect(pageID).to.equal(validPageID);
    });

    it(`should return undefined for invalid page ID`, () => {
        const pageID = getPageID(invalidPageParam);
        expect(pageID).to.be.empty;
    });
});
