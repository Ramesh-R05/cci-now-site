import DataManager from '../class/DataManager';

const navigation = {
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
            id: 'NOW-1206',
            name: 'Fashion',
            dateCreated: '2016-11-23T02:25:50.00Z',
            nodeType: 'Section',
            url: '/fashion',
            parentName: 'Fashion',
            parentUrl: '/fashion'
        },
        {
            id: 'NOW-1180',
            name: 'Health',
            dateCreated: '2016-11-23T02:25:45.00Z',
            nodeType: 'Section',
            url: '/health'
        },
        {
            id: 'NOW-1186',
            name: 'Lifestyle',
            dateCreated: '2016-11-23T02:25:46.00Z',
            imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Now/2017/03/17/35755/deb_4.jpg',
            nodeType: 'Section',
            url: '/lifestyle',
            parentName: 'Lifestyle',
            parentUrl: '/lifestyle'
        },
        {
            id: 'NOW-1217',
            name: 'Royals',
            dateCreated: '2016-11-23T02:25:52.00Z',
            nodeType: 'Section',
            url: '/royals',
            parentName: 'Royals',
            parentUrl: '/royals'
        }
    ]
};

export default new DataManager(navigation);
