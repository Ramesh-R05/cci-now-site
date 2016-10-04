import React, { Component, PropTypes } from 'react';
import SocialIcon from './icon';

export default class Links extends Component {
    static propTypes = {
        links: PropTypes.array.isRequired
    };

    render() {
        const { links = [] } = this.props;
        return (
            <section className="get-social">
                <div className="get-social-title"></div>
                <div className="get-social__links">
                    <span className="row">
                        { links.map((link) => <SocialIcon { ...link } />) }
                    </span>
                </div>
            </section>
        );
    }
}
