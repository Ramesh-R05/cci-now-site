import React, {Component, PropTypes} from 'react';
import {NavLink} from 'fluxible-router';
import PageWrapper from './wrapper';

export default class Error extends Component {
    static displayName = 'ErrorPage';

    static propTypes = {
        siteName: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    };

    static defaultProps = {
        navItems: []
    };

    static contextTypes = {
        config: PropTypes.object
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        const {status} = this.props;
        const {config} = this.context;
        const message = config.error[status] || config.error[503];

        const {content, emojiSrc, title, symbol, returnHomeText} = message;

        return (
            <PageWrapper
                currentUrl={ this.props.currentUrl }
                className="error-page"
                headerExpanded={true}>
                <section className="error-page-container container">
                    <h1 className="page-title error-page-container__title">
                        {symbol ? <span className="page-title__symbol">{symbol}</span> : null }
                        {title}
                    </h1>

                    {content.map((item, i) => (
                        <p className="error-page-container__body-item">{item} {
                            emojiSrc && i === content.length - 1 ? <img className="emoji emoji--grin" src={emojiSrc} /> : null
                        }</p>
                    ))}
                    <p className="error-page-container__footer">
                        <a href="/" className="error-page-container__homepage-link">
                            {returnHomeText}
                        </a>
                    </p>
                </section>
            </PageWrapper>
        );
    }
}
