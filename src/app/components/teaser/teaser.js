import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import TeaserTitle from '@bxm/teaser/lib/components/title';
import TeaserImage from '@bxm/teaser/lib/components/image';
import TeaserSummary from '@bxm/teaser/lib/components/summary';
import TeaserBadge from '@bxm/teaser/lib/components/badge';
import Date from '@bxm/datetime/lib/components/Date';
import ExternalLink from '@bxm/teaser/lib/components/externalLink';
import teaserContentOverride from '@bxm/teaser/lib/teaserContentOverride';
import has from 'lodash/object/has';
import get from 'lodash/object/get';

export default class Teaser extends Component {

    static propTypes = {
        article: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        imageSizes: PropTypes.object,
        showResponsiveImage: PropTypes.bool,
        showTeaserSummary: PropTypes.bool,
        className: PropTypes.string,
        sourceClassName: PropTypes.string,
        onClick: PropTypes.func,
        showDate: PropTypes.bool
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
        id: 'teaser',
        imageSizes: {
            s: { w: 880, h: 710 },
            m: { w: 880, h: 710 },
            l: { w: 880, h: 710 },
            xl: { w: 880, h: 710 }
        },
        onClick: function onClick() {}
    };

    constructor(props, context) {
        super(props, context);
    }

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
                className={this.getGTMClass()} />
        );
    };

    renderSummary = () => {
        const { article, showTeaserSummary } = this.props;

        if (!showTeaserSummary) return null;

        return (
            <TeaserSummary summary={article.summary} className="teaser__summary" />
        );
    };

    render() {
        const { id, className, sourceClassName, showDate } = this.props;
        let { article } = this.props;

        if (!article) return null;

        article = teaserContentOverride(article);

        const articleTitle = article.summaryTitle || article.title;

        const containerClassNames = classNames(className, 'teaser', {
            'teaser--has-video': get(article, 'video.properties.videoConfiguration.statusCode') === 200,
            'teaser--gallery': get(article, 'nodeType', '').toLowerCase() === 'gallery'
        });
        const articleSourceClassName = article.source ? `${sourceClassName} ${sourceClassName}--${article.source.toLowerCase().replace(/[^A-Z0-9]/ig, '-')}` : sourceClassName;

        let datePart = showDate ? (<span><span className={`${sourceClassName}__breaker`}>|</span>
                                <Date dateCreated={article.dateCreated} format="MMMM D, YYYY" /></span>) : null;
        return (
            <article className={containerClassNames} onClick={this.props.onClick}>
                <div className="teaser__inner">
                    {this.renderImage()}
                    <div className="teaser__body">
                        <TeaserTitle title={articleTitle} url={article.url} gtmClass={this.getGTMClass()} />
                        {this.renderSummary()}
                        <p className={articleSourceClassName}>
                            {article.source ? article.source : 'Now to love'}
                            {datePart}
                        </p>
                    </div>
                </div>
            </article>
        );
    }
}
