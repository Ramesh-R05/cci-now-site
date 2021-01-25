import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connectToStores } from '@bxm/flux';
import TeaserList from '@bxm/teaser/lib/components/teaserList';
import Teaser from '../teaser/teaser';

class MustRead extends Component {
    static propTypes = {
        mustRead: PropTypes.array.isRequired
    };

    static contextTypes = {
        config: PropTypes.object,
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    static imageSizes = {
        s: { w: 300, h: 185 },
        m: { w: 300, h: 185 },
        l: { w: 300, h: 185 },
        xl: { w: 230, h: 142 }
    };

    static listClassName = 'small-block-grid-2 medium-block-grid-4 large-block-grid-6';

    render() {
        const { mustRead } = this.props;
        const { config } = this.context;

        if (!mustRead || mustRead.length < 6) {
            return null;
        }

        const mustReadSliced = mustRead.slice(0, 6);
        const shortenedNameList = config.brands.shortSources || {};

        // Add gtm class name,
        // mustReadItem.id prop will pass into teaser component and be attached as a gtm class
        const newMustRead = mustReadSliced.map((item, index) => {
            const mustReadItem = { ...item };
            mustReadItem.id = `mustread${index + 1}-homepage`;
            mustReadItem.source = shortenedNameList[mustReadItem.source] || mustReadItem.source;

            return mustReadItem;
        });

        const googleNativeAdLabels = config.googleNativeAds.details;

        return (
            <div className="mustread-teaser-view-grid">
                <div className="home-page__teasers-title">
                    <span>Must Read</span>
                </div>
                <div className="columns xlarge-10">
                    <TeaserList
                        listClassName={MustRead.listClassName}
                        imageSizes={MustRead.imageSizes}
                        articles={newMustRead}
                        CustomisedTeaser={Teaser}
                        showDate={false}
                        nativeAdConfig={{
                            slotPositionIndex: googleNativeAdLabels.homeMustRead
                        }}
                        sourceDefault="SPONSORED"
                    />
                </div>
            </div>
        );
    }
}

export default connectToStores(MustRead, ['TeaserStore'], context => ({
    mustRead: context.getStore('TeaserStore').getMustReadItems()
}));
