export const tagSections = [
    {
        nodeTypeAlias: 'TagSection',
        tagsDetails: { fullName: 'test tag 1' }
    },
    {
        nodeTypeAlias: 'TagSection',
        tagsDetails: { fullName: 'test tag 2' }
    },
    {
        nodeTypeAlias: 'TagSection',
        tagsDetails: { fullName: 'test tag 3' }
    },
    {
        nodeTypeAlias: 'TagSection',
        tagsDetails: { fullName: 'test tag 4' }
    }
];

export const commercialTagSections = [
    {
        nodeTypeAlias: 'CommercialTagSection',
        tagsDetails: { fullName: 'commercial tag 1' }
    },
    {
        nodeTypeAlias: 'CommercialTagSection',
        tagsDetails: { fullName: 'commercial tag 2' }
    },
    {
        nodeTypeAlias: 'CommercialTagSection',
        tagsDetails: { fullName: 'commercial tag 3' }
    },
    {
        nodeTypeAlias: 'CommercialTagSection',
        tagsDetails: { fullName: 'commercial tag 4' }
    }
];

export const withoutCommercialTags = [...tagSections];

export const withCommercialTags = [...tagSections, ...commercialTagSections];
