import React, {Component, PropTypes} from 'react';

export default class Title extends Component{
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string.isRequired
    };

    render() {
        const { className, title } = this.props;

        if (!title) return null;

        return (
            <h1 className={['page-title', className].join(' ')}>
                <span className="page-title__symbol"></span>
                { title }
            </h1>
        );
    }
}
