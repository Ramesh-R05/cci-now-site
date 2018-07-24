import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

var SubscribeMagBlock = proxyquire('../../../../app/components/footer/subscribe/subscribeMagBlock', {}).default;

//These tests added after infinite scroll. Older tests are in a separate describe block below.
describe('SubscribeMagBlock', function() {
    const imageUrl = 'path/of/image';
    let reactModule;
    let subscribeImage;

    Context.addStore('PageStore', {
        getFooter() {
            return {
                moduleName: 'footer',
                moduleImageUrl: imageUrl
            };
        }
    });

    afterEach(Context.cleanup);

    beforeEach(function() {
        reactModule = Context.mountComponent(SubscribeMagBlock, { imageUrl });
    });

    it('should exist', function() {
        should.exist(ReactDOM.findDOMNode(reactModule));
    });

    const expectedTarget = '_blank';
    it('should set the target to be _blank', function() {
        ReactDOM.findDOMNode(reactModule)
            .querySelector('.subscription__image--mag')
            .getAttribute('target')
            .should.equal(expectedTarget);
    });

    it('should have the images', function() {
        var images = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'img');

        expect(images.length).to.equal(2);

        images.forEach(function(image) {
            expect(ReactDOM.findDOMNode(image).src).to.equal(imageUrl);
        });
    });

    describe('Given the Subscribe component appears in the side navigation', () => {
        before(() => {
            reactModule = Context.mountComponent(SubscribeMagBlock, {
                inSideNav: true
            });
        });

        it('should not render the magazine image', () => {
            subscribeImage = ReactDOM.findDOMNode(reactModule).querySelector('.subscribe img');
            expect(subscribeImage).to.not.exist;
        });
    });
});
