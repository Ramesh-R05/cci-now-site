import teaserMock from '../../mocks/teaser';
import { betterMockComponentContext } from '@bxm/flux';
import { shallow } from 'enzyme';

const Context = betterMockComponentContext();
const { React } = Context;
const ImageStub = Context.createStubComponent();
const TeaserTitleStub = Context.createStubComponent();
const DateStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const context = {
    config: {
        isFeatureEnabled: () => true,
        defaultImageUrl: '',
        global: {
            breakpoints: ''
        },
        features: {},
        brands: {
            site: [
                {
                    id: 'aww',
                    title: "Australian Women's Weekly",
                    magazineTitle: 'The Weekly',
                    imageUrl: '/assets/images/headerlogos/AWW-logo.svg',
                    heroImageUrl: '/assets/images/herologos/AWW-logo.svg',
                    url: '/aww',
                    socialLinks: {
                        facebook: 'https://www.facebook.com/WomensWeeklyMag',
                        twitter: 'https://twitter.com/womensweeklymag',
                        instagram: 'https://www.instagram.com/womensweeklymag'
                    },
                    newsletterUrl: 'https://www.nowtolove.com.au/aww-newsletter',
                    alternateHrefLangUrl: '/australianwomensweekly',
                    newsletterSignupInBodyCopy: 'https://cb.sailthru.com/join/5k7/signup-aww-article-iframe-bottom'
                },
                {
                    id: 'wd',
                    title: "Woman's Day",
                    imageUrl: '/assets/images/headerlogos/WD-logo.svg',
                    heroImageUrl: '/assets/images/herologos/WD-logo.svg',
                    url: '/womansday',
                    socialLinks: {
                        facebook: 'https://www.facebook.com/WomansDayAUS',
                        twitter: 'https://twitter.com/womansdayaus',
                        instagram: 'https://www.instagram.com/Womansdayaus'
                    },
                    newsletterUrl: 'https://www.nowtolove.com.au/womansday-newsletter',
                    alternateHrefLangUrl: '/womans-day',
                    newsletterSignupInBodyCopy: 'https://cb.sailthru.com/join/5k5/signup-womansday-article-iframe-bottom'
                }
            ]
        }
    }
};

const googleNativeAdsMock = {
    index: 0,
    label: 'home_top_feed_1',
    targets: {
        kw: 'home_top_feed_1',
        adUnitPath: 'sponsored/HomeTopNewsFeed1',
        adPositionClassName: 'google-native-ad-home-top-news-feed-1'
    }
};
const nativeAdContentMock = {
    link:
        'https://www.sportingnews.com/au/nba/news/2020-21-nba-schedule-cant-miss-matchups-missed-out-on-durant-lebron-kawhi-curry-irving-lillard-wall/vxp7emul2sj318jpyes7zrzoe',
    image: 'https://tpc.googlesyndication.com/simgad/9565448443628806830?',
    headline: 'The biggest head-to-head matchups',
    sponsor: 'NBA'
};

const contextNZ = {
    context: {
        config: {
            isFeatureEnabled: () => true,
            defaultImageUrl: '',
            global: {
                breakpoints: ''
            },
            site: {
                region: 'nz'
            },
            features: {}
        }
    }
};
const proxyquire = require('proxyquire').noCallThru();
const Teaser = proxyquire('../../../app/components/teaser/teaser', {
    react: React,
    '@bxm/teaser/lib/components/image': ImageStub,
    '@bxm/article/lib/components/teaser/title': TeaserTitleStub,
    '@bxm/datetime/lib/components/Date': DateStub,
    '@bxm/ad/lib/google/components/ad': AdStub
}).default;

