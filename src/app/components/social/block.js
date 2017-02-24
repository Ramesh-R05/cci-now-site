import React, { PropTypes, Component } from 'react';
import SocialLinks from './links';

export default class Social extends Component {
    static displayName = 'Social';

    static PropTypes = {
        socialUrls: PropTypes.object.isRequired
    }

    render() { 
        if (!this.props.socialUrls) return null;

        const links = [];

        if (this.props.socialUrls.facebookUrl) links.push({name: 'facebook', url: this.props.socialUrls.facebookUrl});
        if (this.props.socialUrls.twitterUrl) links.push({name: 'twitter', url: this.props.socialUrls.twitterUrl});
        if (this.props.socialUrls.instagramUrl) links.push({name: 'instagram', url: this.props.socialUrls.instagramUrl});
        
        return (<SocialLinks links={links} />);
    }
}