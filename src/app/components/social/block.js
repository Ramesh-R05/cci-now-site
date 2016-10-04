import React, { Component } from 'react';
import SocialLinks from './links';

export default class Social extends Component {
    static links = [{
        name: 'facebook',
        url: 'http://www.facebook.com/dollymag'
    },{
        name: 'instagram',
        url: 'http://www.instagram.com/dollymag'
    },{
        name: 'snapchat',
        url: 'https://itunes.apple.com/us/app/snapchat/id447188370?mt=8',
        label: 'DollyMag'
    },{
        name: 'twitter',
        url: 'https://twitter.com/dollymag'
    },{
        name: 'newsletter',
        url: '#footer-sign-up',
        target: '_self'
    },{
        name: 'dollymag',
        url: 'https://www.magshop.com.au/dolly/h1608dol',
        label: 'Dolly Mag',
        svgFile: 'dolly.svg'
    },{
        name: 'dollydr',
        url: 'https://itunes.apple.com/au/app/dolly-doctor/id948492088?mt=8',
        label: 'Dolly Dr'
    },{
        name: 'youtube',
        url: 'https://www.youtube.com/user/DOLLYaus'
    }];

    render() {
        return (<SocialLinks links={ Social.links } />);
    }
}
