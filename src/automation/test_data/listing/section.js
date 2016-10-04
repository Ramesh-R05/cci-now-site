import navigation from '../modules/navigation';
import latestTeasers from '../latestTeasers';

export default {
    entity: {
        dateCreated: '2016-01-18T12:00:00',
        googleNewsKeywords: 'News Keywords',
        id: 'ID-1234',
        imageFacebookUrl: {},
        imageUrl: '',
        nodeType: 'Section',
        tags: ['tag1', 'tag2'],
        title: 'Section',
        url: '/'
    },
    headerMetaData: {
        author: 'Theo Hatzi',
        breadcrumbs: [{siteName: 'dolly'}],
        canonicalUrl: '',
        faceBookAdmins: '',
        googleTagManagerEnvironment: 'Development',
        googleTagManagerMasthead: 'DOLLY',
        GroupingCategory: '',
        hrefLang: '',
        pageDescription: 'This is a page description',
        pageName: 'Homepage',
        robots: 'NOINDEX,NOFOLLOW',
        title: 'Home'
    },
    latestTeasers: latestTeasers.slice(0, 7),
    list: {
        params: {
            pageNo: 1
        },
        items: [
            latestTeasers.slice(7)
        ]
    },
    request: {
        queryString: {
            leaf: ''
        }
    },
    section: {
        id: 'SECID-1234',
        title: 'Section Title'
    },
    headerNavigation: navigation.getData()
}
