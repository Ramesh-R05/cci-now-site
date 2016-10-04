import React, {Component, PropTypes} from 'react';
import MainFooter from '../footer';

export default class Footer extends Component {
    static displayName = 'ArticleFooter';

    render() {
        return (
            <MainFooter
                iframeKey="wnfooter"
                modifier="article" />
        );
    }
};
