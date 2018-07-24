import { initialState, reducer } from '../../app/reducers/loadTeasers';

describe(`loadTeasers Reducer`, () => {
    let body;
    let payload;
    describe(`on LOAD_CONTENT`, () => {
        beforeEach(() => {
            body = {
                heroTeaser: {},
                latestTeasers: ['Teaser 1', 'Teaser 2'],
                videoGalleryTeasers: ['VideoTeaser 1', 'VideoTeaser 2', 'VideoTeaser 3'],
                mustRead: [],
                promoted: { title: '', items: [] },
                list: {
                    params: {
                        pageNo: 1
                    },
                    items: []
                }
            };
            payload = {
                type: 'LOAD_CONTENT',
                body
            };
        });

        describe(`when the payload contains the heroTeaser and latestTeasers in the body object`, () => {
            it(`should return the new items`, () => {
                expect(reducer(initialState, payload)).to.deep.eq({
                    heroTeaser: payload.body.heroTeaser,
                    latestTeasers: payload.body.latestTeasers,
                    videoGalleryTeasers: payload.body.videoGalleryTeasers,
                    mustRead: payload.body.mustRead,
                    promoted: payload.body.promoted,
                    list: {
                        params: {
                            pageNo: payload.body.list.params.pageNo
                        },
                        items: payload.body.list.items
                    }
                });
            });

            it(`should still return the new items `, () => {
                expect(reducer(initialState, payload)).to.deep.eq({
                    heroTeaser: payload.body.heroTeaser,
                    latestTeasers: payload.body.latestTeasers,
                    videoGalleryTeasers: payload.body.videoGalleryTeasers,
                    mustRead: payload.body.mustRead,
                    promoted: payload.body.promoted,
                    list: {
                        params: {
                            pageNo: payload.body.list.params.pageNo
                        },
                        items: payload.body.list.items
                    }
                });
            });
        });

        describe(`when the payload is empty`, () => {
            it(`should return the initalState`, () => {
                expect(reducer()).to.deep.eq(initialState);
            });
        });

        describe(`when the payload does not contain a heroTeaser`, () => {
            beforeEach(() => {
                delete payload.body.heroTeaser;
            });

            it(`should return the state without the heroTeaser`, () => {
                expect(reducer(initialState, payload)).to.deep.eq({
                    heroTeaser: null,
                    latestTeasers: payload.body.latestTeasers,
                    videoGalleryTeasers: payload.body.videoGalleryTeasers,
                    list: {
                        params: {
                            pageNo: payload.body.list.params.pageNo
                        },
                        items: payload.body.list.items
                    },
                    mustRead: [],
                    promoted: {
                        title: '',
                        items: []
                    }
                });
            });
        });

        describe(`when the payload does not contain the latestTeasers`, () => {
            beforeEach(() => {
                delete payload.body.latestTeasers;
            });

            it(`should return the state with empty latestTeasers`, () => {
                expect(reducer(initialState, payload)).to.deep.eq({
                    heroTeaser: payload.body.heroTeaser,
                    latestTeasers: [],
                    videoGalleryTeasers: payload.body.videoGalleryTeasers,
                    list: {
                        params: {
                            pageNo: payload.body.list.params.pageNo
                        },
                        items: payload.body.list.items
                    },
                    mustRead: [],
                    promoted: {
                        title: '',
                        items: []
                    }
                });
            });
        });

        describe(`when the payload does not contain the videoGalleryTeasers`, () => {
            beforeEach(() => {
                delete payload.body.videoGalleryTeasers;
            });

            it(`should return the state with empty videoGalleryTeasers`, () => {
                expect(reducer(initialState, payload)).to.deep.eq({
                    heroTeaser: payload.body.heroTeaser,
                    latestTeasers: payload.body.latestTeasers,
                    videoGalleryTeasers: [],
                    list: {
                        params: {
                            pageNo: payload.body.list.params.pageNo
                        },
                        items: payload.body.list.items
                    },
                    mustRead: [],
                    promoted: {
                        title: '',
                        items: []
                    }
                });
            });
        });
    });

    describe(`on LOAD_CONTENT_FAILED`, () => {
        beforeEach(() => {
            body = {
                heroTeaser: {},
                latestTeasers: ['Teaser 1', 'Teaser 2'],
                videoGalleryTeasers: ['VideoTeaser 1', 'VideoTeaser 2', 'VideoTeaser 3'],
                list: {
                    params: {
                        pageNo: 1
                    },
                    items: []
                },
                mustRead: [],
                promoted: {
                    title: '',
                    items: []
                }
            };
            payload = {
                type: 'LOAD_CONTENT_FAILED',
                body
            };
        });

        it(`should return the data as empty`, () => {
            expect(reducer(initialState, payload)).to.deep.eq(initialState);
        });
    });

    describe(`on RANDOM_ACTION`, () => {
        beforeEach(() => {
            body = {
                heroTeaser: {},
                latestTeasers: ['Teaser 1', 'Teaser 2'],
                videoGalleryTeasers: ['VideoTeaser 1', 'VideoTeaser 2', 'VideoTeaser 3'],
                list: {
                    params: {
                        pageNo: 1
                    },
                    items: []
                },
                mustRead: [],
                promoted: {
                    title: '',
                    items: []
                }
            };
            payload = {
                type: 'RANDOM_ACTION',
                body
            };
        });
        it(`should return the initalState`, () => {
            expect(reducer(initialState, payload)).to.deep.eq(initialState);
        });
    });
});
