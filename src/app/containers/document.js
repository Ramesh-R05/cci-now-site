import React, { Component, PropTypes } from 'react';
import { connectToStores } from '@bxm/flux';
import Gallery from './gallery';
import Page from './page';
import Article from '@bxm/article/lib/article';
import Teaser from '../components/teaser/teaser';

function mapStateToProps(context) {
    return {
        content: context.getStore('articleStore').getContent()
    };
}

@connectToStores(['articleStore'], mapStateToProps)
export default class Document extends Component {
    static displayName = 'Document';

    static propTypes = {
        nodeType: PropTypes.string.isRequired,
        theme: PropTypes.object
    };

    static defaultProps = {
        theme: {}
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
            headingText: 'Read this next',
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

        const { content, currentUrl, nodeType, theme } = this.props;

        if (nodeType === 'Gallery') {
            return (
                    <Gallery
                        customisedTeaser={Teaser} currentUrl={currentUrl} theme={theme} />
            );
        }

        const headerAd = {
            type: 'Ad',
            config: Document.headerAdConfig
        };

        const tags = content.tagsDetails;
        const keyword = tags ? tags.map(tag => tag.fullName) : '';

        headerAd.config.targets.keyword = keyword;

        const socialShare = {
            facebook: true,
            pinterest: true
        };

        return (
            <Page
                currentUrl={currentUrl}
                headerExpanded={false}
                hideFooter={false}
                theme={theme}>
                <Article
                    articleHeaderOrder={['Source', 'Section', 'Title', 'Summary', 'Date', 'Author', 'NativeAd', 'Hero', headerAd]}
                    contentBodyConfig={Document.articleContentBodyConfig}
                    enableTeads={true}
                    CustomisedTeaser={Teaser}
                    showAdBeforeRecommendations={true}
                    showSocialShare={true}
                    socialShare={socialShare}
                    theme={theme}
                />
            </Page>
        );
    }
}
