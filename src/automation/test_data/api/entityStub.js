import sinon from 'sinon';
import entityHome from '../entities/entity-home';

const getEntityStub = sinon.stub();
getEntityStub.withArgs('homepage', { throwOnFailedRequest: false }).resolves(entityHome);
getEntityStub.withArgs('homepage').resolves(entityHome);

export default getEntityStub;
