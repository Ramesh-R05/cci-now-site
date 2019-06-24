import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectToStores } from '@bxm/flux';
import hamburgerWrapper from '@bxm/nav/lib/components/hamburgerWrapper';
import MobileOffCanvas from '@bxm/nav/lib/components/offcanvas/content';
import Header from '@bxm/site-header';
import HamburgerNav from '@bxm/site-header/lib/components/hamburgerNav';
import classnames from 'classnames';
import Ad from '@bxm/ad/lib/google/components/ad';
import StandardPageAdsWrapper from '@bxm/ad/lib/google/components/standardPageAdsWrapper';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import SiteFooter from '../components/site-footer';
import SiteAlert from '../components/siteAlert';

function mapStateToProps(context) {
    return {
        headerNavItems: context.getStore('NavigationStore').getHeaderItems(),
        hamburgerNavItems: context.getStore('NavigationStore').getHamburgerItems(),
        content: context.getStore('articleStore').getContent(),
        emailLinkTrackingData: context.getStore('PageStore').getEmailLinkTrackingData()
    };
}

@connectToStores(['NavigationStore', 'articleStore', 'PageStore'], mapStateToProps)
@hamburgerWrapper
export default class Page extends Component {
    static displayName = 'Page';

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
        content: PropTypes.object.isRequired,
        menuClasses: PropTypes.string.isRequired,
        headerNavItems: PropTypes.array.isRequired,
        hamburgerNavItems: PropTypes.array.isRequired,
        toggleSideMenu: PropTypes.func.isRequired,
        currentUrl: PropTypes.string.isRequired,
        hideLeaderboard: PropTypes.bool,
        pageTitle: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        headerThemeClassName: PropTypes.string,
        theme: PropTypes.oneOfType([
            PropTypes.shape({
                headerSmallBackground: PropTypes.string,
                headerMediumBackground: PropTypes.string,
                headerLargeBackground: PropTypes.string,
                headerLogoAlignment: PropTypes.string,
                headerLogoColour: PropTypes.string,
                themeAlignment: PropTypes.string,
                themeColour: PropTypes.string,
                themeImage: PropTypes.string
            }),
            PropTypes.array
        ]),
        showWallpaper: PropTypes.bool,
        siteAlert: PropTypes.object,
        emailLinkTrackingData: PropTypes.shape({
            bauer_global_unique_id: PropTypes.string,
            source: PropTypes.string,
            campaign: PropTypes.string,
            medium: PropTypes.string
        })
    };

    static contextTypes = {
        config: PropTypes.object
    };

    static defaultProps = {
        hideLeaderboard: false,
        headerThemeClassName: '',
        className: '',
        pageTitle: '',
        theme: null,
        siteAlert: null,
        showWallpaper: true,
        emailLinkTrackingData: null
    };

    componentDidMount() {
        const { emailLinkTrackingData } = this.props;

        emailLinkTrackingData &&
            window &&
            window.dataLayer &&
            window.dataLayer.push({
                ...emailLinkTrackingData
            });
    }

    toggleMenu = () => {
        this.props.toggleSideMenu('left');
    };

    render() {
        const {
            headerNavItems,
            hamburgerNavItems,
            currentUrl,
            children,
            hideLeaderboard,
            pageTitle,
            headerThemeClassName,
            content,
            showWallpaper,
            theme,
            siteAlert,
            className,
            menuClasses
        } = this.props;
        const { config } = this.context;
        const pageLocation = Ad.pos.outside;
        const mobileNav = hamburgerNavItems ? hamburgerNavItems.slice() : headerNavItems.slice();
        mobileNav.unshift({ name: 'Home', url: '/' });
        const pageClassName = classnames('page', className);
        let keyword;

        if (content) {
            const tags = content.tagsDetails;
            keyword = tags ? tags.map(tag => tag.fullName) : '';
        }

        const stickyAdProps = {
            className: 'ad--section-top-leaderboard',
            displayFor: ['small', 'medium', 'large', 'xlarge'],
            sizes: {
                banner: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            },
            targets: {
                keyword
            },
            pageLocation
        };

        const themeEnabled = !!theme && !!theme.headerSmallBackground && !!theme.headerMediumBackground && !!theme.headerLargeBackground;

        return (
            <div className={pageClassName}>
                <div className={menuClasses}>
                    <Header
                        currentUrl={currentUrl}
                        navItems={headerNavItems}
                        siteName={config.site.name}
                        toggleMenu={this.toggleMenu}
                        permanentlyFixedIfShorterThan={46}
                        headerThemeClassName={headerThemeClassName}
                        theme={themeEnabled ? theme : {}}
                        isExpanded
                        wrapperClassName="header"
                        headerClassName="header__inner"
                        SubHeaderComponent={siteAlert && siteAlert.isEnabled ? SiteAlert : null}
                        subHeaderComponentProps={siteAlert && siteAlert.isEnabled ? siteAlert : {}}
                    />

                    <div className="page__content-header">
                        {!hideLeaderboard && (
                            <StickyAd
                                adProps={stickyAdProps}
                                minHeight={450}
                                stickyAtViewPort="largeRangeMax"
                                stickyDelay={2000}
                                isStickyTemporary
                                stickyDuration={3500}
                            />
                        )}
                        {pageTitle && <div className="page-title-container"> {pageTitle} </div>}
                    </div>

                    <StandardPageAdsWrapper showWallpaper={showWallpaper}>
                        <div className="content-wrapper">{children}</div>
                    </StandardPageAdsWrapper>

                    <SiteFooter />

                    <MobileOffCanvas side="left" toggleSideMenu={this.toggleMenu}>
                        <div className="off-canvas-content-wrapper">
                            <button
                                className="close-btn"
                                onClick={this.toggleMenu}
                                /* eslint-disable max-len, react/no-danger */
                                dangerouslySetInnerHTML={{
                                    __html: `
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="22" height="22" viewBox="0 0 22 22">
                            <path d="M12.757,10.979 C12.757,10.979 21.608,19.830 21.608,19.830 C22.099,20.321 22.099,21.117 21.608,21.607 C21.117,22.098 20.322,22.098 19.831,21.607 C19.831,21.607 10.980,12.756 10.980,12.756 C10.980,12.756 2.129,21.607 2.129,21.607 C1.639,22.098 0.843,22.098 0.352,21.607 C-0.138,21.117 -0.138,20.321 0.352,19.830 C0.352,19.830 9.203,10.979 9.203,10.979 C9.203,10.979 0.352,2.129 0.352,2.129 C-0.138,1.638 -0.138,0.843 0.352,0.351 C0.843,-0.139 1.639,-0.139 2.129,0.351 C2.129,0.351 10.980,9.202 10.980,9.202 C10.980,9.202 19.831,0.351 19.831,0.351 C20.322,-0.139 21.117,-0.139 21.608,0.351 C22.099,0.843 22.099,1.638 21.608,2.129 C21.608,2.129 12.757,10.979 12.757,10.979 Z" id="path-1" class="cls-2" fill-rule="evenodd"></path>
                        </svg>
                    `
                                }}
                            />
                            <HamburgerNav className="mobile-menu" items={mobileNav} currentUrl={currentUrl} />
                        </div>
                    </MobileOffCanvas>
                </div>
            </div>
        );
    }
}
