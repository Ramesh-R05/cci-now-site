import navigation from '../modules/navigation';

export default {
    entity: {
        nodeType: 'TagSection',
        title: 'Video',
        url: '/tags/video'
    },
    headerMetaData: {
        author: 'Theo Hatzi',
        canonicalUrl: '',
        faceBookAdmins: '',
        googleTagManagerEnvironment: 'Development',
        googleTagManagerMasthead: 'DOLLY',
        GroupingCategory: '',
        hrefLang: '',
        pageDescription: '',
        pageName: 'Tag',
        robots: 'NOINDEX,NOFOLLOW',
        title: ''
    },
    request: {
        queryString: {
            leaf: ''
        }
    },
    headerNavigation: navigation.getData()
}
