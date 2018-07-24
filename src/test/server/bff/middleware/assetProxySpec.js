import proxyquire, { noCallThru } from 'proxyquire';

let stubSuperagentEndCallbackSpy = null;
let stubSuperagentEndCallbackResStub = null;

const stubSuperagent = {
    get() {
        return this;
    },
    proxy() {
        return this;
    },
    end(c) {
        stubSuperagentEndCallbackSpy = sinon.spy(c);
        stubSuperagentEndCallbackSpy(null, stubSuperagentEndCallbackResStub);
    }
};

const stubLruCache = function() {
    return {
        get() {},
        set() {}
    };
};

const assetProxy = proxyquire('../../../../app/server/bff/middleware/assetProxy', {
    superagent: stubSuperagent,
    'superagent-proxy': r => r,
    'lru-cache': stubLruCache
}).default;

noCallThru();

describe('#assetProxy()', () => {
    afterEach(() => {
        stubSuperagentEndCallbackSpy = null;
        stubSuperagentEndCallbackResStub = null;
    });

    it('should return error when there is no origin url', () => {
        const sendStatus = sinon.spy();
        assetProxy({ originalUrl: 'nup' }, { sendStatus }, () => {});
        expect(sendStatus).to.have.been.calledWith(400);
    });

    it('should not return error when there is an origin url', () => {
        const res = {
            sendStatus: sinon.spy(),
            set() {
                return this;
            },
            status() {
                return this;
            },
            send() {
                return this;
            }
        };
        stubSuperagentEndCallbackResStub = {
            header: {
                'cache-control': 'max-age=1'
            },
            status: 200,
            text: 'x',
            body: 'x'
        };
        const setSpy = sinon.spy(res, 'set');
        assetProxy({ originalUrl: 'http://a-url.com' }, res, () => {});
        expect(res.sendStatus).to.not.have.been.called;
        expect(stubSuperagentEndCallbackSpy).to.have.been.called;
        expect(setSpy).to.have.been.called;
    });

    it('should not return pass through content length header', () => {
        const res = {
            sendStatus() {
                return this;
            },
            set() {
                return this;
            },
            status() {
                return this;
            },
            send() {
                return this;
            }
        };
        stubSuperagentEndCallbackResStub = {
            header: {
                'cache-control': 'max-age=1',
                'content-length': '1'
            },
            status: 200,
            text: 'x',
            body: 'x'
        };
        const setSpy = sinon.spy(res, 'set');
        assetProxy({ originalUrl: 'http://a-url.com' }, res, () => {});
        expect(setSpy.args[0][0]).to.not.have.any.keys(['content-length']);
    });
});
