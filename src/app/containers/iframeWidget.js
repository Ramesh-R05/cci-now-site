import React, { Component, PropTypes } from 'react';
import { connectToStores } from '@bxm/flux';
import Page from './page';
// import Ad from '@bxm/ad/lib/google/components/ad';
// import HeroTeaser from '../components/teaser/hero';
// import imageResize from '@bxm/ui/lib/common/ImageResize';
// import TeaserGridView from '../components/teaser/grid';
// import TeaserListView from '../components/teaser/list';
// import Repeatable from '../components/repeatable';
// import loadList from '../actions/loadList';
// import SocialContainer from '../components/social/block';
// import StickyAndDockAd from '../components/page/stickyAndDockAd';
// import BrandMagazine from '../components/brand/brandMagazine';
import BrandTitle from '../components/brand/brandTitle';
// import get from 'lodash/object/get';
import { find } from 'lodash';
// import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
// import SubsectionList from '../components/subsectionList';
import { iframeResizer } from 'iframe-resizer';

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
export default class IframeWidget extends Component {
    static displayName = 'IframeWidget';

    static propTypes = {
        nodeType: PropTypes.array.isRequired,
        // list: PropTypes.array.isRequired,
        // listNextParams: PropTypes.object.isRequired,
        // teasers: PropTypes.array.isRequired,
        // heroTeaser: PropTypes.object.isRequired,
        title: PropTypes.array.isRequired,
        currentUrl: PropTypes.string.isRequired,
        shortTitle: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        theme: PropTypes.object,
        // imageUrl: PropTypes.string,
        subsections: PropTypes.object
    };

    static defaultProps = {
        // teasers: [],
        theme: {},
        // imageUrl: '',
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
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
            bottomElm: this.bottom,
            topElm: this.top
        });

        const options = {
            log: true
        };
        iframeResizer(options, this.iframe);
    }

    render() {
        const { nodeType, /* teasers, */ title, currentUrl, shortTitle, summary, theme, /* imageUrl, */ subsections /* heroTeaser */ } = this.props;
        // const sectionHeroTeaser = teasers[0];
        // const firstTeaserList = teasers.slice(1);
        // const keyword = (nodeType === 'TagSection' && title) ? [title] : [];
        // const pageLocation = Ad.pos.outside;
        const subsection = find(subsections.data, s => s.url === currentUrl);
        // const polarLabels = this.context.config.polar.details;
        // const imageSrc = imageResize.url({
        //     url: imageUrl,
        //     width: 633,
        //     mode: imageResize.mode.CROP,
        //     anchor: imageResize.anchor.TC
        // });
        //
        // const adProps = {
        //     className: 'ad--section-bottom-leaderboard',
        //     displayFor: ['small', 'medium', 'large', 'xlarge'],
        //     sizes: {
        //         banner: 'banner',
        //         leaderboard: 'leaderboard',
        //         billboard: ['billboard', 'leaderboard'] },
        //     pageLocation
        // };

        let headerClassName = '';
        // const sectionClassNames = 'section-page';
        let pageTitle = (
            <h1 className="page-title">
                <span className="page-title__symbol" />
                {subsection ? subsection.contentTitle : title}
            </h1>
        );

        const isBrandPage = nodeType === 'Brand';
        const brand = isBrandPage ? find(this.context.config.brands.uniheader, b => b.url === currentUrl.match(/\/[^/|?]*/)[0]) : null;

        if (isBrandPage) {
            headerClassName = `header-${brand.id}`;
            pageTitle = (<BrandTitle brand={brand} shortTitle={shortTitle} summary={summary} />);
            // sectionClassNames += ' brand-section-page';
            //
            // sectionHeroTeaser = heroTeaser.isBrandHero && heroTeaser;
            // firstTeaserList = teasers.slice();
        }

        return (
            <Page
              currentUrl={currentUrl}
              headerExpanded={false}
              pageTitle={pageTitle}
              headerClassName={headerClassName}
              theme={theme}
            >
                <div style={{ maxWidth: '593px', margin: '0 auto' }}>
                    <iframe
                      src="https://webapp.tectonicinteractive.com/logies2018/polling_v1.html"
                      ref={(c) => { this.iframe = c; }}
                      style={{ width: '1px', minWidth: '100%' }}
                    />
                </div>
            </Page>
        );
    }
}
