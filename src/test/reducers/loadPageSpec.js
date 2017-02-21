import {initialState, reducer} from '../../app/reducers/loadPage';

describe(`loadPage Reducer`, () => {
    let body;
    let payload;
    describe(`on LOAD_CONTENT`, () => {
        beforeEach(() => {
            body = {entity: { nodeType: 'Article', title: 'Title',  imageUrl: '', shortTitle: 'Short Title', summary: 'Summary' }, footer: {}, trendingItems: [], mustRead: []};
            payload = {
                type: 'LOAD_CONTENT',
                body
            };
        });

        describe(`when the payload contains the navigation items within the body object`, () => {
            it(`should return the new items`, () => {
                expect(reducer(initialState, payload)).to.contain.all.keys({
                    error: null,
                    footer: payload.body.footer,
                    nodeType: payload.body.entity.nodeType,
                    title: payload.body.entity.title,
                    shortTitle: payload.body.entity.shortTitle,
                    summary: payload.body.entity.summary,
                    trendingItems: payload.body.trendingItems,
                    magazineImageUrl: payload.body.entity.imageUrl
                });
            });

            it(`should still return the new items `, () => {
                expect(reducer(initialState, {body}, 'LOAD_CONTENT')).to.contain.all.keys({
                    error: null,
                    footer: payload.body.footer,
                    nodeType: payload.body.entity.nodeType,
                    title: payload.body.entity.title,
                    shortTitle: payload.body.entity.shortTitle,
                    summary: payload.body.entity.summary,
                    trendingItems: payload.body.trendingItems,
                    magazineImageUrl: payload.body.entity.imageUrl
                });
            });
        });

        describe(`when the payload is empty`, () => {
            it(`should return the initalState`, () => {
                expect(reducer()).to.deep.eq(initialState);
            });
        });

        describe(`when the payload does not contain entity`, () => {
            it(`should return the initalState`, () => {
                delete payload.body.entity;
                expect(reducer(initialState, payload)).to.deep.eq(initialState);
            });
        });
    });

    describe(`on LOAD_CONTENT_FAILED`, () => {
        let response;

        beforeEach(() => {
            response = {msg: 'Error Message', status: 404};
            payload = {
                type: 'LOAD_CONTENT_FAILED',
                response
            };
        });

        it(`should set the error and make nodeType and title empty`, () => {
            expect(reducer(initialState, payload)).to.deep.eq({
                error: response,
                footer: {},
                nodeType: '',
                title: '',
                trendingItems: [],
                magazineImageUrl: '',
                theme: ''
            });
        });

        it(`should set the error status to 400 if it is not set in response`, () => {
            delete response.status;
            expect(reducer(initialState, payload)).to.deep.eq({
                error: {msg: 'Error Message', status: 400},
                footer: {},
                nodeType: '',
                title: '',
                trendingItems: [],
                magazineImageUrl: '',
                theme: ''
            });
        });
    });

    describe(`on RANDOM_ACTION`, () => {
        beforeEach(() => {
            body = {entity: { nodeType: 'Article', title: 'Title' }};
            payload = {
                type: 'RANDOM_ACTION',
                body
            };
        });
        it(`should return the initalState`, () => {
            expect(reducer(initialState, payload)).to.deep.eq(initialState);
        });
    })
});
