import React, {Component, PropTypes} from 'react';
import Teaser from './teaser';
import Ad from '@bxm/ad/lib/google/components/ad';
import SocialContainer from '../social/block';
import Promoted from '../promoted/promoted';

export default class HeroTeaser extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired,
        imageSizes: PropTypes.object,
        showPromoted: PropTypes.bool
    };

    static defaultProps = {
        imageSizes: {
            s: { w: 700, h: 583 },
            m: { w: 619, h: 515 },
            l: { w: 810, h: 456 },
            xl: { w: 619, h: 515 }
        },
        showPromoted: false
    };

    render() {
        if (!this.props.article) return null;
        const { article, imageSizes, showPromoted } = this.props;

        return(
            <div className="hero-wrapper">
                <Teaser
                    sourceClassName="hero-teaser__source"
                    className="hero-teaser"
                    article={article}
                    imageSizes={imageSizes} />

                <Ad
                    displayFor={['small', 'medium']}
                    className="ad--section-top-mrec"
                    sizes="mrec"
                    targets={{position: 1}} />

                {showPromoted ? <Promoted /> : null}

                <div className="hero-wrapper__get-social-container">
                    <span className="hero-wrapper__social-logo">Now To Love</span>
                    <SocialContainer />
                </div>
            </div>
        )
    }
}
