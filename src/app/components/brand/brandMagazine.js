import React, { Component, PropTypes } from 'react';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import ResponsiveImage from '@bxm/ui/lib/common/ResponsiveImage';
import get from 'lodash/object/get';
import { connectToStores } from '@bxm/flux';
import SocialContainer from '../social/block';
import BrandNewsletter from './brandNewsletter';

class BrandMagazine extends Component {
    static propTypes = {
        imageUrl: PropTypes.string.isRequired,
        brand: PropTypes.object.isRequired,
        imageSizes: PropTypes.object,
        responsiveConfig: PropTypes.object
    };

    static contextTypes = {
        config: PropTypes.object
    };

    static defaultProps = {
        responsiveConfig: {
            scale: imageResize.scale.BOTH,
            anchor: imageResize.anchor.TC,
            mode: ''
        },
        imageSizes: {
            s: { w: 175 },
            m: { w: 175 },
            l: { w: 175 },
            xl: { w: 175 }
        }
    };

    render() {
        const { imageSizes, responsiveConfig, imageUrl, brand } = this.props;
        const breakpoints = this.context.config.global.breakpoints;
        const { socialLinks, id, title, magazineTitle } = brand;
        const renderSubscribeElements = get(brand, 'renderSubscribeElements', true);
        const subscribeUrl = `subscribe-${id}`;

        /* eslint-disable react/jsx-one-expression-per-line */
        return (
            <div>
                <div className="brand--magazine-container">
                    {renderSubscribeElements && <span className="brand--magazine-title">Subscribe to {magazineTitle || title}</span>}
                    <div className="brand--magazine-image">
                        {imageUrl && (
                            <ResponsiveImage
                                url={imageUrl}
                                sizes={imageSizes}
                                breakpoints={breakpoints}
                                scale={responsiveConfig.scale}
                                mode={responsiveConfig.mode}
                                anchor={responsiveConfig.anchor}
                                quality={80}
                            />
                        )}
                    </div>
                    {renderSubscribeElements && (
                        <a target="_blank" className={`gtm-subscribe-${id}`} href={subscribeUrl}>
                            <span className={`sub-now sub-now-${id}`}>SUBSCRIBE NOW</span>
                        </a>
                    )}
                </div>
                <BrandNewsletter brand={brand} />
                <div className="page__get-social-container">
                    <SocialContainer socialUrls={socialLinks} />
                </div>
                <hr />
            </div>
        );
    }
}

export default connectToStores(BrandMagazine, ['PageStore'], context => ({
    imageUrl: context.getStore('PageStore').getImageUrl()
}));
