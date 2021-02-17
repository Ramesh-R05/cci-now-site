import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Gallery from '@bxm/article/lib/gallery';
import Article from '@bxm/article/lib/article';
import Page from './page';
import Teaser from '../components/teaser/teaser';

export default class Document extends Component {
    static displayName = 'Document';

    static propTypes = {
        currentUrl: PropTypes.string.isRequired,
        nodeType: PropTypes.string.isRequired,
        theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        siteAlert: PropTypes.object
    };

    static defaultProps = {
        theme: {},
        siteAlert: {}
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
                s: { w: 384, h: 237 },
                m: { w: 375, h: 232 },
                l: { w: 329, h: 203 },
                xl: { w: 296, h: 183 }
            }
        }
    };

    render() {
        const { currentUrl, nodeType, theme, siteAlert } = this.props;

        const socialShare = {
            facebook: true,
            pinterest: true
        };

        const galleryContentBodyConfig = Object.assign({}, Document.articleContentBodyConfig, { disableAds: true });

        if (nodeType === 'Gallery') {
            return (
                <Page currentUrl={currentUrl} hideFooter={false} theme={theme} siteAlert={siteAlert}>
                    <Gallery
                        articleHeaderOrder={['Source', 'Title', 'Summary', 'Date', 'Author', 'ImageCount', 'Hero']}
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
            <Page currentUrl={currentUrl} hideFooter={false} theme={theme} siteAlert={siteAlert}>
                <Article
                    articleHeaderOrder={['Source', 'Section', 'Title', 'Summary', 'Date', 'Author', 'Hero']}
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
