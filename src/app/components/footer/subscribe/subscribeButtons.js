import React, { Component, PropTypes } from 'react';

export default class SubscribeButtons extends Component {
    static propTypes = {
        subscribeMagUrl: PropTypes.string.isRequired,
        subscribeIPadUrl: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired
    };

    render() {
        const classes = [this.props.className, 'subscription__buttons'].join(' ');

        const magButton = this.props.subscribeMagUrl ? (
            <a className="subscription__button" href={this.props.subscribeMagUrl} target="_blank">
                <span>MAGAZINE</span>
            </a>
        ) : null;

        const ipadButton = this.props.subscribeIPadUrl ? (
            <a className="subscription__button" target="itunes_store" href={this.props.subscribeIPadUrl}>
                <span>IPAD</span>
            </a>
        ) : null;

        return (
            <div className={classes}>
                {magButton}
                {ipadButton}
            </div>
        );
    }
}
