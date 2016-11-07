import React, {Component, PropTypes} from 'react';
import { connectToStores } from '@bxm/flux';
import Article from '@bxm/article/lib/article';
import Gallery from '@bxm/gallery/lib/components/page/gallery';
import Page from './page';
import Footer from '../components/article/footer';
import Ad from '@bxm/ad/lib/google/components/ad';

function mapStateToProps(context) {
    const content = context.getStore('articleStore').getContent() || {};
    return {
        title: content.title
    };
}

@connectToStores(['articleStore'], mapStateToProps)
export default class Document extends Component {
    static displayName = 'Document';

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
            config: Document.headerAdConfig
        };

        return (
            <Page
                currentUrl={ this.props.currentUrl }
                headerExpanded={false}
                hideFooter={true} >
                <Article
                    articleHeaderOrder={['Source', 'Section', 'Title', 'Summary', 'Date', 'Author', 'NativeAd', 'Hero', headerAd]}
                    contentBodyConfig={Document.articleContentBodyConfig}
                    enableTeads={true}
                    showAdBeforeRecommendations={true}
                    footerComponentClass={Footer} />
            </Page>
        );
    }
}
