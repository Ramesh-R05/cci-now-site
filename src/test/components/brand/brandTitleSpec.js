import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import BrandTitle from '../../../app/components/brand/brandTitle';

describe(`BrandTitle`, () => {
    let reactModule;

    const brandPropStub = {
        "id": "aww",
        "title": "Australian Women's Weekly",
        "magazineTitle": "The Weekly",
        "imageUrl": "/assets/images/headerlogos/AWW-logo.svg",
        "url": "/aww",
        "socialLinks": {
            "facebookUrl": "https://www.facebook.com/WomensWeeklyMag",
            "twitterUrl": "https://twitter.com/womensweeklymag",
            "instagramUrl": "http://instagram.com/womensweeklymag"
        }
    };

    describe('when passing in /aww as the currentUrl prop', () => {
			before(() => {
		        reactModule = Context.mountComponent(BrandTitle, {brand: brandPropStub});
		    });

            it('should render a component with a class of brand-title-aww', () => {
                const div = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'brand-title-aww');
                expect(div).to.exist;
            });

            it('should render two hr tags', () => {
                const hrs = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'hr');
                expect(hrs.length).to.eq(2);
            });

            it('should render an img with a src of aww-logo.svg', () => {
                const image = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'img');
                expect(image.src).to.eq("/assets/images/headerlogos/AWW-logo.svg")
            });
    });
});

