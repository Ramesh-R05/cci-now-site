import React, { PropTypes, Component } from 'react';

export default class Logos extends Component {
    static propTypes = {
        logoList: PropTypes.array.isRequired,
        className: PropTypes.string.isRequired,
        gtmPrefix: PropTypes.string.isRequired,
        openInNewTab: PropTypes.bool
    };

    static defaultProps = {
        openInNewTab: false
    };

    render() {
        if (!this.props.logoList || this.props.logoList.length <= 0) return null;

        const html = this.props.logoList.map((item) => {
            const gtmClassName = `gtm-${this.props.gtmPrefix || this.props.className}-${item.id}`;

            const imgClassName = `${this.props.className}__logo--${item.id}`
                .replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '')
                .replace(/ /g, '-')
                .toLowerCase();

            return (
                <li>
                    <a
                      key={item.id} href={item.url} target={this.props.openInNewTab ? '_blank' : '_self'}
                      title={item.title} className={gtmClassName}
                    >
                        <img src={item.imageUrl} alt={item.title} className={imgClassName} />
                    </a>
                </li>
            );
        });

        return (<ul className={this.props.className}>{html}</ul>);
    }
}
