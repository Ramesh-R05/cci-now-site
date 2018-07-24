import React, { Component, PropTypes } from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import Teaser from './teaser';
import SocialContainer from '../social/block';
import Promoted from '../promoted/promoted';
import BrandMagazine from '../brand/brandMagazine';
import BrandNewsletter from '../brand/brandNewsletter';

export default class HeroTeaser extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired,
        imageSizes: PropTypes.object,
        showPromoted: PropTypes.bool,
        brand: PropTypes.object,
        showDate: PropTypes.bool
    };

    static defaultProps = {
        showDate: true,
        imageSizes: {
            s: { w: 700, h: 583 },
            m: { w: 619, h: 515 },
            l: { w: 810, h: 456 },
            xl: { w: 619, h: 515 }
        },
        showPromoted: false,
        brand: null
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { article, imageSizes, showPromoted, brand, showDate } = this.props;
        const pageLocation = Ad.pos.outside;
        const shouldDisplayHeroTeaser = !!this.props.article;
        const heroClassName = shouldDisplayHeroTeaser ? 'hero-wrapper' : 'hero-wrapper hero-wrapper--no-teaser';

        return (
            <div className={heroClassName}>
                {shouldDisplayHeroTeaser && (
                    <Teaser
                        sourceClassName="hero-teaser__source"
                        className="hero-teaser"
                        showDate={showDate}
                        article={article}
                        imageSizes={imageSizes}
                    />
                )}

                <Ad displayFor={['small', 'medium']} className="ad--section-top-mrec" sizes="mrec" pageLocation={pageLocation} />

                {showPromoted && <Promoted />}

                {brand ? (
                    <div className="hide-for-large-up">
                        <BrandMagazine brand={brand} />{' '}
                    </div>
                ) : (
                    <div className="hero-wrapper__get-social-container">
                        <BrandNewsletter />
                        <span className="hero-wrapper__social-logo">Now To Love</span>
                        <SocialContainer socialUrls={this.context.config.urls.socialUrls} />
                    </div>
                )}
            </div>
        );
    }
}
