import React, {Component, PropTypes} from 'react';
import Logos from './logos';

export default class UniHeader extends Component {
    static contextTypes = {
        config: PropTypes.object
    };

    static propTypes = {
        currentUrl: PropTypes.string,
        logoList: PropTypes.array,
        className: PropTypes.string
    };

    render() {
        if (this.props.currentUrl !== '/') {
            return null;
        }

        const navclass = `${this.props.className}__nav`

        return (<header className={this.props.className}>
                    <nav className={navclass}>
                    	<Logos className={this.props.className} logoList={this.props.logoList}/>
                    </nav>
                </header>);
    }
}
