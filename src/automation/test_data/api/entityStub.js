import sinon from 'sinon';
import entityHome from '../entities/entity-home';
import entitySectionFashion from '../entities/entity-seciton-fashion';

const getEntityStub = sinon.stub();
getEntityStub.withArgs('homepage', { throwOnFailedRequest: false }).resolves(entityHome);
getEntityStub.withArgs('homepage').resolves(entityHome);
getEntityStub.withArgs('?url=/fashion').resolves(entitySectionFashion);

export default getEntityStub;
