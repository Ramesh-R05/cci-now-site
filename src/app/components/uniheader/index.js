import React, {PropTypes, Component} from 'react';

export default class UniHeader extends Component {
    static contextTypes = {
        config: PropTypes.object
    };

    static propTypes = {
        currentUrl: PropTypes.string.isRequired
    };

    render() {
        if (this.props.currentUrl !== '/') {
            return null;
        }

        const html = this.context.config.brands.map((item, i) => {
            const gtmClassName = `gtm-uniheader-${item.gtmClass}`;

            const imgClassName = 'uniheader__logo--' + item.title
                .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')
                .replace(/ /g, '-')
                .toLowerCase();

            return (
                <li>
                    <a key={i} href={item.url} title={item.title} className={gtmClassName}>
                        <img src={item.imageUrl} alt={item.title} className={imgClassName} />
                    </a>
                </li>
            );
        });

        return (<header className="uniheader">
                    <nav className="uniheader__nav">
                        <ul>{html}</ul>
                    </nav>
                </header>);
    }
}
