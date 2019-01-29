import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectToStores } from '@bxm/flux';
import Ad from '@bxm/ad/lib/google/components/ad';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import get from 'lodash/object/get';
import { find } from 'lodash';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import Page from './page';
import HeroTeaser from '../components/teaser/hero';
import TeaserGridView from '../components/teaser/grid';
import TeaserListView from '../components/teaser/list';
import Repeatable from '../components/repeatable';
import loadList from '../actions/loadList';
import SocialContainer from '../components/social/block';
import StickyAndDockAd from '../components/page/stickyAndDockAd';
import BrandMagazine from '../components/brand/brandMagazine';
import BrandTitle from '../components/brand/brandTitle';
import SubsectionList from '../components/subsectionList';

function mapStateToProps(context) {
    const pageStore = context.getStore('PageStore');
    const teaserStore = context.getStore('TeaserStore');

    return {
        title: pageStore.getTitle(),
        shortTitle: pageStore.getShortTitle(),
        summary: pageStore.getSummary(),
        teasers: teaserStore.getLatestTeasers(),
        list: teaserStore.getList(),
        heroTeaser: teaserStore.getHeroTeaser(),
        listNextParams: teaserStore.getListNextParams(),
        imageUrl: pageStore.getImageUrl(),
        subsections: pageStore.getSubsections()
    };
}

@connectToStores(['PageStore', 'TeaserStore'], mapStateToProps)
export default class Section extends Component {
    static displayName = 'Section';

    static propTypes = {
        nodeType: PropTypes.string.isRequired,
        list: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        listNextParams: PropTypes.object.isRequired,
        teasers: PropTypes.array,
        heroTeaser: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        currentUrl: PropTypes.string.isRequired,
        shortTitle: PropTypes.string,
        summary: PropTypes.string,
        theme: PropTypes.array,
        imageUrl: PropTypes.string,
        subsections: PropTypes.object
    };

    static defaultProps = {
        teasers: [],
        theme: {},
        imageUrl: '',
        summary: '',
        shortTitle: '',
        subsections: { data: {}, totalCount: 0 }
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
        const { nodeType, teasers, title, currentUrl, shortTitle, summary, theme, imageUrl, subsections, heroTeaser } = this.props;
        let sectionHeroTeaser = teasers[0];
        let firstTeaserList = teasers.slice(1);
        const keyword = nodeType === 'TagSection' && title ? [title] : [];
        const pageLocation = Ad.pos.outside;
        const subsection = find(subsections.data, s => s.url === currentUrl);
        const polarLabels = this.context.config.polar.details;
        const imageSrc = imageResize.url({
            url: imageUrl,
            width: 633,
            mode: imageResize.mode.CROP,
            anchor: imageResize.anchor.TC
        });

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

        let headerThemeClassName = '';
        let sectionClassNames = 'section-page';
        let pageTitle = (
            <h1 className="page-title">
                <span className="page-title__symbol" />
                <span>{subsection ? subsection.contentTitle : title}</span>
            </h1>
        );

        const isBrandPage = nodeType === 'Brand';
        const brand = isBrandPage ? find(this.context.config.brands.uniheader, b => b.url === currentUrl.match(/\/[^/|?]*/)[0]) : null;

        if (isBrandPage) {
            headerThemeClassName = `header-${brand.id}`;
            pageTitle = <BrandTitle brand={brand} shortTitle={shortTitle} summary={summary} />;
            sectionClassNames += ' brand-section-page';

            sectionHeroTeaser = heroTeaser.isBrandHero && heroTeaser;
            firstTeaserList = teasers.slice();
        }

        return (
            <Page currentUrl={currentUrl} headerExpanded={false} pageTitle={pageTitle} headerThemeClassName={headerThemeClassName} theme={theme}>
                <div className={sectionClassNames}>
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
                                        {imageUrl &&
                                            !isBrandPage && (
                                                <div className="banner-wrapper">
                                                    <img src={imageSrc} alt={title} />
                                                </div>
                                            )}

                                        {subsections.totalCount > 1 && <SubsectionList subsections={subsections.data} currentUrl={currentUrl} />}

                                        <HeroTeaser showDate={!isBrandPage} article={sectionHeroTeaser} brand={brand} />

                                        <TeaserGridView
                                            teasers={firstTeaserList}
                                            showDate={!isBrandPage}
                                            className="news-feed top-news-feed"
                                            adPosition={8}
                                            adTargets={{ keyword }}
                                            nativeAdConfig={
                                                isBrandPage || {
                                                    slotPositionIndex: polarLabels.sectionTopFeed
                                                }
                                            }
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
                                                {isBrandPage ? (
                                                    <BrandMagazine brand={brand} />
                                                ) : (
                                                    <div className="page__get-social-container">
                                                        <span className="page__social-logo">Now To Love</span>
                                                        <SocialContainer socialUrls={this.context.config.urls.socialUrls} />
                                                    </div>
                                                )}
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
                        action={loadList}
                        showDate={!isBrandPage}
                        dataSource={this.props.list}
                        nextParams={this.props.listNextParams}
                        className="news-feed bottom-news-feed"
                        adTargets={{ keyword }}
                        nativeAdConfig={
                            isBrandPage || {
                                slotPositionIndex: polarLabels.sectionBottomFeed
                            }
                        }
                    />

                    {/* 3rd Leaderboard to show on tablet and up */}
                    {get(this.props.list, 'items[0].length') ? (
                        <StickyAd adProps={adProps} minHeight={450} stickyAtViewPort="mediumRangeMax" stickyDelay={5500} />
                    ) : null}
                </div>
            </Page>
        );
    }
}
