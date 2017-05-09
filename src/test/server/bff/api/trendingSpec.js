import proxyquire, {noCallThru} from 'proxyquire';
import trending from '../../../mocks/trending'

noCallThru();

let makeRequestStub = (args) => {};

const remoteTrendingUrl = 'http://remoteTrendingUrl.com?sites=dolly.com.au';
const configStub = {
    services: { remote: { trending: remoteTrendingUrl } }
};

const getTrending = proxyquire('../../../../app/server/bff/api/trending', {
'../../makeRequest': (args) => { return makeRequestStub(args) },
'../../../config': configStub
}).default;


describe('#getTrending()', () => {

    let top = 5;
    let query;

    beforeEach(() => {
        makeRequestStub = sinon.stub().resolves(trending);
    });

    describe('when the getTrending method is called', () => {

        describe('and the query does not contain a value for TOP', () => {

            beforeEach(() => {
                top = null;
                query = `&n=${top}&format=json`;
            });

            afterEach(() => {
                top = 5;
                query = `&n=${top}&format=json`;
            });

            it(`should call makeRequest with ${remoteTrendingUrl}&n=null&format=json`, (done) => {
                getTrending(top).then(() => {
                    expect(makeRequestStub).to.be.calledWith(`${remoteTrendingUrl}${query}`);
                    done();
                }).catch(done);
            });
        });

        describe('when the trending remote returns a list in the response', () => {
            it(`should call makeRequest with ${remoteTrendingUrl}&n=5&format=json`, (done) => {
                getTrending(top).then((value) => {
                    expect(makeRequestStub).to.be.calledWith(`${remoteTrendingUrl}${query}`);
                    expect(value).to.deep.eq(trending);
                    done();
                }).catch(done);
            });
        });

        describe('when the trending returns an error response', () => {
            const rejectedResponse = {
                data: []
            };

            beforeEach(() => {
                makeRequestStub = sinon.stub().rejects(rejectedResponse);
            });

            it('should return an empty array object', (done) => {
                getTrending(top).then((value) => {
                    expect(value).to.deep.eq([]);
                    done();
                }).catch(done);
            });
        });
    });
});
