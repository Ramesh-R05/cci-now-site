import React, { Component, PropTypes } from 'react';
import { connectToStores } from '@bxm/flux';
import VerticalGallery from '@bxm/article/lib/gallery';
import Page from './page';
import Article from '@bxm/article/lib/article';
import Teaser from '../components/teaser/teaser';
import Sailthru from '../components/sailthru/sailthru';

function mapStateToProps(context) {
    return {
        content: context.getStore('articleStore').getContent()
    };
}

@connectToStores(['articleStore'], mapStateToProps)
export default class Document extends Component {
    static displayName = 'Document';

    static propTypes = {
        content: PropTypes.shape({
            tagsDetails: PropTypes.array.isRequired
        }).isRequired,
        currentUrl: PropTypes.string.isRequired,
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
                s: { w: 690 },
                m: { w: 963 },
                l: { w: 922 },
                xl: { w: 640 }
            }
        },
        relatedContent: {
            headingText: 'Read this next',
            imageSizes: {
                s: { w: 384, h: 216 },
                m: { w: 375, h: 211 },
                l: { w: 329, h: 185 },
                xl: { w: 296, h: 166 }
            }
        }
    };

    static headerAdConfig = {
        className: 'ad--beneath-hero',
        displayFor: 'small',
        sizes: 'mrec',
        targets: { position: 1 }
    };

    render() {
        const { content, currentUrl, nodeType, theme } = this.props;

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

        if (nodeType === 'Gallery') {
            return (
                <Page
                  currentUrl={currentUrl}
                  headerExpanded={false}
                  hideFooter={false}
                  theme={theme}
                >
                    <VerticalGallery
                      articleHeaderOrder={['Hero', 'Source', 'Title', 'Summary', 'Date', 'Author']}
                      contentBodyConfig={Document.articleContentBodyConfig}
                      enableTeads
                      CustomisedTeaser={Teaser}
                      showAdBeforeRecommendations
                      showSocialShare
                      socialShare={socialShare}
                      theme={theme}
                    />
                    <Sailthru />
                </Page>
            );
        }

        return (
            <Page
              currentUrl={currentUrl}
              headerExpanded={false}
              hideFooter={false}
              theme={theme}
            >
                <Article
                  articleHeaderOrder={['Source', 'Section', 'Title', 'Summary', 'Date', 'Author', 'NativeAd', 'Hero', headerAd]}
                  contentBodyConfig={Document.articleContentBodyConfig}
                  enableTeads
                  CustomisedTeaser={Teaser}
                  showAdBeforeRecommendations
                  showSocialShare
                  socialShare={socialShare}
                  theme={theme}
                />
                <Sailthru />
            </Page>
        );
    }
}
