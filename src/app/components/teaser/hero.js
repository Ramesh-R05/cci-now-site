import React, {Component, PropTypes} from 'react';
import Teaser from './teaser';

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
        const { article, imageSizes } = this.props;

        return(
            <div className="hero-wrapper">
                <Teaser
                    sourceClassName="hero-teaser__source"
                    className="hero-teaser"
                    article={article}
                    imageSizes={imageSizes} />
            </div>
        )
    }
}
