import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import UniHeader from '../../../app/components/uniheader'

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

    describe('Rendering the UniHeader on the Home Page', () => {
        before(()=> {
            reactModule = Context.mountComponent(UniHeader, {
                currentUrl: '/',
                logoList: logoListStub,
                className: "uniheader"
             });
        });

        it('should render the component', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    })

    describe('Rendering the UniHeader somewhere other than Home Page', () => {
        before(()=> {
            reactModule = Context.mountComponent(UniHeader, {
                currentUrl: '/page',
                logoList: logoListStub
            });
        });

        it('should not render the Brand Component', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
