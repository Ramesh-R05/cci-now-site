const headerMetaDataPropertyMap = {
    pageCanonicalUrl: 'canonicalUrl',
    gtmGroupingCategory: 'GroupingCategory',
    pageHrefLang: 'hrefLang',
    pageMetaDescription: 'pageDescription',
    nodeName: 'pageName',
    pageTitle: 'title'
};

const headerMetaDataPropertyMapKeys = Object.keys(headerMetaDataPropertyMap);

export function parseHeaderMetaData(data, headerMetaData = {}) {
    headerMetaDataPropertyMapKeys.map((key) => {
        const propertyName = headerMetaDataPropertyMap[key];
        if (propertyName && data[key]) {
            headerMetaData[propertyName] = data[key];
        }
    });

    return headerMetaData;
}
