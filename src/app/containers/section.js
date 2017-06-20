import React, { Component, PropTypes } from 'react';
import { connectToStores } from '@bxm/flux';
import Page from './page';
import Ad from '@bxm/ad/lib/google/components/ad';
import HeroTeaser from '../components/teaser/hero';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import TeaserGridView from '../components/teaser/grid';
import TeaserListView from '../components/teaser/list';
import Repeatable from '../components/repeatable';
import loadList from '../actions/loadList';
import SocialContainer from '../components/social/block';
import StickyAndDockAd from '../components/page/stickyAndDockAd';
import BrandMagazine from '../components/brand/brandMagazine';
import BrandTitle from '../components/brand/brandTitle';
import get from 'lodash/object/get';
import { find } from 'lodash';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';

function mapStateToProps(context) {
    const pageStore = context.getStore('PageStore');
    const teaserStore = context.getStore('TeaserStore');
    return {
        title: pageStore.getTitle(),
        shortTitle: pageStore.getShortTitle(),
        summary: pageStore.getSummary(),
        teasers: teaserStore.getLatestTeasers(),
        list: teaserStore.getList(),
        listNextParams: teaserStore.getListNextParams(),
        imageUrl: pageStore.getImageUrl()
    };
}

@connectToStores(['PageStore', 'TeaserStore'], mapStateToProps)
export default class Section extends Component {
    static displayName = 'Section';

    static propTypes = {
        nodeType: PropTypes.array.isRequired,
        list: PropTypes.array.isRequired,
        listNextParams: PropTypes.object.isRequired,
        teasers: PropTypes.array.isRequired,
        title: PropTypes.array.isRequired,
        currentUrl: PropTypes.string.isRequired,
        shortTitle: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        theme: PropTypes.object,
        imageUrl: PropTypes.string
    };

    static defaultProps = {
        teasers: [],
        theme: {},
        imageUrl: ''
    };

    static contextTypes = {
        config: PropTypes.object
    };

    state = {
        bottomElm: null,
        topElm: null
    };

    componentDidMount() {
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
            bottomElm: this.bottom,
            topElm: this.top
        });
    }

    render() {
        const { nodeType, teasers, title, currentUrl, shortTitle, summary, theme, imageUrl } = this.props;
        const heroTeaser = teasers[0];
        const firstTeaserList = teasers.slice(1, 7);
        const keyword = (nodeType === 'TagSection' && title) ? [title] : [];
        const pageLocation = Ad.pos.outside;

        const isBrandPage = nodeType === 'Brand';
        const brand = isBrandPage ? find(this.context.config.brands.uniheader, b => b.url === currentUrl.match(/\/[^/|?]*/)[0]) : null;
        const headerClassName = isBrandPage ? `header-${brand.id}` : '';
        const pageTitle = isBrandPage ? (
            <BrandTitle brand={brand} shortTitle={shortTitle} summary={summary} />
        ) : (
            <h1 className="page-title">
                <span className="page-title__symbol" />
                {title}
            </h1>
        );
        const polarLabels = this.context.config.polar.details;
        const imageSrc = imageResize.url({
            url: imageUrl,
            width: 633,
            mode: imageResize.mode.CROP,
            anchor: imageResize.anchor.TC
        });

        const adProps = {
            className: 'ad--section-top-leaderboard',
            displayFor: ['small', 'medium', 'large', 'xlarge'],
            sizes: {
                banner: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard'] },
            pageLocation
        };

        return (
            <Page
              currentUrl={currentUrl}
              headerExpanded={false}
              pageTitle={pageTitle}
              headerClassName={headerClassName}
              theme={theme}
            >
                <div className="section-page">
                    <div className="container">
                        <div className="row">
                            <div className="page__top-container columns">
                                <div className="row">
                                    <div
                                      className="columns large-8 xlarge-9 section-page__teasers-container"
                                      ref={(c) => { this.top = c; }}
                                    >

                                        {imageUrl && !isBrandPage &&
                                            <div className="banner-wrapper">
                                                <img src={imageSrc} alt={title} />
                                            </div>
                                        }

                                        <HeroTeaser showDate={!isBrandPage} article={heroTeaser} brand={brand} />

                                        <TeaserGridView
                                          teasers={firstTeaserList}
                                          showDate={!isBrandPage}
                                          className="news-feed top-news-feed"
                                          adPosition={8}
                                          adTargets={{ keyword }}
                                          nativeAdConfig={isBrandPage || {
                                              slotPositionIndex: polarLabels.sectionTopFeed
                                          }}
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
                                                <Ad
                                                  className="ad--section-mrec"
                                                  sizes="mrec"
                                                  displayFor="large"
                                                  pageLocation={Ad.pos.aside}
                                                />
                                                { isBrandPage ? <BrandMagazine brand={brand} /> :
                                                <div className="page__get-social-container">
                                                    <span className="page__social-logo">Now To Love</span>
                                                    <SocialContainer socialUrls={this.context.config.urls.socialUrls} />
                                                </div> }
                                            </StickyAndDockAd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={(c) => { this.bottom = c; }} />

                    {/* 2nd Leaderboard or banner below Gallery of Videos */}
                    { teasers.length ? <Ad
                      className="ad--section-leaderboard"
                      sizes={{
                          banner: 'banner',
                          leaderboard: 'leaderboard',
                          billboard: ['billboard', 'leaderboard'] }}
                      targets={{ keyword }}
                      pageLocation={pageLocation}
                    /> : null }

                    <Repeatable
                      component={TeaserListView}
                      action={loadList}
                      showDate={!isBrandPage}
                      dataSource={this.props.list}
                      nextParams={this.props.listNextParams}
                      className="news-feed bottom-news-feed"
                      adTargets={{ keyword }}
                      nativeAdConfig={isBrandPage || {
                          slotPositionIndex: polarLabels.sectionBottomFeed
                      }}
                    />

                    {/* 3rd Leaderboard to show on tablet and up */}
                    { get(this.props.list, 'items[0].length') ? <StickyAd
                      adProps={adProps}
                      minHeight={450}
                      stickyAtViewPort="mediumRangeMax"
                    /> : null }
                </div>


            </Page>
        );
    }
}
