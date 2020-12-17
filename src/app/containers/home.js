import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectToStores } from '@bxm/flux';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import SocialContainer from '@bxm/social/lib/components/socialIcons/socialContainer';
import HeroTeaser from '../components/teaser/hero';
import TeaserGridView from '../components/teaser/grid';
import TeaserListView from '../components/teaser/list';
import Page from './page';
import Repeatable from '../components/repeatable';
import loadList from '../actions/loadList';
import StickyAndDockAd from '../components/page/stickyAndDockAd';
import MustRead from '../components/mustRead/mustRead';
import BrandNewsletter from '../components/brand/brandNewsletter';

function mapStateToProps(context) {
    const teaserStore = context.getStore('TeaserStore');

    return {
        heroTeaser: teaserStore.getHeroTeaser(),
        teasers: teaserStore.getLatestTeasers(),
        list: teaserStore.getList(),
        listNextParams: teaserStore.getListNextParams()
    };
}

@connectToStores(['TeaserStore'], mapStateToProps)
export default class Home extends Component {
    static displayName = 'HomePage';

    static propTypes = {
        heroTeaser: PropTypes.object.isRequired,
        list: PropTypes.object.isRequired,
        listNextParams: PropTypes.object.isRequired,
        teasers: PropTypes.array,
        currentUrl: PropTypes.string.isRequired,
        theme: PropTypes.object,
        siteAlert: PropTypes.object
    };

    static defaultProps = {
        teasers: [],
        theme: {},
        siteAlert: {}
    };

    static contextTypes = {
        config: PropTypes.object
    };

    state = {
        bottomElm: null,
        topElm: null
    };

    componentDidMount() {
        this.setState({
            // eslint-disable-line react/no-did-mount-set-state
            bottomElm: this.bottom,
            topElm: this.top
        });
    }

    render() {
        const { currentUrl, heroTeaser, teasers, theme, siteAlert } = this.props;
        const { bottomElm, topElm } = this.state;
        const { config } = this.context;
        const googleNativeAdLabels = this.context.config.googleNativeAds.details;
        const pageLocation = Ad.pos.outside;
        const adProps = {
            className: 'ad--section-bottom-leaderboard',
            displayFor: ['small', 'medium', 'large', 'xlarge'],
            sizes: {
                banner: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            },
            pageLocation
        };

        return (
            <Page currentUrl={currentUrl} theme={theme} siteAlert={siteAlert}>
                <div className="home-page">
                    {/* 1st Leaderboard or billboard to show on tablet and up */}
                    <div className="stripe-bg">
                        <div className="container">
                            <div className="row">
                                <MustRead />
                            </div>
                            <div className="row">
                                <div className="page__top-container columns">
                                    <div className="row">
                                        <div
                                            className="columns large-8 xlarge-9 home-page__teasers-container"
                                            ref={c => {
                                                this.top = c;
                                            }}
                                        >
                                            <HeroTeaser article={heroTeaser} showPromoted />

                                            <div className="home-page__teasers-title home-page__teasers-title-top-news-feed">
                                                <span>the latest</span>
                                            </div>

                                            <TeaserGridView
                                                teasers={teasers.slice(0, 6)}
                                                className="news-feed top-news-feed"
                                                adPosition={8}
                                                adSizes={{ small: 'mrec', medium: ['mrec', 'double-mrec'] }}
                                                nativeAdConfig={{
                                                    slotPositionIndex: googleNativeAdLabels.homeTopFeed
                                                }}
                                            />
                                        </div>
                                        <div className="page__social-wrapper columns large-4 xlarge-3">
                                            <div className="row">
                                                <div className="columns medium-6 large-12">
                                                    <StickyAndDockAd
                                                        offsetTop={95}
                                                        offsetBottom={16}
                                                        customiseBreakpoint={1024}
                                                        bottomElm={bottomElm}
                                                        topElm={topElm}
                                                    >
                                                        <Ad
                                                            className="ad--section-mrec"
                                                            sizes="mrec"
                                                            displayFor="large"
                                                            pageLocation={Ad.pos.aside}
                                                        />
                                                        <div className="page__get-social-container">
                                                            <BrandNewsletter />
                                                            <h2 className="page__social__title">Follow us</h2>
                                                            <SocialContainer
                                                                socialUrls={config.site.defaultSocialLinks}
                                                                classModifier="in-home"
                                                                gtmClass="gtm-follow-social-in-home"
                                                            />
                                                        </div>
                                                    </StickyAndDockAd>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={c => {
                            this.bottom = c;
                        }}
                    />

                    <Ad
                        className="ad--section-leaderboard"
                        sizes={{
                            banner: 'banner',
                            leaderboard: 'leaderboard',
                            billboard: ['billboard', 'leaderboard']
                        }}
                        pageLocation={pageLocation}
                    />

                    <Repeatable
                        component={TeaserListView}
                        action={loadList}
                        dataSource={this.props.list}
                        nextParams={this.props.listNextParams}
                        className="news-feed bottom-news-feed"
                        nativeAdConfig={{
                            slotPositionIndex: googleNativeAdLabels.homeBottomFeed
                        }}
                    />

                    {/* 3rd Leaderboard to show on tablet and up */}
                    <StickyAd adProps={adProps} minHeight={450} stickyAtViewPort="mediumRangeMax" stickyDelay={5500} />
                </div>
            </Page>
        );
    }
}
