import navigation from '../modules/navigation';
import latestTeasers from '../latestTeasers';

export default {
    entity: {
        id: "NOW-1210",
        title: "Beauty",
        dateCreated: "2016-11-23T02:25:51.00Z",
        imageFacebookUrl: {
            tags: [ ],
            source: "",
            credits: [ ]
        },
        nodeType: "Section",
        url: "/",
        parentName: "Beauty",
        parentUrl: "/beauty"
    },
    headerMetaData: {
        googleTagManagerEnvironment: "dev",
        googleTagManagerMasthead: "NOW",
        robots: "NOINDEX,NOFOLLOW",
        canonicalUrl: "http://dev.now-site.bauer-media.net.au/beauty",
        pageDescription: "Beauty",
        pageName: "Beauty",
        title: "Beauty"
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
        id: "NOW-1210",
        name: "Beauty",
        urlName: "beauty"
    },
    headerNavigation: navigation.getData()
}
