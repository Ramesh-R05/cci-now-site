import isUndefined from 'lodash/lang/isUndefined';
import { canUseDOM } from 'exenv';
import { createStore } from '@bxm/flux';
import get from 'lodash/object/get';

const dataLayer = canUseDOM && !isUndefined(window.dataLayer) ? window.dataLayer : [];

function dataLayerPush(data) {
    // Use dataslaayer to view data: https://chrome.google.com/webstore/detail/dataslayer/ikbablmmjldhamhcldjjigniffkkjgpo
    dataLayer.push(data);
}

// ---------------------------------------------------------------------------- action tracking

function trackGalleryItemChanged(action) {
    const activeItem = action.activeItem;
    const totalGalleryItems = action.totalGalleryItems;

    // don't trigger galleryImageChange if the item index is 0
    if (activeItem === 0 || (!action.isAd && activeItem === null)) {
        return;
    }

    const data = {
        event: 'galleryImageChange',
        eventInfo: {
            galleryName: action.galleryTitle,
            currImageNo: activeItem,
            totalImages: totalGalleryItems,
            numAds: action.numAds,
            isAd: action.isAd
        }
    };
    dataLayerPush(data);
}

function trackGalleryComplete(action) {
    const data = {
        event: 'galleryComplete',
        eventInfo: {
            galleryName: action.galleryTitle,
            totalImages: action.totalGalleryItems,
            numAds: action.numAds
        }
    };
    dataLayerPush(data);
}

function trackLoadList(payload) {
    const data = {
        event: 'expandListing',
        eventInfo: {
            listingName: get(payload, 'body.list.listName'),
            pageNo: get(payload, 'body.list.params.pageNo')
        }
    };
    dataLayerPush(data);
}

function trackImageRevealerInteraction(payload) {
    const data = {
        event: 'Image Revealer',
        eventInfo: { ...payload }
    };
    dataLayer.push(data);
}

// ---------------------------------------------------------------------------- store

export default createStore({
    storeName: 'TrackingStore',

    // ------------------------------------------------------------------------ handlers

    handlers: {
        VERTICAL_GALLERY_NEXT_ITEM: 'onGalleryNextItemTrack',
        VERTICAL_GALLERY_PREVIOUS_ITEM: 'onGalleryPreviousItemTrack',
        VERTICAL_GALLERY_COMPLETED: 'onGalleryCompleted',
        LOAD_LIST: 'onLoadList',
        IMAGE_REVEALER_INTERACTION: 'onImageRevealerInteraction'
    },

    onGalleryNextItemTrack: payload => {
        trackGalleryItemChanged(payload);
    },

    onGalleryPreviousItemTrack: payload => {
        trackGalleryItemChanged(payload);
    },

    onGalleryCompleted: payload => {
        trackGalleryComplete(payload);
    },

    onLoadList: payload => {
        trackLoadList(payload);
    },

    onImageRevealerInteraction: payload => {
        trackImageRevealerInteraction(payload);
    }
});
