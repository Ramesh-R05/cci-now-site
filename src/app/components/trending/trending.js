import React, {PropTypes, Component} from 'react';
import {connectToStores} from '@bxm/flux';
import TeaserList from '@bxm/teaser/lib/components/teaserList';

class Trending extends Component {

    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        trending: PropTypes.array.isRequired
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

    static listClassName = 'small-block-grid-2 medium-block-grid-3 large-block-grid-5'

    render() {

        let { trending } = this.props;
        if (!trending || trending.length === 0) {
            return null;
        }
		
		trending = (trending.length > 5) ? trending.slice(0, 5) : trending;
		
            return (
                <div>
                    <div className='trending__caption hide-for-xlarge-up'>
                        <img src='/assets/titles/trending-mobile.svg'/>
                    </div>
                    <div className='columns xlarge-2 show-for-xlarge-up'>
                        <div className='trending__caption'>
                            <img src='/assets/titles/trending.svg'/>
                        </div>
                    </div>
                    <div className='columns xlarge-10'>
                        <TeaserList
                            listClassName={Trending.listClassName}
                            imageSizes={Trending.imageSizes}
                            articles={trending}
                            />
                    </div>
                </div>
            );
    }
 }

export default connectToStores(Trending, ['PageStore'], (context) => {
    return {
        trending: context.getStore('PageStore').getTrendingItems()
    };
});
