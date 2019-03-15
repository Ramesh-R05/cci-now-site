import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class Newsletter extends Component {
    static displayName = 'Newsletter';

    static propTypes = {
        brand: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        classModifier: PropTypes.string
    };

    static defaultProps = {
        brand: false,
        classModifier: null
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const { brand, classModifier } = this.props;
        const { config } = this.context;
        const siteBrand = config.brands && config.brands.site.find(b => b.id === brand.id);
        const subscribeText = siteBrand ? siteBrand.subscribeText : config.subscribeText;
        let newsletterUrl = config.urls.newsletterUrl;
        let gtmClass = 'gtm-subs-homepage';
        let idClass = 'newsletter-subscribe__button-default';

        if (brand) {
            newsletterUrl = brand.newsletterUrl;
            gtmClass = 'gtm-subs-brand';
            idClass = `newsletter-subscribe__button-${brand.id}`;
        }

        const rootClass = classNames('newsletter-subscribe', {
            [`newsletter-subscribe--${classModifier}`]: classModifier
        });

        return (
            <div className={rootClass}>
                <div className="newsletter-subscribe__title">Get the Newsletter</div>
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
