import navigation from './modules/navigation';
import heroTeaser from './modules/homeHeroTeaser';
import latestTeasers from './latestTeasers';

export default {
    "entity": {
        "dateCreated": "2016-01-18T12:00:00",
        "googleNewsKeywords": "News Keywords",
        "id": "ID-1234",
        "imageFacebookUrl": {},
        "imageUrl": "",
        "nodeType": "Homepage",
        "tags": ["tag1", "tag2"],
        "title": "Home",
        "url": "/"
    },
    "headerMetaData": {
        "author": "Theo Hatzi",
        "breadcrumbs": [{"siteName": "dolly"}],
        "canonicalUrl": "",
        "faceBookAdmins": "",
        "googleTagManagerEnvironment": "Development",
        "googleTagManagerMasthead": "DOLLY",
        "GroupingCategory": "",
        "hrefLang": "",
        "pageDescription": "This is a page description",
        "pageName": "Homepage",
        "robots": "",
        "title": "Home"
    },
    "trendingItems": [
        {
            "nodeId": "DOLLY-73971",
            "score": 1,
            "location": "http://dolly.com.au/celeb-news/gossip/2016/3/harry-styles-kaia-gerber-cindy-crawford",
            "title": "Harry Styles spotted with Cindy Crawford and her daughter Kaia Gerber ",
            "imageUrl": "http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Dolly/2016/03/17/73971/sdfsdf-(6).jpg",
            "description": "Here’s everything One Direction got up to this week.",
            "updateTime": "2016-03-17T16:50:35.900000+11:00",
            "contentType": "CleoPageArticle",
            "hasVideo": false,
            "categoryPath": [
                "Dolly",
                "Celeb News",
                "Gossip",
                "2016",
                "3"
            ],
            "tags": [
                "",
                "source:"
            ],
            "contentHasVideo": false,
            "nodeType": "",
            "dateCreated": ""
        },
        {
            "nodeId": "DOLLY-73969",
            "score": 0.910066780305656,
            "location": "http://dolly.com.au/fashion-beauty/style-news/2016/3/kendall-kylie-jenner-sports-outfits-confused",
            "title": "Kendall and Kylie Jenner wore thigh-high boots to the Lakers vs Sacramento Kings game",
            "imageUrl": "http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Dolly/2016/03/17/73969/landscape-1458162987-rihanna-and-drake-dancing-to-work-on-anti-tour.jpg",
            "description": "How to be casual: don't be Kendall and Kylie.",
            "updateTime": "2016-03-17T14:27:53.187000+11:00",
            "contentType": "CleoPageArticle",
            "hasVideo": false,
            "categoryPath": [
                "Dolly",
                "Fashion & Beauty",
                "Style News",
                "2016",
                "3"
            ],
            "tags": [
                "",
                "source:"
            ],
            "contentHasVideo": false,
            "nodeType": "",
            "dateCreated": ""
        },
        {
            "nodeId": "DOLLY-73966",
            "score": 0.867660013495448,
            "location": "http://dolly.com.au/celeb-news/gossip/2016/3/selena-gomez-taylor-swift-duet",
            "title": "Selena Gomez is totally up for a duet with Taylor Swift in the not-too-distant future",
            "imageUrl": "http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Dolly/2016/03/17/73966/98nxDyZ-(3).jpg",
            "description": "MAKE IT HAPPEN.",
            "updateTime": "2016-03-17T10:34:19.510000+11:00",
            "contentType": "CleoPageArticle",
            "hasVideo": false,
            "categoryPath": [
                "Dolly",
                "Celeb News",
                "Gossip",
                "2016",
                "3"
            ],
            "tags": [
                "",
                "source:"
            ],
            "contentHasVideo": false,
            "nodeType": "",
            "dateCreated": ""
        },
        {
            "nodeId": "DOLLY-73973",
            "score": 0.847578427728533,
            "location": "http://dolly.com.au/advice/dolly-doctor/2016/3/7-apps-for-health-and-wellbeing",
            "title": "7 iPhone apps for your health and wellbeing",
            "imageUrl": "http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Dolly/2016/03/17/73973/Untitled-6.jpg",
            "description": "We've got you covered.",
            "updateTime": "2016-03-17T18:27:00.373000+11:00",
            "contentType": "CleoPageArticle",
            "hasVideo": false,
            "categoryPath": [
                "Dolly",
                "Advice",
                "DOLLY Doctor",
                "2016",
                "3"
            ],
            "tags": [
                "",
                "source:"
            ],
            "contentHasVideo": false,
            "nodeType": "",
            "dateCreated": ""
        },
        {
            "nodeId": "DOLLY-73974",
            "score": 0.814146267614546,
            "location": "http://dolly.com.au/celeb-news/gossip/2016/3/little-mix-justin-bieber-beyonce-mashup",
            "title": "Little Mix perform a Justin Bieber and Beyoncé mashup",
            "imageUrl": "http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Dolly/2016/03/17/73974/llm.jpg",
            "description": "CANNOT STOP LISTENING.",
            "updateTime": "2016-03-17T16:56:47.807000+11:00",
            "contentType": "CleoPageArticle",
            "hasVideo": false,
            "categoryPath": [
                "Dolly",
                "Celeb News",
                "Gossip",
                "2016",
                "3"
            ],
            "tags": [
                "",
                "source:"
            ],
            "contentHasVideo": false,
            "nodeType": "",
            "dateCreated": ""
        }
    ],
    latestTeasers: latestTeasers.slice(0, 7),
    list: {
        params: {
            pageNo: 1
        },
        items: [
            latestTeasers.slice(7)
        ]
    },
    "request": {
        "queryString": {
            "leaf": ""
        }
    },
    "section": {
        "id": "SECID-1234",
        "title": "Section Title"
    },
    headerNavigation: navigation.getData(),
    heroTeaser: heroTeaser.getData()
}
