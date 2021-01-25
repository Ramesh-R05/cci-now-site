import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { canUseDOM } from 'exenv';
import classNames from 'classnames';
import TeaserTitle from '@bxm/article/lib/components/teaser/title';
import TeaserImage from '@bxm/teaser/lib/components/image';
import TeaserSummary from '@bxm/teaser/lib/components/summary';
import GoogleNativeAdTeaser from '@bxm/teaser/lib/components/native/googleNativeAdTeaser';
import Date from '@bxm/datetime/lib/components/Date';
import teaserContentOverride from '@bxm/teaser/lib/teaserContentOverride';
import Ad from '@bxm/ad/lib/google/components/ad';
import has from 'lodash/object/has';
import get from 'lodash/object/get';

export default class Teaser extends Component {
    constructor(props, context) {
        super(props, context);

        this.adSlotName = `/${get(context, 'config.ads.networkId', '')}/${get(context, 'config.site.adTaggingId', '')}/${get(
            props,
            'googleNativeAds.adUnitPath',
            ''
        )}`;
        this.googleNativeAdUnitPath = get(props, 'googleNativeAds.adUnitPath', null);

        this.state = {
            nativeAdHasContentReady: false,
            nativeAdContent: false
        };
    }

    componentDidMount() {
        if (canUseDOM) {
            this.addEvents();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.onMessage);
    }

    static propTypes = {
        article: PropTypes.object,
        imageSizes: PropTypes.object,
        showResponsiveImage: PropTypes.bool,
        showTeaserSummary: PropTypes.bool,
        className: PropTypes.string.isRequired,
        sourceClassName: PropTypes.string,
        onClick: PropTypes.func,
        showDate: PropTypes.bool,
        googleNativeAds: PropTypes.oneOfType([
            PropTypes.shape({
                targets: PropTypes.shape({
                    kw: PropTypes.string
                }),
                label: PropTypes.string,
                adUnitPath: PropTypes.string,
                adPositionClassName: PropTypes.string
            }),
            PropTypes.bool
        ])
    };

    static contextTypes = {
        config: PropTypes.object
    };

    static defaultProps = {
        article: {
            dateCreated: null,
            url: null,
            sponsorName: null,
            parentUrl: null,
            parentName: null,
            summaryTitle: null,
            title: null,
            imageUrl: null,
            altText: null
        },
        showDate: true,
        showResponsiveImage: true,
        showTeaserSummary: false,
        sourceClassName: 'teaser__source',
        imageSizes: {
            s: { w: 880, h: 710 },
            m: { w: 880, h: 710 },
            l: { w: 880, h: 710 },
            xl: { w: 880, h: 710 }
        },
        onClick: function onClick() {},
        googleNativeAds: false
    };

    addEvents() {
        window.addEventListener('message', this.onMessage);
    }

    onMessage = e => {
        const data = e.data;

        if (data && data.message === 'adContentAvailable' && data.adID === this.adSlotName) {
            this.setState({
                nativeAdHasContentReady: true,
                nativeAdContent: data.content
            });
            window.removeEventListener('message', this.onMessage);
        }
    };

    getGTMClass = () => {
        const article = this.props.article;

        return has(article, 'id') ? `gtm-${article.id}` : '';
    };

    ellipseDateHTML = () => ({ __html: '&bull;' });

    renderImage = () => {
        const { article, imageSizes } = this.props;
        const imageAltText = article.imageAltText || article.summaryTitle || article.title;
        const { config } = this.context;
        const defaultImageUrl = config.defaultImageUrl;
        const breakpoints = config.global.breakpoints;

        return (
            <TeaserImage
                gtmClass={this.getGTMClass()}
                link={article.url}
                imageUrl={article.imageUrl}
                defaultImageUrl={defaultImageUrl}
                alt={imageAltText}
                imageSizes={imageSizes}
                breakpoints={breakpoints}
                showResponsiveImage={this.props.showResponsiveImage}
                className={this.getGTMClass()}
            />
        );
    };

    renderSummary = () => {
        const { article, showTeaserSummary } = this.props;

        if (!showTeaserSummary) {
            return null;
        }

        return <TeaserSummary summary={article.summary} className="teaser__summary" />;
    };

