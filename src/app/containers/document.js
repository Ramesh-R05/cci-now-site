import React, {Component, PropTypes} from 'react';
import { connectToStores } from '@bxm/flux';
import Article from '@bxm/article/lib/article';
import Gallery from './gallery';
import Page from './page';
import Teaser from '../components/teaser/teaser';

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
                    <Gallery 
                        customisedTeaser={Teaser} currentUrl={this.props.currentUrl}/>
            );
        }

        const headerAd = {
            type: 'Ad',
            config: Document.headerAdConfig
        };

        return (
            <Page
                currentUrl={this.props.currentUrl}
                headerExpanded={false}
                hideFooter={false}>
                <Article
                    articleHeaderOrder={['Source', 'Section', 'Title', 'Summary', 'Date', 'Author', 'NativeAd', 'Hero', headerAd]}
                    contentBodyConfig={Document.articleContentBodyConfig}
                    enableTeads={true}
                    CustomisedTeaser={Teaser}
                    showAdBeforeRecommendations={true} />
            </Page>
        );
    }
}
