import parseHeaderMetaData from '../../../../app/server/bff/helper/parseHeaderMetaData';

const headerMetaDataInput = {
    pageCanonicalUrl: 'canonical url',
    gtmGroupingCategory: 'grouping category',
    pageHrefLang: 'href lang',
    pageMetaDescription: 'page description',
    nodeName: 'page name',
    pageTitle: 'title'
};

const headerMetaDataOutput = {
    canonicalUrl: headerMetaDataInput.pageCanonicalUrl,
    GroupingCategory: headerMetaDataInput.gtmGroupingCategory,
    hrefLang: headerMetaDataInput.pageHrefLang,
    pageDescription: headerMetaDataInput.pageMetaDescription,
    pageName: headerMetaDataInput.nodeName,
    title: headerMetaDataInput.pageTitle
};

describe('#parseHeaderMetaData', () => {
    let headerMetaData;

    describe(`when not passing additional headerMetaData items`, () => {
        before(() => {
            headerMetaData = parseHeaderMetaData(headerMetaDataInput);
        });

        it('should return required headerMetaData properties', () => {
            expect(headerMetaData).to.deep.equal(headerMetaDataOutput);
        });
    });

    describe(`when passing additional headerMetaData items`, () => {
        const additionalHeaderItems = {
            author: '',
            breadcrumbs: [],
            googleTagManagerEnvironment: 'Development',
            googleTagManagerMasthead: 'DOLLY',
            robots: 'NOINDEX,NOFOLLOW'
        };
        before(() => {
            headerMetaData = parseHeaderMetaData(headerMetaDataInput, additionalHeaderItems);
        });

        it('should return required headerMetaData properties', () => {
            expect(headerMetaData).to.deep.equal(Object.assign({}, headerMetaDataOutput, additionalHeaderItems));
        });
    });
});
