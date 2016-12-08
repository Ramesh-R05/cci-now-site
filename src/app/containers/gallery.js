import React, {Component, PropTypes} from 'react';
import Header from '@bxm/site-header';
import GalleryDetailMain from '@bxm/gallery/lib/components/page/main';
import GalleryDetailAside from '@bxm/gallery/lib/components/page/aside';
import SocialShareBlock from '@bxm/social/lib/components/share/block';
import MobileOffCanvas from '@bxm/nav/lib/components/offcanvas/content';
import Navigation from '@bxm/site-header/lib/components/navigation';
import { getKeywordsFromTags } from '@bxm/ad/lib/utils/tagsUtils';
import GalleryActions from '@bxm/gallery/lib/actions/gallery';
import { connectToStores } from '@bxm/flux';
import resizeViewport from '@bxm/behaviour/lib/components/resizeViewport';
import { getFirstTagNameForCategory } from '@bxm/tags/lib/utils';
import Ad from '@bxm/ad/lib/google/components/ad';
import AdStore from '@bxm/ad/lib/google/stores/ad';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import GalleryPageStore from '@bxm/gallery/lib/stores/galleryPage';
import hamburgerWrapper from '@bxm/nav/lib/components/hamburgerWrapper';
import Logos from '../components/page/logos';
import classnames from 'classnames';
import Footer from '../components/footer';

@hamburgerWrapper
class GallerySection extends Component {
    static headerHeight = 65;

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

        this.refs['galleryBody'].addEventListener('touchstart', (e) => {
            const { ads, isAdViewed, isAdSlideItem } = this.props;

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
            galleryHeight: winWidth >= largeBreakpointRangeMin ? (winHeight - GallerySection.headerHeight) + 'px': 'auto'
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
        const {nextGallery} = this.props;
        const galleryItems = nextGallery.galleryItems || [];

        this.context.executeAction(GalleryActions.nextGallery,{
            galleryTitle: nextGallery.title,
            gallery: nextGallery,
            items: galleryItems,
            totalItems: galleryItems.length,
            activeIndex: 0,
            activeItem: galleryItems[0]
        });
    };

    render() {
        const { gallery, hamburgerNavItems, headerNavItems, customisedTeaser } = this.props;
        if(!gallery) return null;

        const shareDescription = (gallery.summary || gallery.title || "");
        const shareTitle = gallery.title || gallery.name;
        const keyword = getKeywordsFromTags(gallery.contentTags);
        const kingtag = getFirstTagNameForCategory(gallery.contentTags, 'Homes navigation');
        const config = this.context.config;
        const targets = {
            keyword,
            position: 1
        };
        const mobileNav = hamburgerNavItems ? hamburgerNavItems.slice() : headerNavItems.slice();
        mobileNav.unshift({name: 'Home', url: '/'});
        return (
            <div className={this.props.menuClasses}>
                <section
                    className="gallery small-12 columns side-menu__push"
                    itemType="http://schema.org/Article"
                >
                    <meta itemProp="image" content={gallery.imageUrl + '?width=960&height=600&mode=crop&quality=75'} />
                    <meta itemProp="description" content={shareDescription} />
                    <meta itemProp="datePublished" content={gallery.dateCreated} />
                    <meta itemProp="publisher" content={config.site.name} />

                    <Header
                        currentUrl={ this.props.currentUrl }
                        isExpanded={this.props.headerExpanded}
                        navItems={ this.props.headerNavItems }
                        siteName={ this.context.config.get('site.name')}
                        toggleMenu={ this.toggleMenu } />

                    <Ad
                        className="gallery__mobile-ad"
                        label={{active: false}}
                        reloadOnResourceChange={this.props.activeGalleryItemIndex || 0}
                        displayFor={['small', 'medium', 'large', 'xlarge']}
                        sizes={{
                            large: 'leaderboard',
                            medium: 'leaderboard',
                            small: 'banner'
                        }}
                        targets={targets}
                    />

                    <section ref="galleryBody" className="gallery__body row" style={{ height: this.state.galleryHeight }} ref="galleryBody">
                        <GalleryDetailMain
                            {...this.props}
                            keyword={keyword}
                            customisedTeaser={customisedTeaser}
                            onNextGalleryClick={this.onNextGalleryClick}
                            kingtag={kingtag}
                            alwaysDisplayTitle={true}
                            showFooterAd={false}
                        />

                        <GalleryDetailAside
                            {...this.props}
                            showAuthor={true}
                            showSourceLogo={true}
                            keyword={keyword}
                            kingtag={kingtag}
                        />
                    </section>

                    <MobileOffCanvas side='left' toggleSideMenu={this.toggleMenu}>
                        <div className="off-canvas-content-wrapper">
                            <button
                                className="close-btn"
                                onClick={ this.toggleMenu }
                                dangerouslySetInnerHTML={ { __html: `
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="22" height="22" viewBox="0 0 22 22">
                                            <path d="M12.757,10.979 C12.757,10.979 21.608,19.830 21.608,19.830 C22.099,20.321 22.099,21.117 21.608,21.607 C21.117,22.098 20.322,22.098 19.831,21.607 C19.831,21.607 10.980,12.756 10.980,12.756 C10.980,12.756 2.129,21.607 2.129,21.607 C1.639,22.098 0.843,22.098 0.352,21.607 C-0.138,21.117 -0.138,20.321 0.352,19.830 C0.352,19.830 9.203,10.979 9.203,10.979 C9.203,10.979 0.352,2.129 0.352,2.129 C-0.138,1.638 -0.138,0.843 0.352,0.351 C0.843,-0.139 1.639,-0.139 2.129,0.351 C2.129,0.351 10.980,9.202 10.980,9.202 C10.980,9.202 19.831,0.351 19.831,0.351 C20.322,-0.139 21.117,-0.139 21.608,0.351 C22.099,0.843 22.099,1.638 21.608,2.129 C21.608,2.129 12.757,10.979 12.757,10.979 Z" id="path-1" class="cls-2" fill-rule="evenodd"></path>
                                        </svg>
                                    ` } } />
                            <Navigation className="mobile-menu" items={ mobileNav } currentUrl={ this.props.currentUrl } />
                            <Logos className="mobile-menu-list" openInNewTab={true} logoList={this.context.config.brands.hamburgers} />
                        </div>
                    </MobileOffCanvas>

                    <SocialShareBlock
                        className="social-share-block hide-for-large-up"
                        url={gallery.siteUrl + gallery.url}
                        title={shareTitle}
                        emailSubject={`${config.site.shortName}:  ${shareTitle}`}
                        tweetBody={`${config.site.shortName}: ${shareTitle} {shortURL}`}
                        description={shareDescription}
                        imageUrl={gallery.imageUrl}
                        nodeId={gallery.id}
                    />

                </section>
                <Footer logoList={this.context.config.brands.uniheader} />
            </div>
        );
    }
}

export default connectToStores(resizeViewport(GallerySection), ['NavigationStore', GalleryStore, GalleryPageStore, AdStore], (context) => {
    const theAdStore = context.getStore(AdStore);
    const ads = theAdStore.getAds();
    const viewed = ads['gpt-slot-' + theAdStore.getCurrentSlideAd()] && ads['gpt-slot-' + theAdStore.getCurrentSlideAd()].viewed;
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
        ads: ads,
        isAdSlideItem: galleryStore.isAdSlideItem(),
        isAdViewed: galleryStore.isAdSlideItem() && viewed,
        headerNavItems: headerNavItems,
        hamburgerNavItems: hamburgerNavItems
    };
});
