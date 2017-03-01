import React, { Component, PropTypes } from 'react';
import Logos from '../page/logos';

export default class UniHeader extends Component {
    static propTypes = {
        logoList: PropTypes.array.isRequired,
        className: PropTypes.string.isRequired
    };

    render() {
        const navclass = `${this.props.className}__nav`;

        return (
            <header className={this.props.className}>
                <nav className={navclass}>
                    <Logos className={this.props.className} openInNewTab logoList={this.props.logoList} />
                </nav>
            </header>
        );
    }
}
