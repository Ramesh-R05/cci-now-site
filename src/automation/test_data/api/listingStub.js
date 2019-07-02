import sinon from 'sinon';
import latestTeasers from '../listing/latestTeasers';
import list from '../listing/list';

const getLatestTeasersStub = sinon.stub();
getLatestTeasersStub.withArgs(14, 0).resolves({ data: latestTeasers, totalCount: latestTeasers.length + 20 });
getLatestTeasersStub.withArgs(14, 14, sinon.match.any).resolves({ data: list, totalCount: list.length + 20 });
getLatestTeasersStub
    .withArgs(20, undefined, "nodeTypeAlias eq 'Article' or nodeTypeAlias eq 'Gallery'")
    .resolves({ data: list.concat(latestTeasers).slice(0, 20), totalCount: 20 });

const getMoreGalleriesStub = sinon.stub();

export { getLatestTeasersStub, getMoreGalleriesStub };
