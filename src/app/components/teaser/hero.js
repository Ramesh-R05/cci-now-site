import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import SocialContainer from '@bxm/social/lib/components/socialIcons/socialContainer';
import Teaser from './teaser';
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
            s: { w: 690, h: 575 },
            m: { w: 768, h: 476 },
            l: { w: 636, h: 504 },
            xl: { w: 636, h: 504 }
        },
        showPromoted: false,
        brand: null
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { article, imageSizes, showPromoted, brand, showDate } = this.props;
        const { config } = this.context;
        const pageLocation = Ad.pos.outside;
        const shouldDisplayHeroTeaser = !!this.props.article;
        const heroClassName = shouldDisplayHeroTeaser ? 'hero-wrapper' : 'hero-wrapper hero-wrapper--no-teaser';

        return (
            <div className={heroClassName}>
                <section className="top-teasers">
                    {shouldDisplayHeroTeaser && (
                        <div className="row">
                            <Teaser
                                sourceClassName="hero-teaser__source"
                                className="hero-teaser"
                                showDate={showDate}
                                article={article}
                                imageSizes={imageSizes}
                            />
                        </div>
                    )}

                    <div className="row">{showPromoted && <Promoted />}</div>

                    <div className="row hide-for-large-up">
                        <div className="columns medium-6">
                            <Ad displayFor={['small', 'medium']} className="ad--section-top-mrec" sizes="mrec" pageLocation={pageLocation} />
                        </div>
                        <div className="columns medium-6">
                            {brand ? (
                                <BrandMagazine brand={brand} />
                            ) : (
                                <div className="hero-wrapper__get-social-container">
                                    <BrandNewsletter />
                                    <div className="hero-wrapper__follow-us">Follow Us</div>
                                    <SocialContainer
                                        socialUrls={config.site.defaultSocialLinks}
                                        classModifier="in-hero"
                                        gtmClass="gtm-follow-social-in-hero"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
