import React, { Component, PropTypes } from 'react';
import VerticalGallery from '@bxm/article/lib/gallery';
import Page from './page';
import Article from '@bxm/article/lib/article';
import Teaser from '../components/teaser/teaser';


export default class Document extends Component {
    static displayName = 'Document';

    static propTypes = {
        currentUrl: PropTypes.string.isRequired,
        nodeType: PropTypes.string.isRequired,
        theme: PropTypes.object
    };

    static defaultProps = {
        theme: {}
    };

    static articleContentBodyConfig = {
        disableAds: false,
        paragraphsPerAd: 6,
        inlineImage: {
            imageSizes: {
                s: { w: 690 },
                m: { w: 963 },
                l: { w: 922 },
                xl: { w: 640 }
            }
        },
        displayFor: ['small', 'medium'],
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


    render() {
        const { currentUrl, nodeType, theme } = this.props;

        const socialShare = {
            facebook: true,
            pinterest: true
        };

        const galleryContentBodyConfig = Object.assign({}, Document.articleContentBodyConfig, { disableAds: true });

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
                      contentBodyConfig={galleryContentBodyConfig}
                      enableTeads
                      CustomisedTeaser={Teaser}
                      showAdBeforeRecommendations
                      showSocialShare
                      socialShare={socialShare}
                      theme={theme}
                    />
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
                  articleHeaderOrder={['Source', 'Section', 'Title', 'Summary', 'Date', 'Author', 'NativeAd', 'Hero']}
                  contentBodyConfig={Document.articleContentBodyConfig}
                  enableTeads
                  CustomisedTeaser={Teaser}
                  showAdBeforeRecommendations
                  showSocialShare
                  socialShare={socialShare}
                  theme={theme}
                />
            </Page>
        );
    }
}
