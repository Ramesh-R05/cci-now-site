import React, { Component, PropTypes } from 'react';
import SocialIcon from './icon';

export default class Links extends Component {
    static propTypes = {
        links: PropTypes.array
    };

    static defaultProps = {
        links: []
    };

    render() {
        const { links } = this.props;
        if (!links) return null;
        return (
            <section className="get-social">
                <div className="get-social-title" />
                <div className="get-social__links">
                    <span className="row">{ links.map(link => <SocialIcon key={link.id} {...link} />) }</span>
                </div>
            </section>
        );
    }

}
