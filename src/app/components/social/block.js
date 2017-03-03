import React, { PropTypes, Component } from 'react';
import SocialLinks from './links';

export default class Social extends Component {
    static displayName = 'Social';

    static propTypes = {
        socialUrls: PropTypes.object.isRequired
    };

    render() {
        const { socialUrls } = this.props;
        if (!socialUrls) return null;

        const links = Object.keys(socialUrls).map(socialItemName => ({
            name: socialItemName,
            url: socialUrls[socialItemName]
        }));

        return (<SocialLinks links={links} />);
    }
}
