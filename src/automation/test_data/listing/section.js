import navigation from '../modules/navigation';
import latestTeasers from '../latestTeasers';
import subsectionList from '../subsectionList';

export default {
    entity: {
        id: "NOW-1206",
        title: "Fashion",
        dateCreated: "2016-11-23T02:25:50.00Z",
        imageFacebookUrl: {
            tags: [ ],
            source: "",
            credits: [ ]
        },
        nodeType: "Section",
        url: "/",
        parentName: "Fashion",
        parentUrl: "/fashion"
    },
    headerMetaData: {
        googleTagManagerEnvironment: "dev",
        googleTagManagerMasthead: "NOW",
        robots: "NOINDEX,NOFOLLOW",
        canonicalUrl: "",
        pageDescription: "Fashion",
        pageName: "Fashion",
        title: "Fashion"
    },
    latestTeasers: latestTeasers.slice(0, 7),
    list: {
        params: {
            pageNo: 1
        },
        items: [
            latestTeasers.slice(6)
        ],
        "previous": null,
        "current": {
            "path": "/",
            "url": "http://automation.now-site.bauer-media.net.au/fashion"
        },
        "next": {
            "path": "/?pageNo=2",
            "url": "http://automation.now-site.bauer-media.net.au/fashion/?pageNo=2"
        }
    },
    request: {
        queryString: {
            leaf: ''
        }
    },
    section: {
        id: "NOW-1206",
        name: "Fashion",
        urlName: "fashion"
    },
    subsectionList: subsectionList,
    headerNavigation: navigation.getData()
}
