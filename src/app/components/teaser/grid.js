import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import TeaserList from '@bxm/teaser/lib/components/teaserList';
import Teaser from './teaser';

export default class TeaserGridView extends Component {
    static props = {
        teasers: PropTypes.array.isRequired,
        className: PropTypes.string,
        adPosition: PropTypes.number,
        adTargets: PropTypes.object,
        adSizes: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
        nativeAdConfig: PropTypes.shape({
            slotPositionIndex: PropTypes.array,
            targets: PropTypes.shape({
                kw: PropTypes.string
            })
        })
    };

    static defaultProps = {
        teasers: [],
        className: "",
        adPosition: 8,
        adTargets: { position: 1 },
        nativeAdConfig: {}
    };

    render() {
        const { className, teasers, nativeAdConfig } = this.props;

        if (!teasers || !Array.isArray(teasers) || !teasers.length) return null;

        return (
            <div className={classNames('container', className)}>
                <div className="row">
                    <div className="columns teaser-view-container teaser-view-grid-container">
                        <TeaserList
                            listClassName="teaser-view-grid"
                            CustomisedTeaser={Teaser}
                            articles={teasers}
                            showSubSection={true}
                            imageSizes={{
                                s: { w: 690, h: 388 },
                                m: { w: 486, h: 404 },
                                l: { w: 624, h: 518 },
                                xl: { w: 368, h: 306 }
                            }}
                            nativeAdConfig={nativeAdConfig}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
