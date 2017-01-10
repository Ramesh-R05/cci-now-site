import React, { PropTypes, Component } from 'react';
import SocialLinks from './links';

export default class Social extends Component {
    static displayName = 'Social';

    static PropTypes = {
        socialUrls: PropTypes.object
    }

    static defaultProps = {
        socialUrls: {
            facebookUrl: 'https://www.facebook.com/nowtolove',
            twitterUrl: 'https://twitter.com/NowToLove',
            instagramUrl: 'https://www.instagram.com/NowToLove'
        }
    }

    render() { 
        const links = [{
            name: 'facebook',
            url: this.props.socialUrls.facebookUrl
        },{
            name: 'twitter',
            url: this.props.socialUrls.twitterUrl
        },{
            name: 'instagram',
            url: this.props.socialUrls.instagramUrl
        }];
        
        return (<SocialLinks links={links} />);
    }
}
