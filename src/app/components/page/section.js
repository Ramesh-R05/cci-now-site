import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import PageWrapper from './wrapper';
import Ad from '@bxm/ad/lib/google/components/ad';
import Title from '../title';
import TeaserGridView from '../teaser/grid';
import TeaserListView from '../teaser/list';
import Repeatable from '../repeatable';
import loadList from '../../actions/loadList';
import get from 'lodash/object/get';

class Section extends Component {
    static displayName = 'SectionPage';

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

    render() {
        const { nodeType, teasers, title } = this.props;
        const firstTeaserList = teasers.slice(0, 7);
        const keyword = nodeType === 'TagSection' && title ? [ title ] : [];

        return (
            <PageWrapper
                currentUrl={ this.props.currentUrl }
                headerExpanded={false}>
                <div className="section-page">
                    {/* 1st Leaderboard or billboard to show on tablet and up */}
                    <Ad
                        className="ad--section-top-leaderboard"
                        sizes={{
                            banner: 'banner',
                            leaderboard: 'leaderboard',
                            billboard: ['billboard', 'leaderboard']
                        }}
                        targets={{position: 1, keyword}}
                    />

                    <Title title={title} />

                    <TeaserGridView
                        teasers={firstTeaserList}
                        className="news-feed top-news-feed"
                        adPosition={8}
                        adTargets={{ position: 1, keyword }} />

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
            </PageWrapper>
        );
    }
}

export default connectToStores(Section, ['PageStore','TeaserStore'], (context) => {
    const pageStore = context.getStore('PageStore');
    const teaserStore = context.getStore('TeaserStore');
    return {
        title: pageStore.getTitle(),
        teasers: teaserStore.getLatestTeasers(),
        list: teaserStore.getList(),
        listNextParams: teaserStore.getListNextParams()
    };
});
