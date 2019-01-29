import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SocialLinks from './links';

export default class Social extends Component {
    static displayName = 'Social';

    static propTypes = {
        socialUrls: PropTypes.object
    };

    static defaultProps = {
        socialUrls: {}
    };

    render() {
        const { socialUrls } = this.props;

        if (!socialUrls) {
            return null;
        }

        const links = Object.keys(socialUrls).map((socialItemName, i) => ({
            id: i,
            name: socialItemName,
            url: socialUrls[socialItemName]
        }));

        return <SocialLinks links={links} />;
    }
}
