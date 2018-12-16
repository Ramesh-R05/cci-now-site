import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import TeaserTitle from '@bxm/teaser/lib/components/title';
import TeaserImage from '@bxm/teaser/lib/components/image';
import TeaserSummary from '@bxm/teaser/lib/components/summary';
import Date from '@bxm/datetime/lib/components/Date';
import teaserContentOverride from '@bxm/teaser/lib/teaserContentOverride';
import Ad from '@bxm/ad/lib/google/components/ad';
import has from 'lodash/object/has';
import get from 'lodash/object/get';

export default class Teaser extends Component {
    static propTypes = {
        article: PropTypes.object,
        imageSizes: PropTypes.object,
        showResponsiveImage: PropTypes.bool,
        showTeaserSummary: PropTypes.bool,
        className: PropTypes.string.isRequired,
        sourceClassName: PropTypes.string,
        onClick: PropTypes.func,
        showDate: PropTypes.bool,
        sourceDefault: PropTypes.string,
        polar: PropTypes.oneOfType([
            PropTypes.shape({
                targets: PropTypes.shape({
                    kw: PropTypes.string
                }),
                label: PropTypes.string
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
        sourceDefault: '',
        polar: false
    };

    getGTMClass = () => {
        const article = this.props.article;

        return has(article, 'id') ? `gtm-${article.id}` : '';
    };

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
        const { className, sourceClassName, showDate, sourceDefault, polar } = this.props;
        let { article } = this.props;

        if (!article) {
            return null;
        }

        article = teaserContentOverride(article);

        const articleTitle = article.shortTitle || article.summaryTitle || article.title;
        const siteRegionSuffix = get(config, 'site.region', '');
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

        let articleSourceClassName = sourceClassName;

        if (article.source) {
            articleSourceClassName = `${sourceClassName} ${sourceClassName}--${article.source.toLowerCase().replace(/[^A-Z0-9]/gi, '-')}`;
        }

        const sourceName = article.source || 'Now to love';

        return (
            <article className={containerClassNames} onClick={this.props.onClick}>
                <div className="teaser__inner">
                    {this.renderImage()}

                    <div className="teaser__body">
                        <TeaserTitle title={articleTitle} url={article.url} gtmClass={this.getGTMClass()} />

                        {this.renderSummary()}

                        <p className={articleSourceClassName}>
                            {sourceDefault || `${sourceName}`}

                            {showDate ? (
                                <span>
                                    <span className={`${sourceClassName}__breaker`}>|</span>
                                    <Date dateCreated={article.dateCreated} showElapsed />
                                </span>
                            ) : null}
                        </p>
                    </div>
                </div>

                {polar && <Ad sizes="nativeAdTeaser" label={polar.label} targets={polar.targets} nativeAd pageLocation={Ad.pos.body} />}
            </article>
        );
    }
}
