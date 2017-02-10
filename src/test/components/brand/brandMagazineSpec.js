import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const ResponsiveImageStub = Context.createStubComponent();
const SocialContainerStub = Context.createStubComponent();
const BrandMagazine = proxyquire('../../../app/components/brand/brandMagazine', {
    '@bxm/ui/lib/common/ResponsiveImage': ResponsiveImageStub,
    '../social/block': SocialContainerStub
}).default;

const magImageUrlStub = 'http://stubbedimages.biz/content.jpg';
Context.addStore('PageStore', {
    getMagazineImageUrl() {
        return magImageUrlStub;
    }
});


describe(`BrandMagazine`, () => {
    let reactModule;
    let socialContainerStub;
    let responsiveImageStub;

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
    const brandPropRenderSubFalseStub = {"renderSubscribeElements": false, ...brandPropStub};

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            global:  {
                breakpoints: ''
            }
        }
    };

    describe('when passing in /aww as the brand prop', () => {
			before(() => {
		        reactModule = Context.mountComponent(BrandMagazine, {brand: brandPropStub}, [contextConfigStub]);
                socialContainerStub = TestUtils.findRenderedComponentWithType(reactModule, SocialContainerStub);
                responsiveImageStub = TestUtils.findRenderedComponentWithType(reactModule, ResponsiveImageStub);
		    });

            it('should render the SocialContainer component with the AWW social link props', () => {
                expect(socialContainerStub.props).to.deep.eq({
                    socialUrls: brandPropStub.socialLinks
                })
            });

            it('should render the ResponsiveImage component with the url it receives from the store', () => {
                expect(responsiveImageStub.props.url).to.eq(magImageUrlStub)
            });

            it('should render the first span and apply the correct title from the config', () => {
                const spans = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'span');
                const firstSpan = spans[0];
                expect(firstSpan.textContent).to.eq("Subscribe to " + brandPropStub.magazineTitle);
            });

            it('should render the second span and apply the correct class from the config', () => {
                const spans = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'span');
                const secondSpanClass = spans[1].props.className;
                const correctClass = `sub-now sub-now-${brandPropStub.id}`;
                expect(secondSpanClass).to.equal(correctClass);
            });
    });

    describe('when passing in a prop that sets renderSubscribeElements to false', () => {
        before(() => {
            reactModule = Context.mountComponent(BrandMagazine, {brand: brandPropRenderSubFalseStub}, [contextConfigStub]);
        });

        it('should not render the title span', () => {
            const titleSpan = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'brand--magazine-title');
            expect(titleSpan.length).to.eq(0)
        });

        it('should not render the subscribe now span', () => {
            const subNow = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'gtm-subscribe-aww');
            expect(subNow.length).to.eq(0)
        });

    });
});

