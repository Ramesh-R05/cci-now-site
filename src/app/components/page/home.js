import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import Ad from '@bxm/ad/lib/google/components/ad';
import SocialContainer from '../social/block';
import CustomInlineGallery from '../inlineGallery/customInlineGallery';
import HeroTeaser from '../teaser/hero';
import TeaserGridView from '../teaser/grid';
import TeaserListView from '../teaser/list';
import Trending from '../trending/trending';
import PageWrapper from './wrapper';
import Repeatable from '../repeatable';
import loadList from '../../actions/loadList';

class Home extends Component {
    static displayName = 'HomePage';

    static propTypes = {
        heroTeaser: PropTypes.object,
        list: PropTypes.array,
        listNextParams: PropTypes.object,
        teasers: PropTypes.array.isRequired,
        videoGalleryTeasers: PropTypes.array.isRequired
    };

    static defaultProps = {
        teasers: [],
        videoGalleryTeasers: []
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        return (
            <PageWrapper
                currentUrl={ this.props.currentUrl }
                headerExpanded={true}>
                <div className="home-page">
                    {/* 1st Leaderboard or billboard to show on tablet and up */}
                    <div className="trending-wrapper">
                        <div className="container">
                            <div className="row">
                                <Trending />
                            </div>
                        </div>
                    </div>
                    <div className="stripe-bg">
                        <div className="container">
                            <div className="row">
                                <div className="home-page__top-container columns">
                                    <div className="row">
                                        <div className="columns large-8 xlarge-9 home-page__teasers-container">
                                            <HeroTeaser article={this.props.heroTeaser} />

                                            <div className="home-page__teasers-title">
                                                <span>what's happening now</span>
                                            </div>

                                            <TeaserGridView
                                                teasers={this.props.teasers.slice(0, 6)}
                                                className="news-feed top-news-feed"
                                                adPosition={8}
                                                adSizes={{ small: 'mrec', medium: ['mrec', 'double-mrec'] }}
                                                adTargets={{ position: 2 }} />
                                        </div>
                                        <div className="home-page__social-wrapper columns large-4 xlarge-3">
                                            <div className="columns medium-6 large-12">
                                                {/* 1st MREC above social links */}
                                                <Ad
                                                    className="ad--section-mrec"
                                                    sizes="mrec"
                                                    targets={{position: 1}} />
                                            </div>
                                            <div className="columns medium-6 large-12">
                                                <div className="home-page__get-social-container">
                                                    <SocialContainer />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        this.context.config.isFeatureEnabled('galleryOfGalleries') ?
                            <div className="home-page__carousel-container">
                                <h2 className="carousel-container__heading">Dolly Video</h2>
                                <CustomInlineGallery videoGallery={this.props.videoGalleryTeasers} />
                            </div> : null
                    }

                    <Ad
                        className="ad--section-leaderboard"
                        sizes={{
                            banner: 'banner',
                            leaderboard: 'leaderboard',
                            billboard: ['billboard', 'leaderboard'] }}
                        targets={{position: 2}} />

                    <Repeatable
                        component={TeaserListView}
                        action={loadList}
                        dataSource={this.props.list}
                        nextParams={this.props.listNextParams}
                        className="news-feed bottom-news-feed"
                        adTargets={{ position: 3 }}
                    />

                    {/* 3rd Leaderboard to show on tablet and up */}
                    <Ad
                        className="ad--section-top-leaderboard"
                        displayFor={['medium', 'large', 'xlarge']}
                        sizes={{
                            banner: 'banner',
                            leaderboard: 'leaderboard',
                            billboard: ['billboard', 'leaderboard'] }}
                        targets={{position: 3}} />
                </div>
            </PageWrapper>
        );
    }
}

export default connectToStores(Home, ['TeaserStore'], (context) => {
    const teaserStore = context.getStore('TeaserStore');
    return {
        heroTeaser: teaserStore.getHeroTeaser(),
        teasers: teaserStore.getLatestTeasers(),
        videoGalleryTeasers: teaserStore.getVideoGalleryTeasers(),
        list: teaserStore.getList(),
        listNextParams: teaserStore.getListNextParams()
    };
});
