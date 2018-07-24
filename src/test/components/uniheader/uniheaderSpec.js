import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import UniHeader from '../../../app/components/uniheader';

describe('Brand Header', () => {
    let reactModule;
    const logoListStub = [
        {
            id: 'aww',
            imageUrl: '/assets/images/headerlogos/AWW-logo.svg',
            url: '/aww',
            title: "Australian Women's Weekly"
        },
        {
            id: 'wd',
            imageUrl: '/assets/images/headerlogos/WD-logo.svg',
            url: '/womansday',
            title: "Woman's Day"
        },
        {
            id: 'gh',
            imageUrl: '/assets/images/headerlogos/GH-logo.svg',
            url: '/good-health',
            title: 'Good Health'
        }
    ];

    describe('Rendering the UniHeader on the Home Page', () => {
        before(() => {
            reactModule = Context.mountComponent(UniHeader, {
                currentUrl: '/',
                logoList: logoListStub,
                className: 'uniheader'
            });
        });

        it('should render the component', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });
});
