import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const makeRequestStub = sinon.stub();
const getLatestTeasersStub = sinon.stub();
const createRepeatableListStub = sinon.stub();

const sectionMiddleware = proxyquire('../../../../app/server/bff/middleware/section', {
    '../../makeRequest': makeRequestStub,
    '../api/listing': {
        getLatestTeasers: getLatestTeasersStub
    },
    '../helper/createReapeatableList': createRepeatableListStub
}).default;

describe('Section middleware', () => {
    const config = {
        brands: {
            site: [
                {
                    id: 'aww',
                    imageUrl: '/assets/images/headerlogos/AWW-logo.svg',
                    url: '/aww',
                    title: "Australian Women's Weekly"
                },
                {
                    id: 'wd',
                    imageUrl: '/assets/images/headerlogos/WD-logo.svg',
                    url: '/womansday',
                    title: "Woman's Day"
                },
                {
                    id: 'gh',
                    imageUrl: '/assets/images/headerlogos/GH-logo.svg',
                    url: '/good-health',
                    title: 'Good Health'
                }
            ]
        },
        services: {
            remote: {
                module: 'http://module.url'
            }
        }
    };
    const validRes = { data: [1, 2], totalCount: 2 };
    const validSection = 'fashion';
    const res = {};
    let req;
    let reqBase;

    describe('when there is a section in the query param and nodeTypeAlias equal to Section', () => {
        afterEach(() => {
            getLatestTeasersStub.reset();
            makeRequestStub.reset();
        });

        before(() => {
            reqBase = {
                app: { locals: { config: { services: { remote: { module: '' } } } } },
                data: { entity: { nodeTypeAlias: 'Section', nodeName: 'travel' } },
                query: { section: 'sec' }
            };
        });

        describe('when the remote returns the list of teasers', () => {
            let next;

            beforeEach(() => {
                req = {
                    ...reqBase,
                    app: {
                        locals: {
                            config: {
                                site: { host: 'http://site-host.com' },
                                services: { remote: { module: 'http://module.url' } }
                            }
                        }
                    }
                };
                req.data.headerNav = [1, 2, 3];
                next = sinon.spy();
                getLatestTeasersStub.resolves(validRes);
            });

            it('should store the latest teasers in `req.data`', done => {
                sectionMiddleware(req, res, next)
                    .then(() => {
                        expect(getLatestTeasersStub).to.have.been.calledWith(14, 0, `parentUrl eq %27/${req.query.section}%27`);
                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe('when there is a page query param and nodeTypeAlias equal to Section', () => {
        let next;

        before(() => {
            req = { data: { entity: { nodeTypeAlias: 'Section' } }, query: { page: 'page' } };
            next = sinon.stub();
        });

        it(`should call next without making a request`, done => {
            sectionMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.have.been.called;
                    expect(getLatestTeasersStub).to.not.have.been.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('when there is a page and section query param along with a nodeTypeAlias equal to Section', () => {
        let next;

        before(() => {
            req = { data: { entity: { nodeTypeAlias: 'Section' } }, query: { page: 'page', section: 'section' } };
            next = sinon.stub();
        });

        it(`should call next without making a request`, done => {
            sectionMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.have.been.called;
                    expect(getLatestTeasersStub).to.not.have.been.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('when there is a section in the query param and nodeTypeAlias equal to Article', () => {
        let next;

        before(() => {
            reqBase = { data: { entity: { nodeTypeAlias: 'Article' } }, query: { section: 'section' } };
        });

        describe('and there is a nodeTypeAlias equal Section', () => {
            before(() => {
                req = { ...reqBase, data: { entity: 'Section' } };
                next = sinon.stub();
            });

            it(`should call next without making a request`, done => {
                sectionMiddleware(req, res, next)
                    .then(() => {
                        expect(next).to.have.been.called;
                        expect(getLatestTeasersStub).to.not.have.been.called;
                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe('when there is a brand in the query param and nodeTypeAlias equal to Brand', () => {
        let res = {};
        let next;
        let req;
        let reqBase;

        describe("when source is Australian Women's Weekly", () => {
            before(() => {
                reqBase = {
                    app: { locals: { config } },
                    query: {
                        section: validSection
                    },
                    data: {
                        entity: {
                            nodeTypeAlias: 'Brand',
                            source: "Australian Women's Weekly"
                        }
                    }
                };

                getLatestTeasersStub.resolves(validRes);
                req = { ...reqBase };
                next = sinon.spy();
            });

            it('should set adBrand as aww', done => {
                sectionMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.entity.adBrand).to.equal('aww');
                        done();
                    })
                    .catch(done);
            });
        });

        describe('when articleSource is undefined', () => {
            let next;

            before(() => {
                reqBase = {
                    app: { locals: { config } },
                    query: {
                        section: validSection
                    },
                    data: {
                        entity: {
                            nodeTypeAlias: 'Brand'
                        }
                    }
                };

                getLatestTeasersStub.resolves(validRes);
                req = { ...reqBase };
                next = sinon.spy();
            });

            it('should set adBrand as ntl', done => {
                sectionMiddleware(req, res, next)
                    .then(() => {
                        expect(req.data.entity.adBrand).to.equal('ntl');
                        done();
                    })
                    .catch(done);
            });
        });

        describe('when the remote returns the list of teasers', () => {
            let next;

            before(() => {
                reqBase = {
                    app: { locals: { config } },
                    query: {
                        section: validSection
                    },
                    data: {
                        entity: {
                            nodeTypeAlias: 'Brand',
                            source: "Australian Women's Weekly"
                        }
                    }
                };
                req = { ...reqBase };
                next = sinon.spy();
            });

            it('should request for teasers', done => {
                sectionMiddleware(req, res, next)
                    .then(() => {
                        expect(getLatestTeasersStub).to.have.been.calledWith(
                            14,
                            0,
                            `source eq %27Australian Women''s Weekly%27 and nodeTypeAlias ne %27Brand%27`
                        );
                        done();
                    })
                    .catch(done);
            });
        });
    });
});
