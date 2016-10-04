import React, {Component, PropTypes} from 'react';
import breakpoints from '../../breakpoints';
import isUndefined from 'lodash/lang/isUndefined';
import InlineGallery from '@bxm/gallery/lib/components/inlineGallery';
import InlineGallerySlide from './item';

export default class CustomInlineGallery extends Component {

    static propTypes = {
        videoGallery: PropTypes.array.isRequired
    };

    static defaultProps = {
        videoGallery: []
    };

    static imageSizes = {
        s: {w: 690, h: 388},
        m: {w: 1081, h: 608},
        l: {w: 1230, h: 692},
        xl: {w: 1270, h: 714}
    };

    static contextTypes = {
        config: PropTypes.object
    };

    renderSlide(item, i, image) {

        if (!item || !image) return null;

        return <InlineGallerySlide key={i} {...item} imageUrl={image} />;
    }

    constructor(props, context) {
        super(props, context);
    }


    render() {
        const {videoGallery} = this.props;

        if (!this.context.config.isFeatureEnabled('galleryOfGalleries')
            || isUndefined(videoGallery)
            || !Array.isArray(videoGallery)
            || !videoGallery.length) return null;

        return (
            <InlineGallery
                breakpoints={breakpoints}
                galleries={videoGallery}
                imageSizes={CustomInlineGallery.imageSizes}
                renderSlide={this.renderSlide} />
        );
    }
}