describe('Component', () => {
    describe('Teaser', () => {
        const wrapper = shallow(
            <Teaser article={teaserMock.stores.homepageHeroItems.items[0]} sourceClassName="hero-teaser__source" className="hero-teaser" />,
            { context }
        );

        it('it should contain source detail', () => {
            expect(wrapper.find('p.hero-teaser__source').length).to.be.equal(1);
        });

        it('it should contain teaser image', () => {
            expect(wrapper.find(ImageStub).length).to.be.equal(1);
        });

        it('it should contain teaser title', () => {
            expect(wrapper.find(TeaserTitleStub).length).to.be.equal(1);
        });

        it('it should contain date component', () => {
            expect(wrapper.find(DateStub).length).to.be.equal(1);
        });

        it('it should use short title', () => {
            expect(wrapper.find(TeaserTitleStub).prop('title')).to.be.equal("George Clooney's wife takes name -- short");
        });

        describe('when the source is not NTL', () => {
            const wrapper = shallow(
                <Teaser
                    article={{ ...teaserMock, source: "Australian Women's Weekly" }}
                    sourceClassName="hero-teaser__source"
                    className="hero-teaser"
                />,
                { context }
            );

            it('it should render teaser hero background', () => {
                const elm = wrapper.find('.teaser__hero-background');
                expect(elm.length).to.be.equal(1);
            });

            it('it should render the correct logo', () => {
                const elm = wrapper.find('.teaser__brand-image');
                expect(elm.prop('src')).to.be.equal('/assets/images/herologos/AWW-logo.svg');
            });

            it('it should find source with correct className to style', () => {
                const elm = wrapper.find('.hero-teaser__source--australian-women-s-weekly');
                expect(elm.length).to.be.equal(1);
            });
        });

        describe('when the source is NTL', () => {
            const wrapper = shallow(
                <Teaser article={{ ...teaserMock, source: 'Now to love' }} sourceClassName="hero-teaser__source" className="hero-teaser" />,
                { context }
            );

            it('it should render teaser hero background', () => {
                const elm = wrapper.find('.teaser__hero-background');
                expect(elm.length).to.be.equal(1);
            });

            it('it should render the NTL logo', () => {
                const elm = wrapper.find('.teaser__brand-image');
                expect(elm.prop('src')).to.be.equal('/assets/images/herologos/NTL-logo.svg');
            });

            it('it should find source with correct className to style', () => {
                const elm = wrapper.find('.hero-teaser__source--now-to-love');
                expect(elm.length).to.be.equal(1);
            });
        });

        describe('when not googleNativeAds and not nativeAdHasContentReady and not nativeAdContent', () => {
            const wrapper = shallow(
                <Teaser article={teaserMock.stores.homepageHeroItems.items[0]} sourceClassName="hero-teaser__source" className="hero-teaser" />,
                { context }
            );

            it('it should render regular teaser', () => {
                const elm = wrapper.find('.teaser__inner');
                expect(elm.length).to.be.equal(1);
            });
        });

        describe('when showGoogleNativeAds and googleNativeAds', () => {
            const wrapper = shallow(<Teaser article={teaserMock.stores.homepageHeroItems.items[0]} googleNativeAds={googleNativeAdsMock} />, {
                context
            });

            it('it should render ad slot', () => {
                const elm = wrapper.find('.ad--slot-google-native');
                expect(elm.length).to.be.equal(1);
            });
        });

        describe('when showGoogleNativeAds and googleNativeAds and nativeAdHasContentReady and nativeAdContent', () => {
            const wrapper = shallow(
                <Teaser
                    article={teaserMock.stores.homepageHeroItems.items[0]}
                    googleNativeAds={googleNativeAdsMock}
                    nativeAdHasContentReady={true}
                    nativeAdContent={nativeAdContentMock}
                />,
                { context }
            );
            wrapper.setState({ nativeAdHasContentReady: true, nativeAdContent: nativeAdContentMock });

            it('it should render google native ad teaser container', () => {
                const elm = wrapper.find('.google-native-ad-teaser-container');
                expect(elm.length).to.be.equal(1);
                expect(wrapper.state('nativeAdHasContentReady')).to.equal(true);
                expect(wrapper.state('nativeAdContent')).to.equal(nativeAdContentMock);
            });
        });

        describe('when it is nz site', () => {
            const wrapper = shallow(<Teaser article={teaserMock.stores.homepageHeroItems.items[0]} />, contextNZ);

            it('it should has proper teaser classname for nz site', () => {
                expect(wrapper.prop('className')).to.equal('teaser teaser--nz');
            });
        });
    });
});
