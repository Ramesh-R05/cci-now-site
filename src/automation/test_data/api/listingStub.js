import sinon from 'sinon';
import listing from '../listing/latestTeasers';

const getLatestTeasersStub = sinon.stub();
getLatestTeasersStub.withArgs(14, 0).resolves({ data: listing, totalCount: listing.length + 20 });
getLatestTeasersStub.withArgs(14, sinon.match.any, sinon.match.any).resolves({ data: listing, totalCount: listing.length + 20 });

const getMoreGalleriesStub = sinon.stub();

export { getLatestTeasersStub, getMoreGalleriesStub };
