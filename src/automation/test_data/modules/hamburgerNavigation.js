import DataManager from '../class/DataManager';

const hamburgerNavigation = {
    items: [
        {
            id: 'NOW-1168',
            name: 'Celebrity',
            dateCreated: '2016-11-23T02:25:42.00Z',
            nodeType: 'Section',
            url: '/celebrity',
            parentName: 'Celebrity',
            parentUrl: '/celebrity',
            subsections: [
                {
                    id: 'NOW-1169',
                    url: '/celebrity/celeb-news',
                    contentTitle: 'Celeb News'
                },
                {
                    id: 'NOW-1170',
                    url: '/celebrity/tv',
                    contentTitle: 'TV'
                }
            ]
        },
        {
            id: 'NOW-1172',
            name: 'News',
            dateCreated: '2016-11-23T02:25:43.00Z',
            nodeType: 'Section',
            url: '/news'
        },
        {
            id: 'NOW-1176',
            name: 'Tech & Science',
            dateCreated: '2016-11-23T02:25:44.00Z',
            nodeType: 'Section',
            url: '/tech-science'
        },
        {
            id: 'NOW-1199',
            name: 'Parenting',
            dateCreated: '2016-11-23T02:25:49.00Z',
            nodeType: 'Section',
            url: '/parenting'
        },
        {
            id: 'NOW-1204',
            name: 'Relationships',
            dateCreated: '2016-11-23T02:25:50.00Z',
            nodeType: 'Section',
            url: '/relationships'
        },
        {
            id: 'NOW-1206',
            name: 'Fashion',
            dateCreated: '2016-11-23T02:25:50.00Z',
            nodeType: 'Section',
            url: '/fashion'
        }
    ]
};

const newHamburgerNav = [
    {
        id: 'NOW-1168',
        pageDateCreated: '2016-11-23T02:25:42.00Z',
        nodeTypeAlias: 'Section',
        location: '/celebrity',
        parentName: 'Celebrity',
        parentUrl: '/celebrity',
        subsections: [
            { id: 'NOW-1169', url: '/celebrity/celeb-news', contentTitle: 'Celeb News' },
            { id: 'NOW-1170', url: '/celebrity/tv', contentTitle: 'TV' }
        ],
        contentTitle: 'Celebrity'
    },
    { id: 'NOW-1172', pageDateCreated: '2016-11-23T02:25:43.00Z', nodeTypeAlias: 'Section', location: '/news', contentTitle: 'News' },
    {
        id: 'NOW-1176',
        pageDateCreated: '2016-11-23T02:25:44.00Z',
        nodeTypeAlias: 'Section',
        location: '/tech-science',
        contentTitle: 'Tech & Science'
    },
    { id: 'NOW-1199', pageDateCreated: '2016-11-23T02:25:49.00Z', nodeTypeAlias: 'Section', location: '/parenting', contentTitle: 'Parenting' },
    {
        id: 'NOW-1204',
        pageDateCreated: '2016-11-23T02:25:50.00Z',
        nodeTypeAlias: 'Section',
        location: '/relationships',
        contentTitle: 'Relationships'
    },
    { id: 'NOW-1206', pageDateCreated: '2016-11-23T02:25:50.00Z', nodeTypeAlias: 'Section', location: '/fashion', contentTitle: 'Fashion' }
];

export default new DataManager(hamburgerNavigation);

export { newHamburgerNav };
