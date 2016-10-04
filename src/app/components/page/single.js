import React, {Component, PropTypes} from 'react';
import { connectToStores } from '@bxm/flux';
import Article from '@bxm/article/lib/article';
import Gallery from '@bxm/gallery/lib/components/page/gallery';
import PageWrapper from './wrapper';
import Footer from './../article/footer';
import Ad from '@bxm/ad/lib/google/components/ad';

class Single extends Component {
    static displayName = 'SinglePage';

    static propTypes = {
        nodeType: PropTypes.string.isRequired
    };

    static articleContentBodyConfig = {
        disableAds: true,
        inlineImage: {
            imageSizes: {
                s: {w: 690},
                m: {w: 963},
                l: {w: 922},
                xl: {w: 640}
            }
        },
        relatedContent: {
            imageSizes: {
                s: {w: 384, h: 216},
                m: {w: 375, h: 211},
                l: {w: 329, h: 185},
                xl: {w: 296, h: 166}
            }
        }
    };

    static headerAdConfig = {
        className: 'ad--beneath-hero',
        displayFor: 'small',
        sizes: 'banner',
        targets: { position: 1 }
    };

    render() {

        if (this.props.nodeType === 'Gallery') {
            return (
                <div>
                    <Gallery />
                    <Ad
                        className='ad--out-of-page'
                        sizes={'out-of-page'}
                        label={{active: false}}
                    />
                </div>
            );
        }

        const headerAd = {
            type: 'Ad',
            config: Single.headerAdConfig
        };

        const socialShare = {
            type: 'Social',
            config: {
                tweetBody: `${this.props.title} {shortURL}`
            }
        };

        return (
            <PageWrapper
                currentUrl={ this.props.currentUrl }
                headerExpanded={false}
                hideFooter={true} >
                <Article
                    articleHeaderOrder={['Section', 'Title', 'Summary', 'Author', 'Date', socialShare, 'NativeAd', 'Hero', headerAd]}
                    contentBodyConfig={Single.articleContentBodyConfig}
                    enableTeads={true}
                    showAdBeforeRecommendations={true}
                    footerComponentClass={Footer} />
            </PageWrapper>
        );
    }
}

export default connectToStores(Single, ['articleStore'], (context) => {
    const content = context.getStore('articleStore').getContent() || {};
    return {
        title: content.title
    };
});
