import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Newsletter extends Component {
    static displayName = 'Newsletter';

    static propTypes = {
        brand: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    };

    static defaultProps = {
        brand: false
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const { brand } = this.props;
        const { config } = this.context;
        const uniheaderBrand = config.brands && config.brands.uniheader.find(b => b.id === brand.id);
        const subscribeText = uniheaderBrand ? uniheaderBrand.subscribeText : config.subscribeText;
        let newsletterUrl = config.urls.newsletterUrl;
        let gtmClass = 'gtm-subs-homepage';
        let idClass = 'newsletter-subscribe__button-default';

        if (brand) {
            newsletterUrl = brand.newsletterUrl;
            gtmClass = 'gtm-subs-brand';
            idClass = `newsletter-subscribe__button-${brand.id}`;
        }

        return (
            <div className="newsletter-subscribe">
                <div className="newsletter-subscribe__title">Get The Newsletter</div>
                <p className="newsletter-subscribe__text">{subscribeText}</p>
                <div className={`newsletter-subscribe__button ${idClass}`}>
                    <a href={`${newsletterUrl}`} className={`${gtmClass}`} target="_blank">
                        SIGN UP
                    </a>
                </div>
            </div>
        );
    }
}
