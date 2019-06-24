import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectToStores } from '@bxm/flux';
import Ad from '@bxm/ad/lib/google/components/ad';
import get from 'lodash/object/get';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import SocialContainer from '@bxm/social/lib/components/socialIcons/socialContainer';
import Page from './page';
import TeaserListView from '../components/teaser/list';
import Repeatable from '../components/repeatable';
import loadSearch from '../actions/loadSearch';
import StickyAndDockAd from '../components/page/stickyAndDockAd';
import SearchBar from '../components/search/searchBar';
import BrandNewsletter from '../components/brand/brandNewsletter';

function mapStateToProps(context) {
    const SearchStore = context.getStore('SearchStore');

    return {
        title: SearchStore.getTitle(),
        listNextParams: SearchStore.getSearchListNextParams(),
        magazineImageUrl: SearchStore.getMagazineImageUrl(),
        searchTotal: SearchStore.getSearchTotal(),
        teasers: SearchStore.getInitialSearchResults(),
        list: SearchStore.getSearchResultsList(),
        siteAlert: SearchStore.getSiteAlert()
    };
}

@connectToStores(['SearchStore'], mapStateToProps)
export default class Search extends Component {
    static displayName = 'Search';

    static propTypes = {
        nodeType: PropTypes.string.isRequired,
        listNextParams: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        currentUrl: PropTypes.string.isRequired,
        theme: PropTypes.object,
        siteAlert: PropTypes.object,
        searchTotal: PropTypes.number.isRequired,
        teasers: PropTypes.array,
        list: PropTypes.object.isRequired
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
        const { config } = this.context;
        const { nodeType, teasers, title, currentUrl, theme, searchTotal, list, listNextParams, siteAlert } = this.props;
        const keyword = nodeType === 'TagSection' && title ? [title] : [];
        const pageLocation = Ad.pos.outside;

        const pageTitle = (
            <h1 className="page-title">
                <span className="page-title__symbol" />
                <span>{`${searchTotal} ${title} results`}</span>
            </h1>
        );

        const themeEnabled = !!theme && !!theme.headerSmallBackground && !!theme.headerMediumBackground && !!theme.headerLargeBackground;

        const adProps = {
            className: 'ad--section-bottom-leaderboard',
            displayFor: ['small', 'medium', 'large', 'xlarge'],
            sizes: {
                banner: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            },
            pageLocation,
            targets: keyword
        };

        return (
            <Page currentUrl={currentUrl} pageTitle={pageTitle} className="page--section" theme={themeEnabled ? theme : {}} siteAlert={siteAlert}>
                <div className="section-page search-page">
                    <div className="container">
                        <div className="row">
                            <div className="page__top-container columns">
                                <div className="row">
                                    <div
                                        className="columns large-8 xlarge-9 section-page__teasers-container"
                                        ref={c => {
                                            this.top = c;
                                        }}
                                    >
                                        <SearchBar />

                                        <TeaserListView
                                            index={null}
                                            items={teasers.slice(0, 6)}
                                            className="news-feed top-news-feed"
                                            showAd={false}
                                            adPosition={8}
                                            adTargets={{ keyword }}
                                        />
                                    </div>
                                    <div className="page__social-wrapper columns large-4 xlarge-3">
                                        <div className="columns medium-6 large-12">
                                            <StickyAndDockAd
                                                offsetTop={95}
                                                offsetBottom={16}
                                                customiseBreakpoint={1024}
                                                bottomElm={this.state.bottomElm}
                                                topElm={this.state.topElm}
                                            >
                                                <Ad className="ad--section-mrec" sizes="mrec" displayFor="large" pageLocation={Ad.pos.aside} />

                                                <div className="page__get-social-container">
                                                    <BrandNewsletter />
                                                    <h2 className="page__social__title">Follow us</h2>
                                                    <SocialContainer
                                                        socialUrls={config.site.defaultSocialLinks}
                                                        classModifier="in-search"
                                                        gtmClass="gtm-follow-social-in-search"
                                                    />
                                                </div>
                                            </StickyAndDockAd>
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

                    {/* 2nd Leaderboard or banner below Gallery of Videos */}
                    {teasers.length ? (
                        <Ad
                            className="ad--section-leaderboard"
                            sizes={{
                                banner: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{ keyword }}
                            pageLocation={pageLocation}
                        />
                    ) : null}

                    <Repeatable
                        component={TeaserListView}
                        action={loadSearch}
                        dataSource={list}
                        nextParams={listNextParams}
                        className="news-feed bottom-news-feed"
                        pageLocation={pageLocation}
                        adTargets={{ keyword }}
                    />

                    {/* 3rd Leaderboard to show on tablet and up */}
                    {get(list, 'items[0].length') ? (
                        <StickyAd adProps={adProps} minHeight={450} stickyAtViewPort="mediumRangeMax" stickyDelay={5500} />
                    ) : null}
                </div>
            </Page>
        );
    }
}
