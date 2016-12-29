import React, {PropTypes, Component} from 'react';
import {connectToStores} from '@bxm/flux';
import TeaserList from '@bxm/teaser/lib/components/teaserList';
import Teaser from '../teaser/teaser';
import get from 'lodash/object/get';
import has from 'lodash/object/has';
 
 class Promoted extends Component {
 
     constructor(props, context) {
         super(props, context);
     }
 
     static propTypes = {
         promoted: PropTypes.object.isRequired
     };
 
     static contextTypes = {
         config: PropTypes.object,
         getStore: PropTypes.func,
         executeAction: PropTypes.func
     };
 
     static imageSizes = {
         s: {w: 300, h: 170},
         m: {w: 300, h: 170},
         l: {w: 300, h: 170},
         xl: {w: 230, h: 130}
     };
 
     static listClassName = 'small-block-grid-2 medium-block-grid-3 large-block-grid-4'
 
     render() {
        let { promoted } = this.props;

        if (!promoted) return null;

        let promotedItems = promoted.items;

        if (!promotedItems || promotedItems.length === 0 || promotedItems.length < 4) return null;
 		
 		promotedItems = promotedItems.slice(0, 4);
         
        const shortenedNameList = this.context.config.brands.shortSources || {};
        const promotedTitle = promoted.title || 'WOMEN OF THE YEAR'; 

        //Add gtm class name,
        //promotedItem.id prop will pass into teaser component and be attached as a gtm class
        promotedItems = promotedItems.map((promotedItem, index) => {

            promotedItem.id = `promo${++index}-homepage`;
            promotedItem.source = shortenedNameList[promotedItem.source] || promotedItem.source;

            return promotedItem;
        });
        
        return (
            <div className='promoted-teaser-view-grid'>
                <div className='home-page__teasers-title'>
                    <span>{ promotedTitle }</span>
                </div>

                <TeaserList
                    listClassName={Promoted.listClassName}
                    imageSizes={Promoted.imageSizes}
                    CustomisedTeaser={Teaser}
                    articles={promotedItems}
                    showDate={false}
                />
            </div>
        );
     }
  }
 
 export default connectToStores(Promoted, ['TeaserStore'], (context) => {
     return {
         promoted: context.getStore('TeaserStore').getPromoted()
     };
 });

 