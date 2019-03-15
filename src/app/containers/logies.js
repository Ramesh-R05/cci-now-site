import PropTypes from 'prop-types';
import React, { Component } from 'react';
import get from 'lodash.get';
import { iframeResizer } from 'iframe-resizer';
import Page from './page';

export default class Logies extends Component {
    static displayName = 'Logies';

    static propTypes = {
        currentUrl: PropTypes.string.isRequired,
        theme: PropTypes.object
    };

    static defaultProps = {
        theme: {}
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    static DEFAULT_PATH = '/logies-vote';

    componentDidMount() {
        const options = {
            log: get(this.context, 'config.APP_DEBUG', 0) === 'true'
        };
        iframeResizer(options, this.iframe);
    }

    render() {
        const { currentUrl, theme } = this.props;
        const logiesTitle = ''; // leave empty as it looks better without
        const pageTitle = (
            <h1 className="page-title">
                <span className="page-title__symbol" />
                <span>{logiesTitle}</span>
            </h1>
        );

        return (
            <Page currentUrl={currentUrl} pageTitle={pageTitle} headerThemeClassName="" theme={theme} showWallpaper={false} hideLeaderboard>
                <div style={{ maxWidth: '593px', margin: '0 auto' }}>
                    <iframe
                        src="https://webapp.tectonicinteractive.com/logies2018/polling_v1.html"
                        ref={c => {
                            this.iframe = c;
                        }}
                        style={{ width: '1px', minWidth: '100%' }}
                        title="Logies Vote"
                    />
                </div>
            </Page>
        );
    }
}
