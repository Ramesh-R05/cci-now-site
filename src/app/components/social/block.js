import React, { Component } from 'react';
import SocialLinks from './links';

export default class Social extends Component {
    static displayName = 'Social';

    static links = [{
        name: 'facebook',
        url: 'https://www.facebook.com/nowtolove'
    },{
        name: 'twitter',
        url: 'https://twitter.com/NowToLove'
    },{
        name: 'instagram',
        url: 'https://www.instagram.com/NowToLove'
    }];

    render() {
        return (<SocialLinks links={ Social.links } />);
    }
}
