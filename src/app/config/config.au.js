export default {
    urls: {
        footerUrls: {
            privacy: 'http://www.bauer-media.com.au/privacy',
            advertise: 'http://www.bauer-media.com.au/advertising/advertise-with-us',
            terms: 'http://www.bauer-media.com.au/terms/website-terms'
        },

        socialUrls: {
            facebook: 'https://www.facebook.com/nowtolove',
            twitter: 'https://twitter.com/NowToLove',
            instagram: 'https://www.instagram.com/NowToLove'
        }
    },

    brands: {
        uniheader: [
            {
                id: 'aww',
                title: "Australian Women's Weekly",
                magazineTitle: 'The Weekly',
                imageUrl: '/assets/images/headerlogos/AWW-logo.svg',
                url: '/aww',
                socialLinks: {
                    facebook: 'https://www.facebook.com/WomensWeeklyMag',
                    twitter: 'https://twitter.com/womensweeklymag',
                    instagram: 'https://www.instagram.com/womensweeklymag'
                }
            },
            {
                id: 'wd',
                title: "Woman's Day",
                imageUrl: '/assets/images/headerlogos/WD-logo.svg',
                url: '/womansday',
                socialLinks: {
                    facebook: 'https://www.facebook.com/WomansDayAUS',
                    twitter: 'https://twitter.com/womansdayaus',
                    instagram: 'https://www.instagram.com/Womansdayaus'
                }
            },
            {
                id: 'gh',
                title: 'Good Health',
                imageUrl: '/assets/images/headerlogos/GH-logo.svg',
                url: '/good-health',
                socialLinks: {
                    facebook: 'https://www.facebook.com/GoodHealthMag/',
                    twitter: 'https://twitter.com/goodhealthmag',
                    instagram: 'https://www.instagram.com/goodhealthmag'
                }
            },
            {
                id: 'ok',
                title: 'OK! Magazine',
                imageUrl: '/assets/images/headerlogos/OK-logo.svg',
                url: '/okmagazine',
                socialLinks: {
                    facebook: 'https://www.facebook.com/OKmagAustralia',
                    twitter: 'https://twitter.com/okmagaustralia',
                    instagram: 'https://www.instagram.com/okmagaustralia'
                }
            },
            {
                id: 'shop',
                title: 'SHOP Til You Drop',
                imageUrl: '/assets/images/headerlogos/SUMMERSHOP-logo.svg',
                url: '/shop-til-you-drop',
                socialLinks: {
                    facebook: 'https://www.facebook.com/shoptilyoudropmag/',
                    twitter: 'https://twitter.com/shoptilyoudrop',
                    instagram: 'https://www.instagram.com/shoptilyoudropmag/'
                },
                renderSubscribeElements: false
            },
            {
                id: 'nw',
                title: 'NW',
                imageUrl: '/assets/images/headerlogos/NW-logo.svg',
                url: '/nw',
                socialLinks: {
                    facebook: 'https://www.facebook.com/NWmagazine',
                    twitter: 'https://twitter.com/nwmag',
                    instagram: 'https://www.instagram.com/nwmag/'
                }
            },
            {
                id: 'take5',
                title: 'Take 5',
                imageUrl: '/assets/images/headerlogos/T5-logo.svg',
                url: '/take5mag',
                socialLinks: {
                    facebook: 'https://www.facebook.com/take5magazine',
                    twitter: 'https://twitter.com/take5magazine',
                    instagram: 'https://www.instagram.com/take5magazine/'
                }
            },
            {
                id: 'yours',
                title: 'Yours',
                imageUrl: '/assets/images/headerlogos/YOURS-logo.svg',
                url: '/yours',
                socialLinks: {
                    facebook: 'https://www.facebook.com/Yoursmagazineau/',
                    twitter: 'https://twitter.com/yoursmagazineau',
                    instagram: 'https://www.instagram.com/yoursmagazineau/'
                }
            },
            {
                id: 'mb',
                title: 'Mother and Baby',
                imageUrl: '/assets/images/headerlogos/MB-logo.svg',
                url: '/mother-and-baby',
                socialLinks: {
                    facebook: 'https://www.facebook.com/mbmag/',
                    twitter: 'https://twitter.com/motherbaby_au',
                    instagram: 'https://www.instagram.com/motherbaby_au'
                },
                renderSubscribeElements: false
            },
            {
                id: 'tvweek',
                title: 'TV WEEK',
                imageUrl: '/assets/images/headerlogos/TVWEEK-logo.svg',
                url: '/tvweek',
                socialLinks: {
                    facebook: 'https://www.facebook.com/tvweekmag',
                    twitter: 'https://twitter.com/TVWEEKmag',
                    instagram: 'https://www.instagram.com/TVWEEK'
                }
            }
        ],
        hamburgers: [
            {
                id: 'homes',
                imageUrl: '/assets/images/menulogos/HTL-logo-greytext.svg',
                url: 'http://homestolove.com.au/',
                title: 'Homes To Love'
            },
            {
                id: 'food',
                imageUrl: '/assets/images/menulogos/FTL-logo.svg',
                url: 'http://foodtolove.com.au/',
                title: 'Food To Love'
            },
            {
                id: 'elle',
                imageUrl: '/assets/images/menulogos/ELLE-logo-redtext.svg',
                url: 'http://elle.com.au/',
                title: 'Elle'
            },
            {
                id: 'harpers',
                imageUrl: '/assets/images/menulogos/HB-logo.svg',
                url: 'http://harpersbazaar.com.au/',
                title: "Harper's Bazaar"
            },
            {
                id: 'gt',
                imageUrl: '/assets/images/menulogos/GT-logo.svg',
                url: 'http://gourmettraveller.com.au/',
                title: 'Gourmet Traveller'
            },
            {
                id: 'cosmo',
                imageUrl: '/assets/images/menulogos/COSMO-logo.svg',
                url: 'http://cosmopolitan.com.au/',
                title: 'Cosmopolitan'
            },
            {
                id: 'dolly',
                imageUrl: '/assets/images/menulogos/DOLLY-logo.svg',
                url: 'http://dolly.com.au/',
                title: 'Dolly'
            },
            {
                id: 'beautyheaven',
                imageUrl: '/assets/images/menulogos/BEAUTYHEAVEN-logo.svg',
                url: 'http://beautyheaven.com.au/',
                title: 'Beauty Heaven'
            }
        ],
        shortSources: {
            "Australian Women's Weekly": 'AWW'
        }
    },
    features: {
        outbrain: {
            enabled: true
        },
        sailthru: {
            enabled: false
        }
    },
    outbrain: {
        templateId: 'NowtoLove',
        widgetId: 'AR_1',
        scriptUrl: 'http://widgets.outbrain.com/outbrain.js'
    },
    sailthru: {
        scriptUrl: 'https://ak.sail-horizon.com/spm/spm.v1.min.js',
        customerId: 'c4069ef0b89e8045516a10115a1f4216'
    }
};
