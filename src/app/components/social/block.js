import React, { Component } from 'react';
import SocialLinks from './links';

export default class Social extends Component {
    static displayName = 'Social';

    static links = [{
        name: 'facebook',
        url: 'http://www.facebook.com/cosmoaustralia'
    },{
        name: 'twitter',
        url: 'https://twitter.com/cosmoaustralia'
    },{
        name: 'instagram',
        url: 'https://www.instagram.com/cosmoaustralia/'
    },{
        name: 'youtube',
        url: 'https://www.youtube.com/user/cosmoaustralia/'
    },{
        name: 'snapchat',
        url: 'https://www.snapchat.com/'
    },{
        name: 'newsletter',
        url: '#footer-sign-up',
        target: '_self'
    }];

    render() {
        return (<SocialLinks links={ Social.links } />);
    }
}
