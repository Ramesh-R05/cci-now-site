const headerMetaDataPropertyMap = {
    pageCanonicalUrl: 'canonicalUrl',
    gtmGroupingCategory: 'GroupingCategory',
    pageHrefLang: 'hrefLang',
    pageMetaDescription: 'pageDescription',
    nodeName: 'pageName',
    pageTitle: 'title'
};

export default function parseHeaderMetaData(data, headerMetaData = {}) {
    Object.keys(headerMetaDataPropertyMap).forEach(key => {
        const propertyName = headerMetaDataPropertyMap[key];
        if (propertyName && data[key]) {
            headerMetaData[propertyName] = data[key];
        }
    });

    return headerMetaData;
}
