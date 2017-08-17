import React, { Component, PropTypes } from 'react';

export default class SubsectionList extends Component {
    static displayName = 'SubsectionList'

    static propTypes = {
        subsections: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string,
            contentTitle: PropTypes.string
        })).isRequired,
        themeColour: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
        currentUrl: PropTypes.string.isRequired
    };

    render() {
        const { themeColour, currentUrl, subsections } = this.props;
        const html = subsections.map((item) => {
            const activeColor = themeColour || '#31c7ce';
            const style = currentUrl === item.url ? { background: activeColor } : {};
            const gtmClass = `gtm-subsection-${item.url.replace(/\/.+\//, '')}`;

            return (
                <li key={item.id}>
                    <a key={item.id} href={item.url} className={gtmClass} title={item.name}>
                        <span style={style} className={'subsections-list-item'}>
                            <span>{item.contentTitle}</span>
                        </span>
                    </a>
                </li>
            );
        });

        return <ul className={'subsections-list'}>{html}</ul>;
    }
}
