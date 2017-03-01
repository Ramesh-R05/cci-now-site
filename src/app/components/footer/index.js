import React, { Component, PropTypes } from 'react';
import SocialContainer from '../social/block';
import FooterNavigation from './footerNavigation';
import BackToTop from '@bxm/ui/lib/back-to-top/backToTop';
import Logos from '../page/logos';
import FooterSubscribe from './footerSubscribe';

export default class Footer extends Component {
    static propTypes = {
        iframeKey: PropTypes.string,
        modifier: PropTypes.string.isRequired,
        logoList: PropTypes.arrayOf(PropTypes.element).isRequired
    };

    static defaultProps = {
        iframeKey: 'wnfooter'
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { config } = this.context;
        const { iframeKey, modifier, logoList } = this.props;
        let classNames = 'footer';

        if (modifier) classNames += ` footer--${modifier}`;

        return (
            <div>
                <footer className={classNames}>
                    <div className="home-page__get-social-container">
                        <span className="home-page__social-logo">Now To Love</span>
                        <SocialContainer socialUrls={config.urls.socialUrls} />
                    </div>
                    <FooterSubscribe
                      url={`${config.get('newsletterIframeUrl')}!${iframeKey}`}
                      content={config.get('subscribe')}
                      isDisplayed={false}
                    />
                    <div className="footer__logos">
                        <span className="footer__logos-title">CONTENT SUPPORTED BY</span><br />
                        <nav className="footer__logos-nav">
                            <Logos className="footer__logos-list" openInNewTab logoList={logoList} />
                        </nav>
                    </div>
                    <FooterNavigation footerUrls={config.urls.footerUrls} />
                    <div className="footer__copyright">
                        <span>&copy; Copyright Bauer Media Pty Ltd All Rights Reserved</span>
                    </div>
                </footer>
                <BackToTop className="button" />
            </div>
        );
    }
}
