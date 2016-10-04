import React, {Component, PropTypes} from 'react';
import SocialBlock from '../social/block';
import FooterNavigation from './footerNavigation';
import Subscribe from './subscribe/subscribe';
import BackToTop from '@bxm/ui/lib/back-to-top/backToTop';
import Newsletter from '@bxm/newsletter/lib/components/newsletter';

export default class Footer extends Component {
    static propTypes = {
        socialComponentClass: PropTypes.func,
        iframeKey: PropTypes.string,
        modifier: PropTypes.string
    };

    static defaultProps = {
        iframeKey: 'wnfooter'
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const {config} = this.context;
        const {iframeKey, modifier, socialComponentClass} = this.props;
        const SocialComponent = socialComponentClass || SocialBlock;
        let classNames = 'footer';

        if (modifier) classNames += ` footer--${modifier}`;

        return (
            <div>
                <footer className={classNames}>
                    <SocialComponent />
                    <div id="footer-sign-up" className="row">
                        <Newsletter url={`${config.get('newsletterIframeUrl')}!${iframeKey}`} />
                        <Subscribe content={config.get('subscribe')} />
                    </div>
                    <FooterNavigation />
                    <div className="footer__copyright">
                        <span>&copy; Copyright Bauer Media Pty Ltd All Rights Reserved</span>
                    </div>
                </footer>
                <BackToTop className="button" />
            </div>
        );
    }
}