    render() {
        const { config } = this.context;
        const { className, sourceClassName, showDate, googleNativeAds, imageSizes, onClick } = this.props;
        let { article } = this.props;
        const { nativeAdHasContentReady, nativeAdContent } = this.state;

        if (!article) {
            return null;
        }

        article = teaserContentOverride(article);

        const articleTitle = article.shortTitle || article.summaryTitle || article.title;
        const siteRegionSuffix = get(config, 'site.region', '');
        const showTeaserBrandSource = config.isFeatureEnabled('showTeaserBrandSource');
        const showGoogleNativeAds = config.isFeatureEnabled('googleNativeAds');
        const siteBrands = get(config, 'brands.site', []);
        const siteRegionClass = siteRegionSuffix && `teaser--${siteRegionSuffix.toLowerCase()}`;
        const hasVideoIcon = get(article, 'video.properties.videoConfiguration.statusCode') === 200;
        const hasGalleryIcon = get(article, 'nodeType', '').toLowerCase() === 'gallery';
        const isVideoIconDisabled = config.features.teaserVideoIcon && config.features.teaserVideoIcon.enabled === false;
        const isGalleryIconDisabled = config.features.teaserGalleryIcon && config.features.teaserGalleryIcon.enabled === false;
        const containerClassNames = classNames(className, 'teaser', siteRegionClass, {
            'teaser--has-video': hasVideoIcon,
            'teaser--gallery': hasGalleryIcon,
            'teaser--has-video-icon-hidden': hasVideoIcon && isVideoIconDisabled,
            'teaser--gallery-icon-hidden': hasGalleryIcon && isGalleryIconDisabled
        });

        const sourceName = article.source || 'Now to love';
        let articleSourceClassName = sourceClassName;

        if (article.source) {
            articleSourceClassName = `${sourceClassName} ${sourceClassName}--${article.source.toLowerCase().replace(/[^A-Z0-9]/gi, '-')}`;
        }

        let brandImage = null;
        let brandImgElm = null;

        if (showTeaserBrandSource) {
            if (sourceName === 'Now to love') {
                const NTL_LOGO_PATH = `/assets/images/${className === 'hero-teaser' ? 'herologos' : 'headerlogos'}/NTL-logo.svg`;
                brandImgElm = <img className="teaser__brand-image teaser__brand-image--ntl" alt={sourceName} src={NTL_LOGO_PATH} />;
            } else {
                brandImage = siteBrands.filter(brand => brand.title === sourceName);
                const brandId = brandImage.length && brandImage[0].id;
                brandImgElm = brandImage.length ? (
                    <img
                        className={`teaser__brand-image teaser__brand-image--${brandId}`}
                        alt={sourceName}
                        src={className === 'hero-teaser' ? brandImage[0].heroImageUrl : brandImage[0].imageUrl}
                    />
                ) : null;
            }
        }

        return (
            <article className={containerClassNames} onClick={onClick}>
                {!googleNativeAds && !nativeAdHasContentReady && !nativeAdContent && (
                    <div className="teaser__inner">
                        {this.renderImage()}
                        {className === 'hero-teaser' ? <div className="teaser__hero-background">{brandImgElm}</div> : null}
                        <div className="teaser__body">
                            <TeaserTitle title={articleTitle} url={article.url} gtmClass={this.getGTMClass()} />

                            {this.renderSummary()}

                            <p className={articleSourceClassName}>
                                {className !== 'hero-teaser' && brandImgElm}

                                {showDate ? (
                                    <span className={`${sourceClassName}-info`}>
                                        <span
                                            className={`${sourceClassName}__breaker`}
                                            dangerouslySetInnerHTML={this.ellipseDateHTML()}
                                            style={{ display: brandImgElm ? 'inline-block' : 'none' }}
                                        />
                                        <Date className="teaser__source-date" dateCreated={article.dateCreated} showElapsed />
                                    </span>
                                ) : null}
                            </p>
                        </div>
                    </div>
                )}

                {showGoogleNativeAds && googleNativeAds && (
                    <Ad
                        className="ad--slot-google-native"
                        sizes="googleNativeAd"
                        isGoogleNativeAd
                        nativeAdPath={this.googleNativeAdUnitPath}
                        label={googleNativeAds.label}
                        targets={googleNativeAds.targets}
                        pageLocation={Ad.pos.body}
                    />
                )}

                {showGoogleNativeAds && googleNativeAds && nativeAdHasContentReady && nativeAdContent && (
                    <div id={`GoogleNativeAd-${googleNativeAds.label}`} className="google-native-ad-teaser-container">
                        <GoogleNativeAdTeaser
                            nativeAdContent={nativeAdContent}
                            gtmClassName={this.getGTMClass()}
                            googleNativeAds={googleNativeAds}
                            onClick={onClick}
                            imageSizes={imageSizes}
                        />
                    </div>
                )}
            </article>
        );
    }
}
