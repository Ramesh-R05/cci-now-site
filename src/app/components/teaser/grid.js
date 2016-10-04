import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import TeaserList from '@bxm/teaser/lib/components/teaserList';

export default class TeaserGridView extends Component {
    static props = {
        teasers: PropTypes.array.isRequired,
        className: PropTypes.string,
        adPosition: PropTypes.number,
        adTargets: PropTypes.object,
        adSizes: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])
    };

    static defaultProps = {
        teasers: [],
        className: "",
        adPosition: 8,
        adTargets: { position: 1 }
    };

    render() {
        const {className, teasers, adPosition, adSizes, adTargets} = this.props;

        if (!teasers || !Array.isArray(teasers) || !teasers.length) return null;

        return (
            <div className={classNames('container', className)}>
                <div className="row">
                    <div className="columns teaser-view-container teaser-view-grid-container">
                        <TeaserList
                            listClassName="teaser-view-grid"
                            articles={teasers}
                            showSubSection={true}
                            imageSizes={{
                                s: { w: 690, h: 388 },
                                m: { w: 486, h: 404 },
                                l: { w: 624, h: 518 },
                                xl: { w: 368, h: 306 }
                            }}
                            adPosition={adPosition}
                            adConfig={{
                                className: "ad--section-mrec",
                                sizes: adSizes || "mrec",
                                targets: adTargets
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
