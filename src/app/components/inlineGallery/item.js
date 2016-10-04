import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class Item extends Component {
    static propTypes = {
        imageAltText: PropTypes.string,
        imageUrl: PropTypes.string.isRequired,
        title: PropTypes.string,
        url: PropTypes.string.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {imageAltText, imageUrl, title, url} = this.props;

        if (!imageUrl || !url) return null;

        const metaClass = classnames('gallery-item__meta', {'hide': !title});

        return (
            <div>
                <div className="gallery-item__play-button"></div>
                    <a className="gallery-item__link" href={url} title={imageAltText}>
                        <img className="gallery-item__image" src={imageUrl} alt={imageAltText} />
                        <div className={metaClass}>
                            <span className="gallery-item__title">{title}</span>
                        </div>
                    </a>
            </div>
        );
    }
}

export default Item;
