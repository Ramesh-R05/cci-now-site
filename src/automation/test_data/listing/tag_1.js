import navigation from '../modules/navigation';

export default {
    entity: {
        nodeType: 'TagSection',
        title: '1',
        url: '/tags/1'
    },
    headerMetaData: {
        author: 'Kieran Jones',
        canonicalUrl: '',
        faceBookAdmins: '',
        googleTagManagerEnvironment: 'Development',
        googleTagManagerMasthead: 'NOW',
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
};
