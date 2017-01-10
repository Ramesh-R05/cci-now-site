import React, { Component, PropTypes } from 'react';
import { find } from 'lodash';

export default class BrandTitle extends Component {
    static propTypes: {
        brand: PropTypes.object.isRequired
    };

    render() {
        const { brand } = this.props
        const { imageUrl, gtmClass, title } = brand;
        const brandClass = `brand-title brand-title-${gtmClass}`
        const crumbClass = `brand-breadcrumb-${gtmClass}`;

        return (
            <div className={`brand brand-${gtmClass}`}>
                <div className={brandClass}>
                    <hr className="brand-title--left-line"/>
                    <img className="brand-title--logo" src={imageUrl} />
                    <hr className="brand-title--right-line"/>
                </div>
                <div className="brand-breadcrumb">
                    <span className="brand-breadcrumb-ntl"> NOW TO LOVE > </span> <span className={crumbClass}> {title} </span>
                </div>
            </div>
        );
    }
}
