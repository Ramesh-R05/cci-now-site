import React, { Component, PropTypes } from 'react';

export default class FooterNavigation extends Component {
    static propTypes = {
        footerUrls: PropTypes.object.isRequired
    };

    render() {
        if (!this.props.footerUrls) return null;
        const { privacy, advertise, terms } = this.props.footerUrls;
        return (
            <nav className="footer__navigation" role="contentinfo">
                <ul>
                    <li>
                        <a href={privacy} target="_blank">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href={advertise} target="_blank">
                            Advertise
                        </a>
                    </li>
                    <li>
                        <a href={terms} target="_blank">
                            Terms of Use
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}
