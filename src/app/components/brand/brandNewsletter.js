import React, { Component, PropTypes } from 'react';

export default class Newsletter extends Component {
    static propTypes = {
        brand: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    };

    static defaultProps = {
        brand: false
    }

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const { brand } = this.props;

        let newsletterUrl = this.context.config.urls.newsletterUrl;
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
                <p className="newsletter-subscribe__text">The latest news delivered to your inbox</p>
                <div className={`newsletter-subscribe__button ${idClass}`}>
                    <a href={`${newsletterUrl}`} className={`${gtmClass}`} target="_blank">
                        SIGN UP
                    </a>
                </div>
            </div>
        );
    }
}
