import navigation from './modules/navigation';
import heroTeaser from './modules/homeHeroTeaser';
import latestTeasers from './latestTeasers';
import hamburgerNavigation from './modules/hamburgerNavigation';

export default {
    entity: {
        id: 'NOW-1159',
        title: 'Now',
        dateCreated: '2016-10-05T05:54:47.00Z',
        imageFacebookUrl: {
            tags: [],
            source: '',
            credits: []
        },
        nodeType: 'Homepage',
        url: '/',
        parentName: 'Now',
        parentUrl: '/',
        siteUrl: 'http://dev.now-site.bauer-media.net.au',
        enableSiteAlert: true,
        siteAlertButtonLink:
            'https://aws.amazon.com/blogs/networking-and-content-delivery/continually-enhancing-domain-security-on-amazon-cloudfront/',
        siteAlertButtonText: 'not used button text',
        siteAlertTextColour: 'red',
        siteAlertPrimaryText: 'NOW TO LOVE.',
        siteAlertButtonColour: 'button color not used',
        siteAlertSecondaryText: 'secondary text.',
        siteAlertBackgroundImage: {
            url: 'http://d36kx15wbx6ooz.cloudfront.net/s3/digital-cougar-assets-dev/now/2019/06/18/1560829316336_ScreenShot2019-06-14at3.38.24pm.png',
            link: 'http://localhost:3001/any/thing/kendall-jenners-skin-doctor-tells-us-what-mistake-3640',
            tags: [],
            title: 'Site Alert Background Image',
            valid: true,
            width: 1486,
            height: 728,
            source: '',
            caption: 'Site Alert Background Image caption',
            credits: [],
            creditText: 'Site Alert Background Image caption'
        },
        siteAlertBackgroundColour: 'yellow'
    },
    headerMetaData: {
        googleTagManagerEnvironment: 'dev',
        googleTagManagerMasthead: 'NOW',
        robots: 'NOINDEX,NOFOLLOW',
        canonicalUrl: 'http://dev.now-site.bauer-media.net.au/',
        pageDescription: "The online home of Australia's most loved magazine brands!",
        pageName: 'Now',
        title: 'Now to Love | Celebrity, News, Parenting, Health, Beauty, Fashion, Lifestyle'
    },
    theme: {
        id: 'NOW-32655',
        url: '/modules/hometheme',
        themeName: 'Confetti',
        moduleName: 'hometheme',
        themeImage: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Now/2017/10/06/38614/recording-(3).gif',
        themeColour: '#31c7ce',
        themeAlignment: 'center',
        pageDateCreated: '2017-02-07T01:27:43.00Z',
        themeTextColour: '#ffffff',
        moduleManualContent: {
            totalCount: 0,
            data: []
        }
    },
    siteAlert: {
        styles: {
            textColor: ' #ffffff',
            backgroundColor: '#031424',
            backgroundImage: ''
        },
        primaryText: 'THE LOGIES ARE ALMOST HERE.',
        secondaryText: 'Support your favourite actor and vote now!',
        link: 'https://aws.amazon.com/blogs/networking-and-content-delivery/continually-enhancing-domain-security-on-amazon-cloudfront/',
        isEnabled: true
    },
    headerNavigation: navigation.getData(),
    hamburgerNavigation: hamburgerNavigation.getData(),
    footer: {},
    mustRead: [
        {
            id: 'NOW-10467',
            title: 'Family Long Title wins $4 million dream home for just $200',
            dateCreated: '2016-10-13T03:33:00.00Z',
            imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/AWW/2016/08/17/28455/Beach-house-art.jpg',
            nodeType: 'Gallery',
            summary:
                'A family of four has nabbed a $4 million oceanfront mansion in Sydney???s swanky suburb of Freshwater after entering the RSL Lottery.',
            source: "Australian Women's Weekly",
            url: '/news/real-life/family-of-four-wins-4-million-sydney-beach-house-in-rsl-lottery-10467',
            tagsDetails: [
                {
                    name: 'business:industry:Interior design',
                    urlName: 'interior-design',
                    fullName: 'business_industry_Interior_design',
                    displayName: 'Interior design'
                }
            ]
        },
        {
            id: 'NOW-10465',
            title: 'QLD toddler bitten by snake will need lifelong care',
            dateCreated: '2016-10-10T03:03:24.00Z',
            imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/AWW/2016/10/10/29186/snakebiteMAIN-(1).jpg',
            nodeType: 'Article',
            summary: '"I have been a total mess since this happened to my boy."',
            source: "Australian Women's Weekly",
            url: '/news/real-life/boy-bitten-by-snake-will-need-care-his-whole-life-10465',
            tagsDetails: [
                {
                    name: 'tv:tv_genre:Real life',
                    urlName: 'real-life',
                    fullName: 'tv_tv_genre_Real_life',
                    displayName: 'Real life'
                },
                {
                    name: 'tv:tv_genre:News',
                    urlName: 'news',
                    fullName: 'tv_tv_genre_News',
                    displayName: 'News'
                },
                {
                    name: 'location:australian_state:Queensland',
                    urlName: 'queensland',
                    fullName: 'location_australian_state_Queensland',
                    displayName: 'Queensland'
                }
            ]
        },
        {
            id: 'NOW-2915',
            title: 'Antiguan Prime Minister teases Prince Harry about his "honeymoon" with Meghan Markle',
            dateCreated: '2016-11-22T23:47:00.00Z',
            imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/AWW/2016/11/23/29807/MAIN.jpg',
            nodeType: 'Article',
            summary:
                'They went public just two weeks ago but Prince Harry and Meghan Markle have already been invited to Antigua for their future honeymoon.\r\nPrince Harry teased about honeymoon with Meghan Markle',
            url: '/royals/british-royal-family/prince-harry-teased-about-honeymoon-with-meghan-markle-2915',
            video: {
                id: '5221373634001',
                name: 'Prince Harry left fuming during royal tour',
                type: 'VideoItem',
                properties: {
                    videoConfiguration: {
                        status: '',
                        videoId: '5221373634001',
                        statusCode: 200,
                        brightcoveId: '5221373634001',
                        thumbnailUrl:
                            'http://brightcove04.o.brightcove.com/761709621001/761709621001_5226173122001_5221373634001-th.jpg?pubId=761709621001',
                        videoStillUrl:
                            'http://brightcove04.o.brightcove.com/761709621001/761709621001_5226173123001_5221373634001-vs.jpg?pubId=761709621001'
                    }
                }
            },
            tagsDetails: [
                {
                    name: 'royalty:noble_person:Prince Harry',
                    urlName: 'prince-harry',
                    fullName: 'royalty_noble_person_Prince_Harry',
                    displayName: 'Prince Harry'
                },
                {
                    name: 'people:family:British Royal Family',
                    urlName: 'british-royal-family',
                    fullName: 'people_family_British_Royal_Family',
                    displayName: 'British Royal Family'
                }
            ]
        },
        {
            id: 'NOW-8915',
            title: 'Official White House photographer picked his favourite Obama pictures and they???ll make you melt',
            dateCreated: '2016-11-14T06:20:43.00Z',
            imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/AWW/2016/11/14/29685/obama-holding.jpg',
            nodeType: 'Gallery',
            summary: 'It???s believed Pete Souza has snapped 2 million pictures of the current President. These are his best.',
            source: "Australian Women's Weekly",
            url: '/news/latest-news/official-white-house-photographer-favourite-obama-pictures-8915',
            tagsDetails: [
                {
                    name: 'celebrities:celebrity:Michelle Obama',
                    urlName: 'michelle-obama',
                    fullName: 'celebrities_celebrity_Michelle_Obama',
                    displayName: 'Michelle Obama'
                },
                {
                    name: 'government:us_president:Barack Obama',
                    urlName: 'barack-obama',
                    fullName: 'government_us_president_Barack_Obama',
                    displayName: 'Barack Obama'
                }
            ]
        },
        {
            id: 'NOW-31090',
            title: 'Between the sheets! Is this the secret to the happiest kind of sex life?',
            dateCreated: '2016-11-08T03:35:19.00Z',
            imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/WomansDay/2016/11/08/17048/HERO_OLIVIA.jpg',
            nodeType: 'Article',
            summary: 'Apparently, researchers say it???s all about getting a handle of each other???s sexpectations...',
            source: "Woman's Day",
            url: '/relationships/relationship-advice/is-this-the-secret-to-the-happiest-kind-of-sex-life-31090',
            tagsDetails: [
                {
                    name: 'media_common:quotation_subject:Sex',
                    urlName: 'sex',
                    fullName: 'media_common_quotation_subject_Sex',
                    displayName: 'Sex'
                },
                {
                    name: 'people:profession:actor:Will Smith',
                    urlName: 'will-smith',
                    fullName: 'people_profession_actor_Will_Smith',
                    displayName: 'Will Smith'
                },
                {
                    name: 'people:profession:model:Chrissy Teigen',
                    urlName: 'chrissy-teigen',
                    fullName: 'people_profession_model_Chrissy_Teigen',
                    displayName: 'Chrissy Teigen'
                },
                {
                    name: 'celebrities:celebrity:Olivia Wilde',
                    urlName: 'olivia-wilde',
                    fullName: 'celebrities_celebrity_Olivia_Wilde',
                    displayName: 'Olivia Wilde'
                },
                {
                    name: 'film:film_genre:Relationships',
                    urlName: 'relationships',
                    fullName: 'film_film_genre_Relationships',
                    displayName: 'Relationships'
                },
                {
                    name: 'tv:tv_actor:Jada Pinkett Smith',
                    urlName: 'jada-pinkett-smith',
                    fullName: 'tv_tv_actor_Jada_Pinkett_Smith',
                    displayName: 'Jada Pinkett Smith'
                },
                {
                    name: 'music:artist:Jason Sudeikis',
                    urlName: 'jason-sudeikis',
                    fullName: 'music_artist_Jason_Sudeikis',
                    displayName: 'Jason Sudeikis'
                },
                {
                    name: 'music:artist:John Legend',
                    urlName: 'john-legend',
                    fullName: 'music_artist_John_Legend',
                    displayName: 'John Legend'
                }
            ]
        },
        {
            id: 'NOW-2860',
            title: "Prince Harry's next royal tour confirmed",
            dateCreated: '2016-09-06T04:22:27.00Z',
            imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/AWW/2016/09/06/28704/Prince-Harry-art.jpg',
            nodeType: 'Gallery',
            summary: 'The royal will set off on his next official engagement in November on behalf of his grandmother, the Queen.',
            source: "Australian Women's Weekly",
            url: '/royals/british-royal-family/prince-harry-is-off-to-the-caribbean-2860',
            tagsDetails: [
                {
                    name: 'royalty:noble_person:Prince Harry',
                    urlName: 'prince-harry',
                    fullName: 'royalty_noble_person_Prince_Harry',
                    displayName: 'Prince Harry'
                },
                {
                    name: 'time:event:Royal visits to Australia',
                    urlName: 'royal-visits-to-australia',
                    fullName: 'time_event_Royal_visits_to_Australia',
                    displayName: 'Royal visits to Australia'
                },
                {
                    name: 'people:family:British Royal Family',
                    urlName: 'british-royal-family',
                    fullName: 'people_family_British_Royal_Family',
                    displayName: 'British Royal Family'
                }
            ]
        }
    ],
    promoted: {
        title: 'WOMEN OF THE YEAR',
        items: [
            {
                id: 'NOW-31818',
                title: "Readers' Pets gallery: Too cute!",
                dateCreated: '2013-01-29T13:00:00.00Z',
                imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Now/2017/10/06/38614/Lilly.jpg',
                nodeType: 'Gallery',
                source: "Woman's Day",
                url: '/lifestyle/pets/readers-pets-gallery-too-cute-31818'
            },
            {
                id: 'NOW-14557',
                title: "Duchess Kate's best hair look this week",
                dateCreated: '2016-06-15T01:56:33.00Z',
                imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/AWW/2016/06/15/27612/kate-art.jpg',
                nodeType: 'Gallery',
                summary: 'Talk about hair envy!',
                url: '/beauty/hair/duchess-kate-best-hair-looks-14557',
                tagsDetails: [
                    {
                        name: 'royalty:noble_person:Catherine, Duchess of Cambridge',
                        urlName: 'catherine-duchess-of-cambridge',
                        fullName: 'royalty_noble_person_Catherine_Duchess_of_Cambridge',
                        displayName: 'Catherine Duchess of Cambridge'
                    },
                    {
                        name: 'media_common:quotation_subject:Hair',
                        urlName: 'hair',
                        fullName: 'media_common_quotation_subject_Hair',
                        displayName: 'Hair'
                    },
                    {
                        name: 'people:family:British Royal Family',
                        urlName: 'british-royal-family',
                        fullName: 'people_family_British_Royal_Family',
                        displayName: 'British Royal Family'
                    }
                ]
            },
            {
                id: 'NOW-30085',
                title: 'From kidnap victim to talk-show host',
                dateCreated: '2007-12-06T13:00:00.00Z',
                imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Now/2017/10/06/38614/nat_45.jpg',
                nodeType: 'Article',
                source: 'Bounty',
                url: '/news/real-life/from-kidnap-victim-to-talk-show-host-30085'
            },
            {
                id: 'NOW-31892',
                title: 'Automation Test Article With Hero Image Test Title Long Title Long Title Long Title Long Title EOM',
                dateCreated: '2016-02-12T05:00:00.00Z',
                imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Now/2017/10/06/38614/test-main-image.jpg',
                nodeType: 'Article',
                summary:
                    'Automation Test Article With Hero Image Short Teaser Short Teaser Short Teaser Short Teaser Short Teaser Short Teaser Short Teaser Short Teaser Short Teaser Short Teaser Short Teaser Short Teaser EOM',
                source: "Australian Women's Weekly",
                url: '/beauty/hair/automation-test-article-with-hero-video-31892',
                video: {
                    id: '4066659625001',
                    name: 'Moroccan Lamb Salad',
                    type: 'VideoItem',
                    properties: {
                        videoConfiguration: {
                            status: '',
                            videoId: '4066659625001',
                            statusCode: 200,
                            brightcoveId: '4066659625001',
                            thumbnailUrl:
                                'http://brightcove01.brightcove.com/21/761709621001/201502/2281/761709621001_4067151975001_6456e206-940d-417e-b5e4-f0feac52bea5-AWSAccessKeyId-AKIAJWBBMGHEBQ6SISMA-Expires-1424389300-Signature-Wix42n8wHQfzZGIK8e2628VbazY-3D-th.jpg?pubId=761709621001',
                            videoStillUrl:
                                'http://brightcove04.o.brightcove.com/761709621001/761709621001_4067088485001_vlcsnap-00149.jpg?pubId=761709621001'
                        }
                    }
                },
                tagsDetails: [
                    {
                        name: 'award:award_winning_work:Gossip Girl',
                        urlName: 'gossip-girl',
                        fullName: 'award_award_winning_work_Gossip_Girl',
                        displayName: 'Gossip Girl'
                    },
                    {
                        name: 'internet:website_category:Dolly Doctor',
                        urlName: 'dolly-doctor',
                        fullName: 'internet_website_category_Dolly_Doctor',
                        displayName: 'Dolly Doctor'
                    }
                ]
            }
        ]
    },
    heroTeaser: heroTeaser.getData(),
    latestTeasers: latestTeasers.slice(0, 6),
    list: {
        params: {
            pageNo: 1
        },
        items: [latestTeasers.slice(5)],
        previous: null,
        current: {
            path: '/',
            url: 'http://automation.now-site.bauer-media.net.au/'
        },
        next: {
            path: '/?pageNo=2',
            url: 'http://automation.now-site.bauer-media.net.au/?pageNo=2'
        }
    },
    request: {
        queryString: {
            leaf: ''
        }
    },
    section: {
        id: 'NOW-1159',
        name: 'Home',
        urlName: 'home'
    }
};
