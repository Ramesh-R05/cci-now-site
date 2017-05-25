import proxyquire, {noCallThru} from 'proxyquire';

noCallThru();

let makeRequestStub = () => {};
let getLatestTeasersStub = () => {};

const tagMiddleware = proxyquire('../../../../app/server/bff/middleware/tag', {
    '../../makeRequest': (...args) => { return makeRequestStub(...args) },
    '../api/listing': {
        getLatestTeasers: (...args) => { return getLatestTeasersStub(...args) }
    }
}).default;

function generateTagToTitle(tag) {
    return tag.split('-').map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
}

function transformToLowerCaseTag(tag) {
    return tag.toLowerCase().replace('%20', '-');
}

describe('Tag middleware', () => {
    const entityService = 'http://entitiesUrl.com';
    const tagService = 'http://tagUrl.com';
    const config = {site: { host: 'http://www.dolly.com.au' }, services: {remote: {entity: entityService, tag: tagService}}};
    const latestTeasers = { data: ['Teaser 1', 'Teaser 2'] };
    const entity = {};
    const res = {};
    const expectedTitle = 'Two Words';
    const expectedUrl = `/tags/two-words`;
    let next;
    let req;
    let rejectedResponse;

    describe('when a tag is set in the query params', () => {
        const baseReq = { app: { locals: { config } }, query: { tag: 'two-words'} };
        describe('and an entity is not defined', () => {
            describe('and the remote listing and tag service returns an error response and entity returns valid response', () => {
                beforeEach(() => {
                    rejectedResponse = {
                        body: 'Could not find the article DOLLY-36424',
                        err: 'Error 404',
                        status: 404
                    };
                    req = { ...baseReq };
                    next = sinon.spy();
                    makeRequestStub = sinon.stub();
                    makeRequestStub.withArgs(`${entityService}/section/${req.query.tag}`)
                        .resolves({nodeTypeAlias: 'TagSection'});
                    makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                        .rejects();
                    getLatestTeasersStub = sinon.stub().rejects(rejectedResponse);
                });

                it('should have called the entity service', (done) => {
                    tagMiddleware(req, res, next).then(() => {
                        expect(makeRequestStub).to.have.been.calledWith(`${entityService}/section/${req.query.tag}`);
                        expect(makeRequestStub).to.have.been.calledWith(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`);
                        expect(next).to.be.calledWith(rejectedResponse);
                        done();
                    }).catch(done);
                });

                it('should pass an error to next middleware', (done) => {
                    tagMiddleware(req, res, next).then(() => {
                        expect(getLatestTeasersStub).to.have.been.calledWith(14, 0, 'tagsDetails/urlName eq %27two-words%27');
                        expect(next).to.be.calledWith(rejectedResponse);
                        done();
                    }).catch(done);
                });
            });

            describe('and the remote entity service returns an error response, and the listing returns valid teasers', () => {
                beforeEach(() => {
                    rejectedResponse = {
                        body: 'Could not find the article DOLLY-36424',
                        err: 'Error 404',
                        status: 404
                    };
                    req = { ...baseReq };
                    next = sinon.spy();
                    makeRequestStub = sinon.stub();
                    makeRequestStub.withArgs(`${entityService}/section/${req.query.tag}`)
                        .rejects(rejectedResponse);
                    getLatestTeasersStub = sinon.stub().resolves(latestTeasers);
                });

                describe('and the tag service returns an error response', () => {
                    beforeEach(() => {
                        makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                            .rejects();
                    });

                    it('should set the entity with valid properties', (done) => {
                        tagMiddleware(req, res, next).then(() => {
                            expect(req.data.entity).to.deep.eq({
                                nodeTypeAlias: 'TagSection',
                                contentTitle: expectedTitle,
                                url: expectedUrl,
                                pageMetaDescription: '',
                                pageTitle: expectedTitle
                            });
                            done();
                        }).catch(done);
                    });

                    it('should set the latest teasers', (done) => {
                        tagMiddleware(req, res, next).then(() => {
                            expect(req.data.latestTeasers).to.deep.eq(latestTeasers.data);
                            expect(next).to.have.been.calledWith();
                            done();
                        }).catch(done);
                    });

                    it('should set the section property', (done) => {
                        tagMiddleware(req, res, next).then(() => {
                            expect(req.data.section).to.deep.eq({ name: 'Tag', urlName: 'tag' });
                            done();
                        }).catch(done);
                    })
                });

                describe('and the tag service returns an valid response', () => {
                    describe('that is empty', () => {
                        beforeEach(() => {
                            makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                                .resolves({});
                        });

                        it('should set the entity just like when the tag service was rejected', (done) => {
                            tagMiddleware(req, res, next).then(() => {
                                expect(req.data.entity).to.deep.eq({
                                    nodeTypeAlias: 'TagSection',
                                    contentTitle: expectedTitle,
                                    url: expectedUrl,
                                    pageMetaDescription: '',
                                    pageTitle: expectedTitle
                                });
                                done();
                            }).catch(done);
                        });
                    });

                    describe('that contains an empty array of data', () => {
                        beforeEach(() => {
                            makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                                .resolves({ data: [] });
                        });

                        it('should set the entity just like when the tag service was rejected', (done) => {
                            tagMiddleware(req, res, next).then(() => {
                                expect(req.data.entity).to.deep.eq({
                                    nodeTypeAlias: 'TagSection',
                                    contentTitle: expectedTitle,
                                    url: expectedUrl,
                                    pageMetaDescription: '',
                                    pageTitle: expectedTitle
                                });
                                done();
                            }).catch(done);
                        });
                    });

                    describe('that does not contain the matching tag in data', () => {
                        const obj = { title: 'Title', description: 'desc', tag: { name: 'this:is:a:Tag Name' } };

                        beforeEach(() => {
                            makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                                .resolves({ data: [obj] });
                        });

                        it('should set the entity just like when the tag service was rejected', (done) => {
                            tagMiddleware(req, res, next).then(() => {
                                expect(req.data.entity).to.deep.eq({
                                    nodeTypeAlias: 'TagSection',
                                    contentTitle: expectedTitle,
                                    url: expectedUrl,
                                    pageMetaDescription: '',
                                    pageTitle: expectedTitle
                                });
                                done();
                            }).catch(done);
                        });
                    });

                    describe('that has 1 matching tag in data', () => {
                        const obj = { title: 'Title', description: 'desc', tag: { name: 'this:is:a:Two Words' } }

                        beforeEach(() => {
                            makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                                .resolves({ data: [obj] });
                        });

                        it('should set the entity with valid properties from tag service', (done) => {
                            tagMiddleware(req, res, next).then(() => {
                                expect(req.data.entity).to.deep.eq({
                                    nodeTypeAlias: 'TagSection',
                                    contentTitle: expectedTitle,
                                    url: expectedUrl,
                                    pageMetaDescription: obj.description,
                                    pageTitle: obj.title
                                });
                                done();
                            }).catch(done);
                        });
                    });

                    describe('that has 2 matching tag in data', () => {
                        const obj1 = { title: 'Title2', description: 'desc2', tag: { name: 'this:is:a:Two Words In this Tag' } };
                        const obj2 = { title: 'Title1', description: 'desc1', tag: { name: 'this:is:a:Two Words' } };

                        beforeEach(() => {
                            makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                                .resolves({ data: [obj1, obj2] });
                        });

                        it('should set the entity just like when the tag service was rejected', (done) => {
                            tagMiddleware(req, res, next).then(() => {
                                expect(req.data.entity).to.deep.eq({
                                    nodeTypeAlias: 'TagSection',
                                    contentTitle: expectedTitle,
                                    url: expectedUrl,
                                    pageMetaDescription: obj2.description,
                                    pageTitle: obj2.title
                                });
                                done();
                            }).catch(done);
                        });
                    });

                });
            });

            describe('and the remote listing and entity service returns valid responses', () => {
                describe('and the entity response nodeTypeAlias does not equal TagSection', () => {
                    beforeEach(() => {
                        req = {...baseReq};
                        next = sinon.spy();
                        makeRequestStub = sinon.stub();
                        makeRequestStub.withArgs(`${entityService}/section/${req.query.tag}`)
                            .resolves({nodeTypeAlias: 'Section', url: '/url-here'});
                        makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                            .rejects();
                        getLatestTeasersStub = sinon.stub()
                    });

                    it('should set the entity with valid properties', (done) => {
                        tagMiddleware(req, res, next).then(() => {
                            expect(req.data.entity).to.deep.eq({
                                nodeTypeAlias: 'TagSection',
                                contentTitle: expectedTitle,
                                url: expectedUrl,
                                pageMetaDescription: '',
                                pageTitle: expectedTitle
                            });
                            done();
                        }).catch(done);
                    });
                });

                describe('and the entity response nodeTypeAlias equals TagSection but does not contain a url', () => {
                    beforeEach(() => {
                        req = {...baseReq};
                        next = sinon.spy();
                        makeRequestStub = sinon.stub();
                        makeRequestStub.withArgs(`${entityService}/section/${req.query.tag}`)
                            .resolves({nodeTypeAlias: 'TagSection'});
                        makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                            .rejects();
                        getLatestTeasersStub = sinon.stub()
                    });

                    it('should set the entity with valid properties', (done) => {
                        tagMiddleware(req, res, next).then(() => {
                            expect(req.data.entity).to.deep.eq({
                                nodeTypeAlias: 'TagSection',
                                contentTitle: expectedTitle,
                                url: expectedUrl,
                                pageMetaDescription: '',
                                pageTitle: expectedTitle
                            });
                            done();
                        }).catch(done);
                    });
                });

                describe('and the entity response nodeTypeAlias equals TagSection and contains url', () => {
                    beforeEach(() => {
                        req = {...baseReq};
                        next = sinon.spy();
                        makeRequestStub = sinon.stub();
                        makeRequestStub.withArgs(`${entityService}/section/${req.query.tag}`)
                            .resolves({nodeTypeAlias: 'TagSection', url: '/url-of-tag-page'});
                        makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                            .rejects();
                        getLatestTeasersStub = sinon.stub()
                    });

                    it('should set the entity with valid properties', (done) => {
                        tagMiddleware(req, res, next).then(() => {
                            expect(req.data.entity).to.deep.eq({
                                nodeTypeAlias: 'TagSection',
                                contentTitle: expectedTitle,
                                url: '/url-of-tag-page',
                                pageMetaDescription: '',
                                pageTitle: expectedTitle
                            });
                            done();
                        }).catch(done);
                    });
                });
            });
        });

        describe('and an entity is defined', () => {
            describe('and the nodeTypeAlias equals to TagSection', () => {
                beforeEach(() => {
                    req = { ...baseReq, data: { entity: { nodeTypeAlias: 'TagSection'} } };
                    next = sinon.spy();
                    makeRequestStub = sinon.stub()
                    makeRequestStub.withArgs(`${entityService}/section/${req.query.tag}`)
                        .resolves({});
                    makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                        .rejects();
                    getLatestTeasersStub = sinon.stub().resolves(latestTeasers);
                });

                it('should call both the listing and entity service, along with calling next', (done) => {
                    tagMiddleware(req, res, next).then(() => {
                        expect(makeRequestStub).to.have.been.called;
                        expect(getLatestTeasersStub).to.have.been.called;
                        expect(next).to.have.been.calledWith();
                        done();
                    }).catch(done);
                });

                describe('when a query param of pageNo 2 is passed in', () => {
                    it('should not have a query param in the previous page url', (done) => {
                        req.query.pageNo = 2;
                        tagMiddleware(req, res, next).then(() => {
                            expect(req.data.list.previous.url).to.equal('http://www.dolly.com.au/tags/two-words');
                            done();
                        }).catch(done);
                    });
                });
            });

            describe('and the nodeTypeAlias equals to Section', () => {
                before(() => {
                    req = { ...baseReq, data: { entity: { nodeTypeAlias: 'Section' } } };
                    next = sinon.spy();
                    makeRequestStub = sinon.stub();
                    makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                        .rejects();
                    getLatestTeasersStub = sinon.stub().resolves({});
                });

                it('should not call the listing or entity services, only call next', (done) => {
                    tagMiddleware(req, res, next).then(() => {
                        expect(makeRequestStub).to.not.have.been.calledWith(`${entityService}/section/${req.query.tag}`);
                        expect(getLatestTeasersStub).to.not.have.been.called;
                        expect(next).to.have.been.calledWith();
                        done();
                    }).catch(done);
                });
            });

            describe('and there is a url set inside the entity', () => {
                before(() => {
                    req = { ...baseReq, data: { entity: { nodeTypeAlias: 'TagSection', url: '/tag-url' } } };
                    next = sinon.spy();
                    makeRequestStub = sinon.stub();
                    makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                        .rejects();
                    getLatestTeasersStub = sinon.stub();
                });

                it('should not need to call the entity service', (done) => {
                    tagMiddleware(req, res, next).then(() => {
                        expect(makeRequestStub).to.not.have.been.calledWith(`${entityService}/section/${req.query.tag}`);
                        expect(getLatestTeasersStub).to.have.been.called;
                        done();
                    }).catch(done);
                });
            });
        });

        describe('and the page is also defined in the query params', () => {
            before(() => {
                req = { ...baseReq };
                req.query.page = 'page';
                next = sinon.spy();
                makeRequestStub = sinon.stub();
                makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.tag)}`)
                    .rejects();
                getLatestTeasersStub = sinon.stub();
            });

            it('should not call the listing or entity services, only call next', (done) => {
                tagMiddleware(req, res, next).then(() => {
                    expect(makeRequestStub).to.not.have.been.calledWith(`${entityService}/section/${req.query.tag}`);
                    expect(getLatestTeasersStub).to.not.have.been.called;
                    expect(next).to.have.been.calledWith();
                    done();
                }).catch(done);
            });
        });
    });

    describe('when a section is set in the query params', () => {
        beforeEach(() => {
            req = { app: { locals: { config } }, query: { section: 'two-words'} };
            next = sinon.spy();
            makeRequestStub = sinon.stub();
            makeRequestStub.withArgs(`${entityService}/section/${req.query.section}`)
                .resolves({});
            makeRequestStub.withArgs(`${tagService}/tags/${generateTagToTitle(req.query.section)}`)
                .rejects();
            getLatestTeasersStub = sinon.stub().resolves({});
        });

        it('should call both the listing and entity service, along with calling next', (done) => {
            tagMiddleware(req, res, next).then(() => {
                expect(makeRequestStub).to.have.been.calledWith(`${entityService}/section/${req.query.section}`);
                expect(getLatestTeasersStub).to.have.been.calledWith(14, 0, 'tagsDetails/urlName eq %27two-words%27');
                expect(next).to.have.been.calledWith();
                done();
            }).catch(done);
        });
    });

    describe('when neither tag nor section is set in the query params', () => {
        beforeEach(() => {
            req = { app: { locals: { config } } };
            next = sinon.spy();
            makeRequestStub = sinon.stub();
            getLatestTeasersStub = sinon.stub().resolves({});
        });
        it('should not call the listing or entity services, only call next', (done) => {
            tagMiddleware(req, res, next).then(() => {
                expect(makeRequestStub).to.not.have.been.called;
                expect(getLatestTeasersStub).to.not.have.been.called;
                expect(next).to.have.been.calledWith();
                done();
            }).catch(done);
        });
    });
});
