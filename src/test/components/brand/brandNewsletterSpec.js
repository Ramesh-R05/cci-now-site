import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import brandNewsletter from '../../../app/components/brand/brandNewsletter';

describe(`brandNewsletter`, () => {
    let reactModule;

    const brandPropStub = {
        id: 'testid',
        title: "Australian Women's Weekly",
        magazineTitle: 'The Weekly',
        imageUrl: '/assets/images/headerlogos/AWW-logo.svg',
        url: '/aww',
        socialLinks: {
            facebookUrl: 'https://www.facebook.com/WomensWeeklyMag',
            twitterUrl: 'https://twitter.com/womensweeklymag',
            instagramUrl: 'http://instagram.com/womensweeklymag'
        },
        newsletterUrl: 'http://newslettertest.com/'
    };

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            global: {
                breakpoints: ''
            },
            urls: {
                newsletterUrl: 'http://defaulturl.com'
            }
        }
    };

    describe('when passing in brandPropStub', () => {
        before(() => {
            reactModule = Context.mountComponent(brandNewsletter, { brand: brandPropStub }, [contextConfigStub]);
        });

        it('should render a component with a class of newsletter-subscribe__button-testid', () => {
            const div = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'newsletter-subscribe__button-testid');
            expect(div).to.exist;
        });

        it('should render a component with a class of gtm-subs-brand', () => {
            const div = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gtm-subs-brand');
            expect(div).to.exist;
        });

        it('should render an anchor with a src of brandPropStub newsletterUrl', () => {
            const a = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'a');
            expect(a.href).to.eq('http://newslettertest.com/');
        });
    });

    describe('when not passing in brandPropStub', () => {
        before(() => {
            reactModule = Context.mountComponent(brandNewsletter, {}, [contextConfigStub]);
        });

        it('should render a component with a class of newsletter-subscribe__button-testid', () => {
            const div = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'newsletter-subscribe__button-default');
            expect(div).to.exist;
        });

        it('should render a component with a class of gtm-subs-brand', () => {
            const div = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gtm-subs-homepage');
            expect(div).to.exist;
        });

        it('should render an anchor with a src of brandPropStub newsletterUrl', () => {
            const a = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'a');
            expect(a.href).to.eq('http://defaulturl.com/');
        });
    });
});
