import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const clidComponentStub =  Context.createStubComponent();
const Repeatable  = proxyquire('../../app/components/repeatable',{
    "react": React
}).default;

describe('Repeatable Component', () => {
    const props = {
        component: clidComponentStub,
        action: ()=>{},
        dataSource: {items:['aaa','bbb','ccc','ddd']},
        nextParams: {'aa':'aaa','bbb':'bbb'}
    }

    let reactModule;
    let ClidComponent;

    after(Context.cleanup);

    describe('when componentDidMount()', () => {
        beforeEach(() => {
            reactModule = Context.mountComponent(Repeatable,props);
            ClidComponent = TestUtils.scryRenderedComponentsWithType(reactModule, clidComponentStub);
        });

        it(`child component of Repeatable component should have loadAgain props`, () => {
            ClidComponent.forEach((comItem, index) => {
                expect(comItem.props.loadAgain).to.exist;
            });
        });

        it(`loadAgain prop of last childComponent should be true, the one of others should be false`, () => {
            ClidComponent.forEach((comItem, index) => {
                if (index < ClidComponent.length-1){
                    expect(comItem.props.loadAgain).to.be.false;
                }
                else {
                    expect(comItem.props.loadAgain).to.be.true;
                }
            })
            expect(ClidComponent[0].props.loadAgain).to.be.false;
            expect(ClidComponent[1].props.loadAgain).to.be.false;
            expect(ClidComponent[2].props.loadAgain).to.be.false;
            expect(ClidComponent[3].props.loadAgain).to.be.true;
        });
    });
});
