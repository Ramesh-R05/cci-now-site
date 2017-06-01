import React, { Component, PropTypes } from 'react';
import Header from '@bxm/site-header';
import GalleryDetailMain from '@bxm/gallery/lib/components/page/main';
import GalleryDetailAside from '@bxm/gallery/lib/components/page/aside';
import MobileOffCanvas from '@bxm/nav/lib/components/offcanvas/content';
import Navigation from '@bxm/site-header/lib/components/navigation';
import GalleryActions from '@bxm/gallery/lib/actions/gallery';
import { connectToStores } from '@bxm/flux';
import resizeViewport from '@bxm/behaviour/lib/components/resizeViewport';
import Ad from '@bxm/ad/lib/google/components/ad';
import AdStore from '@bxm/ad/lib/google/stores/ad';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import GalleryPageStore from '@bxm/gallery/lib/stores/galleryPage';
import hamburgerWrapper from '@bxm/nav/lib/components/hamburgerWrapper';
import Logos from '../components/page/logos';
import StandardPageAdsWrapper from '@bxm/ad/lib/google/components/standardPageAdsWrapper';
import Footer from '../components/footer';

@hamburgerWrapper
class GallerySection extends Component {
    static headerHeight = 65;

    static propTypes = {
        currentUrl: PropTypes.string.isRequired,
        gallery: PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        }).isRequired,
        galleryItems: PropTypes.array.isRequired,
        activeGalleryItem: PropTypes.object.isRequired,
        activeGalleryItemIndex: PropTypes.number.isRequired,
        nextGallery: PropTypes.object.isRequired,
        menuClasses: PropTypes.array.isRequired,
        hamburgerNavItems: PropTypes.array.isRequired,
        headerNavItems: PropTypes.array.isRequired,
        headerExpanded: PropTypes.bool.isRequired,
        toggleSideMenu: PropTypes.bool.isRequired,
        customisedTeaser: PropTypes.element.isRequired,
        isAdViewed: PropTypes.bool.isRequired,
        isAdSlideItem: PropTypes.bool.isRequired,
        isGalleryCompletedItemActive: PropTypes.bool.isRequired,
        theme: PropTypes.object,
        // viewport prop linting disabled bcs eslint doesn't detect the usage in the componentWillReceiveProps method
        // and reports the prop as unused
        // eslint-disable-next-line react/no-unused-prop-types
        viewport: PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        }).isRequired
    };

    static defaultProps = {
        theme: {}
    };

    static contextTypes = {
        config: PropTypes.object,
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    constructor(...args) {
        super(...args);

        this.state = {
            galleryHeight: 'auto'
        };

        this.context.executeAction(GalleryActions.initialize, {
            galleryTitle: this.props.gallery.title,
            items: this.props.galleryItems
        });
    }

    componentDidMount() {
        window.addEventListener('popstate', this.onPop, false);

        this.galleryBody.addEventListener('touchstart', (e) => {
            const { isAdViewed, isAdSlideItem } = this.props;

            if (!isAdViewed && isAdSlideItem) {
                e.stopPropagation();
            }
        }, true);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.onPop, false);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.galleryItems !== this.props.galleryItems) {
            this.context.executeAction(GalleryActions.initialize, {
                galleryId: nextProps.gallery.id,
                galleryTitle: nextProps.gallery.title,
                items: nextProps.galleryItems
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.galleryHeight !== this.state.galleryHeight ||
            nextProps.isGalleryCompletedItemActive !== this.props.isGalleryCompletedItemActive ||
            nextProps.galleryItems !== this.props.galleryItems ||
            nextProps.activeGalleryItem !== this.props.activeGalleryItem ||
            nextProps.menuClasses !== this.props.menuClasses;
    }

    componentWillReceiveProps(nextProps) {
        const { width: winWidth, height: winHeight } = nextProps.viewport;
        const breakpoints = this.context.config.global.breakpoints;
        const largeBreakpointRangeMin = parseInt(breakpoints.largeRangeMin, 10);

        this.setState({
            galleryHeight: winWidth >= largeBreakpointRangeMin ? `${winHeight - GallerySection.headerHeight}px` : 'auto'
        });
    }

    toggleMenu = () => {
        this.props.toggleSideMenu('left');
    };

    onPop = () => {
        const thisGalleryUrl = this.props.gallery.url;
        const actualUrl = document.location.pathname;

        if (thisGalleryUrl !== actualUrl) {
            document.body.style.display = 'none';
            document.location.reload();
        }
    };

    onNextGalleryClick = () => {
        const { nextGallery } = this.props;
        const galleryItems = nextGallery.galleryItems || [];

        this.context.executeAction(GalleryActions.nextGallery, {
            galleryTitle: nextGallery.title,
            gallery: nextGallery,
            items: galleryItems,
            totalItems: galleryItems.length,
            activeIndex: 0,
            activeItem: galleryItems[0]
        });
    };

    render() {
        const { gallery, hamburgerNavItems, headerNavItems, customisedTeaser, theme } = this.props;
        const pageLocation = Ad.pos.outside;
        if (!gallery) return null;

        const tags = gallery.tagsDetails;
        const keyword = tags ? tags.map(tag => tag.fullName) : '';
        const targets = {
            keyword
        };
        const mobileNav = hamburgerNavItems ? hamburgerNavItems.slice() : headerNavItems.slice();
        mobileNav.unshift({ name: 'Home', url: '/' });
        return (
            <div className={this.props.menuClasses}>
                <section
                  className="gallery small-12 columns side-menu__push"
                  itemType="http://schema.org/Article"
                >
                    <Header
                      currentUrl={this.props.currentUrl}
                      isExpanded={this.props.headerExpanded}
                      navItems={this.props.headerNavItems}
                      siteName={this.context.config.get('site.name')}
                      toggleMenu={this.toggleMenu}
                      theme={theme}
                    />

                    <Ad
                      className="gallery__mobile-ad"
                      pageLocation={pageLocation}
                      label={{ active: false }}
                      reloadOnResourceChange={this.props.activeGalleryItemIndex || 0}
                      displayFor={['small', 'medium', 'large', 'xlarge']}
                      sizes={{
                          large: 'leaderboard',
                          medium: 'leaderboard',
                          small: 'banner'
                      }}
                      targets={targets}
                    />

                    <StandardPageAdsWrapper>
                        <section ref={(c) => { this.galleryBody = c; }} className="gallery__body row" style={{ height: this.state.galleryHeight }}>
                            <GalleryDetailMain
                              {...this.props}
                              keyword={keyword}
                              customisedTeaser={customisedTeaser}
                              onNextGalleryClick={this.onNextGalleryClick}
                              alwaysDisplayTitle
                              showFooterAd={false}
                            />

                            <GalleryDetailAside
                              {...this.props}
                              showAuthor
                              showSourceLogo
                              keyword={keyword}
                              showSocialShare
                            />
                        </section>
                    </StandardPageAdsWrapper>

                    <Footer logoList={this.context.config.brands.uniheader} />

                    <MobileOffCanvas side="left" toggleSideMenu={this.toggleMenu}>
                        <div className="off-canvas-content-wrapper">
                            <button
                              className="close-btn"
                              onClick={this.toggleMenu}
                    /* eslint-disable max-len, react/no-danger */
                              dangerouslySetInnerHTML={{ __html: `
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="22" height="22" viewBox="0 0 22 22">
                            <path d="M12.757,10.979 C12.757,10.979 21.608,19.830 21.608,19.830 C22.099,20.321 22.099,21.117 21.608,21.607 C21.117,22.098 20.322,22.098 19.831,21.607 C19.831,21.607 10.980,12.756 10.980,12.756 C10.980,12.756 2.129,21.607 2.129,21.607 C1.639,22.098 0.843,22.098 0.352,21.607 C-0.138,21.117 -0.138,20.321 0.352,19.830 C0.352,19.830 9.203,10.979 9.203,10.979 C9.203,10.979 0.352,2.129 0.352,2.129 C-0.138,1.638 -0.138,0.843 0.352,0.351 C0.843,-0.139 1.639,-0.139 2.129,0.351 C2.129,0.351 10.980,9.202 10.980,9.202 C10.980,9.202 19.831,0.351 19.831,0.351 C20.322,-0.139 21.117,-0.139 21.608,0.351 C22.099,0.843 22.099,1.638 21.608,2.129 C21.608,2.129 12.757,10.979 12.757,10.979 Z" id="path-1" class="cls-2" fill-rule="evenodd"></path>
                        </svg>
                    ` }}
                            />
                            <Navigation className="mobile-menu" items={mobileNav} currentUrl={this.props.currentUrl} />
                            <Logos className="mobile-menu-list" openInNewTab logoList={this.context.config.brands.hamburgers} />
                        </div>
                    </MobileOffCanvas>
                </section>
            </div>
        );
    }
}

export default connectToStores(resizeViewport(GallerySection), ['NavigationStore', GalleryStore, GalleryPageStore, AdStore], (context) => {
    const theAdStore = context.getStore(AdStore);
    const ads = theAdStore.getAds();
    const viewed = ads[`gpt-slot-${theAdStore.getCurrentSlideAd()}`] && ads[`gpt-slot-${theAdStore.getCurrentSlideAd()}`].viewed;
    const galleryPageStore = context.getStore(GalleryPageStore);
    const galleryStore = context.getStore(GalleryStore);
    const headerNavItems = context.getStore('NavigationStore').getHeaderItems();
    const hamburgerNavItems = context.getStore('NavigationStore').getHamburgerItems();


    return {
        gallery: galleryPageStore.getGallery(),
        galleryItems: galleryPageStore.getGalleryItems(),
        totalItems: galleryStore.getTotalItems(),
        activeGalleryItemIndex: galleryStore.getActiveIndex(),
        activeGalleryItem: galleryStore.getActiveItem(),
        nextGallery: galleryPageStore.getNextGallery(),
        isGalleryCompletedItemActive: galleryStore.isGalleryCompletedItemActive,
        numAds: galleryPageStore.getNumAds(),
        ads,
        isAdSlideItem: galleryStore.isAdSlideItem(),
        isAdViewed: galleryStore.isAdSlideItem() && viewed,
        headerNavItems,
        hamburgerNavItems
    };
});
