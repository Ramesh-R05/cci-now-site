import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import Logos from '../../../app/components/uniheader/logos'

describe('Brand Header', () => {
    let reactModule;
    const logoListStub = [
        {
            "imageUrl": "/assets/images/headerlogos/AWW-logo.svg",
            "url": "/aww",
            "title": "Australian Women's Weekly",
            "gtmClass": "aww"
        },
        {
            "imageUrl": "/assets/images/headerlogos/WD-logo.svg",
            "url": "/womansday",
            "title": "Woman's Day",
            "gtmClass": "wd"
        },
        {
            "imageUrl": "/assets/images/headerlogos/GH-logo.svg",
            "url": "/good-health",
            "title": "Good Health",
            "gtmClass": "gh"
        }
     ];   

    describe('Rendering the Logos', () => {
        before(()=> {
            reactModule = Context.mountComponent(Logos, {
                currentUrl: '/',
                logoList: logoListStub,
                className: "uniheader"
             });
        });

        it('should load an image for each brand in the config', () => {
            const image = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'img');
            expect(image.length).to.equal(logoListStub.length); 
        });

        it('should apply the correct url to anchor', () => {
            const anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
            const anchorUrl = anchor[0].props.href;
            expect(anchorUrl).to.equal(logoListStub[0].url);
        });

        it('should not give the anchor a target', () => {
            const anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
            const anchorTarget = anchor[0].props.target;
            expect(anchorTarget).to.equal(undefined);
        });

        it('should apply the correct gtm class to the anchor', () => {
            const anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
            const anchorClass = anchor[0].props.className;
            const correctClass = 'gtm-uniheader-' + logoListStub[0].gtmClass;
            expect(anchorClass).to.equal(correctClass);
        });
    })

    describe('Passing in the openInNewTab prop', () => {
        before(()=> {
            reactModule = Context.mountComponent(Logos, {
                currentUrl: '/',
                logoList: logoListStub,
                className: "uniheader",
                openInNewTab: true
             });
        });

        it('should give the anchor a target of "_blank', () => {
            const anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
            const anchorTarget = anchor[0].props.target;
            expect(anchorTarget).to.equal("_blank");
        });
    });

    describe('Not passing in the openInNewTab prop', () => {
        before(()=> {
            reactModule = Context.mountComponent(Logos, {
                currentUrl: '/',
                logoList: logoListStub,
                className: "uniheader"
             });
        });

        it('should not give the anchor a target', () => {
            const anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
            const anchorTarget = anchor[0].props.target;
            expect(anchorTarget).to.equal(undefined);
        });
    });
}); 
