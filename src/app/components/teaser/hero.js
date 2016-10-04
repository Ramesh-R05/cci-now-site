import React, {Component, PropTypes} from 'react';
import Teaser from '@bxm/teaser/lib/components/teaser';

export default class HeroTeaser extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired,
        imageSizes: PropTypes.object
    };

    static defaultProps = {
        imageSizes: {
            s: { w: 700, h: 583 },
            m: { w: 619, h: 515 },
            l: { w: 810, h: 456 },
            xl: { w: 619, h: 515 }
        }
    };

    render() {
        if (!this.props.article) return null;

        return(
            <div className="hero-wrapper">
                <Teaser
                    className="hero-teaser"
                    article={this.props.article}
                    imageSizes={this.props.imageSizes}
                    showDateCreated={false}
                    showSubSection={true} />
            </div>
        )
    }
}
