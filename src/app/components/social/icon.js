import React, { Component, PropTypes } from 'react';
import InlineSVG from 'react-inlinesvg';
import { canUseDOM } from 'exenv';

export default class SocialIcon extends Component {
    static propTypes = {
        svgFile: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
        label: PropTypes.string,
        target: PropTypes.string
    };

    static defaultProps = {
        target: '_blank',
        svgFile: '',
        name: '',
        url: '',
        label: ''
    };

    fireEvent = () => {
        window.dataLayer.push({ event: `click:social:${this.props.name}` });
    };

    render() {
        const { label, name, svgFile, url } = this.props;
        if (!name) return null;

        const src = `/assets/icons/social/${svgFile || (`${name}.svg`)}`;
        const image = <img src={src} alt={`${name} icon`} />;

        const iconWithLabel = [
            <span key="icon-0" className="social-link__icon">{ canUseDOM ? <InlineSVG src={src}>{ image }</InlineSVG> : image }</span>,
            <span key="label-1" className="social-link__label">{ label || name }</span>
        ];

        return (
            <span className={`social-link social-link--${name}`}>
                { !url ? iconWithLabel :
                <a
                  href={this.props.url}
                  target={this.props.target}
                  onClick={this.fireEvent}
                >{ iconWithLabel }</a> }
            </span>
        );
    }
}

