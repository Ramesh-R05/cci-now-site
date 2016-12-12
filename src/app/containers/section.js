import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import Page from './page';
import Ad from '@bxm/ad/lib/google/components/ad';
import HeroTeaser from '../components/teaser/hero';
import TeaserGridView from '../components/teaser/grid';
import TeaserListView from '../components/teaser/list';
import Repeatable from '../components/repeatable';
import loadList from '../actions/loadList';
import SocialContainer from '../components/social/block';
import StickyAndDockAd from '../components/page/stickyAndDockAd';
import get from 'lodash/object/get';

function mapStateToProps(context) {
    const pageStore = context.getStore('PageStore');
    const teaserStore = context.getStore('TeaserStore');
    return {
        title: pageStore.getTitle(),
        teasers: teaserStore.getLatestTeasers(),
        list: teaserStore.getList(),
        listNextParams: teaserStore.getListNextParams()
    };
}

@connectToStores(['PageStore','TeaserStore'], mapStateToProps)
export default class Section extends Component {
    static displayName = 'Section';

    static props = {
        nodeType: PropTypes.array,
        list: PropTypes.array,
        listNextParams: PropTypes.object,
        teasers: PropTypes.array.isRequired,
        title: PropTypes.array.isRequired
    };

    static defaultProps = {
        teasers: []
    };

    state = {
        bottomElm: null,
        topElm: null
    };

    componentDidMount() {

        this.setState({
            bottomElm: this.refs.bottom,
            topElm: this.refs.top
        });
    }

    render() {
        const { nodeType, teasers, title } = this.props;
        const heroTeaser = teasers[0];
        const firstTeaserList = teasers.slice(1, 7);
        const keyword = nodeType === 'TagSection' && title ? [ title ] : [];

        return (
            <Page
                currentUrl={ this.props.currentUrl }
                headerExpanded={false}>
                <div className="section-page">
                    <h1 className='page-title'>
                        <span className="page-title__symbol"></span>
                        { title }
                    </h1>
                    <div className="container">
                        <div className="row">
                            <div className="page__top-container columns">
                                <div className="row">
                                    <div className="columns large-8 xlarge-9 section-page__teasers-container" ref="top">
                                        <HeroTeaser article={heroTeaser} />
                                        <TeaserGridView
                                            teasers={firstTeaserList}
                                            className="news-feed top-news-feed"
                                            adPosition={8}
                                            adTargets={{ position: 1, keyword }} />
                                    </div>
                                    <div className="page__social-wrapper columns large-4 xlarge-3">
                                        <div className="columns medium-6 large-12">
                                            <StickyAndDockAd
                                                offsetTop={95}
                                                offsetBottom={16}
                                                customiseBreakpoint={1024}
                                                bottomElm={ this.state.bottomElm }
                                                topElm={ this.state.topElm }>
                                                <Ad
                                                    className="ad--section-mrec"
                                                    sizes="mrec"
                                                    displayFor="large"
                                                    targets={{position: 1}} />
                                                <div className="page__get-social-container">
                                                    <span className="page__social-logo">Now To Love</span>
                                                    <SocialContainer />
                                                </div>
                                            </StickyAndDockAd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref="bottom"></div>

                    {/* 2nd Leaderboard or banner below Gallery of Videos */}
                    { teasers.length ? <Ad
                        className="ad--section-leaderboard"
                        sizes={{
                            banner: 'banner',
                            leaderboard: 'leaderboard',
                            billboard: ['billboard', 'leaderboard'] }}
                        targets={{ position: 2, keyword }} /> : null }

                    <Repeatable
                        component={TeaserListView}
                        action={loadList}
                        dataSource={this.props.list}
                        nextParams={this.props.listNextParams}
                        className="news-feed bottom-news-feed"
                        adTargets={{ position: 2, keyword }} />

                    {/* 3rd Leaderboard to show on tablet and up */}
                    { get(this.props.list, 'items[0].length') ? <Ad
                        className="ad--section-top-leaderboard"
                        displayFor={['medium', 'large', 'xlarge']}
                        sizes={{
                            banner: 'banner',
                            leaderboard: 'leaderboard',
                            billboard: ['billboard', 'leaderboard'] }}
                        targets={{ position: 3, keyword }} /> : null }
                </div>
            </Page>
        );
    }
}
