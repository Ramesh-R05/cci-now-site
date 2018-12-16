const entityPropertyMap = {
    id: 'id',
    contentTitle: 'title',
    contentSummaryTitle: 'shortTitle',
    contentBody: 'body',
    contentProfiles: 'authorProfiles',
    pageDateCreated: 'dateCreated',
    updated_at: 'dateModified',
    contentNewsKeywords: 'googleNewsKeywords',
    contentImageAltText: 'imageAltText',
    contentImageCaption: 'imageCaption',
    contentFacebookImageUrl: 'imageFacebookUrl',
    contentImageUrl: 'imageUrl',
    contentCampaign: 'campaign',
    nodeTypeAlias: 'nodeType',
    contentSummary: 'summary',
    contentCustomLabel: 'customLabel',
    contentSource: 'source',
    articleSource: 'source',
    source: 'source',
    adBrand: 'brand',
    url: 'url',
    location: 'url',
    parentName: 'parentName',
    parentUrl: 'parentUrl',
    contentVideo: 'video',
    contentHasVideo: 'hasVideo',
    contentGallery: 'galleryItems',
    siteName: 'siteName',
    siteUrl: 'siteUrl',
    tagsDetails: 'tagsDetails',
    subsections: 'subsections',
    isBrandHero: 'isBrandHero',
    disableAmp: 'disableAmp',
    isAllAmpCompatible: 'isAllAmpCompatible'
};

export function parseEntity(data, propertyMapOverride = {}) {
    const entity = {};
    const propertyMap = Object.assign({}, entityPropertyMap, propertyMapOverride);
    Object.keys(propertyMap).forEach(key => {
        const propertyName = propertyMap[key];

        if (propertyName && data[key]) {
            entity[propertyName] = data[key];
        }
    });

    return entity;
}

export function parseEntities(entities, propertyMapOverride) {
    return entities.map(entity => parseEntity(entity, propertyMapOverride));
}
