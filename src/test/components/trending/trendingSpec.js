import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const TeaserListStub = Context.createStubComponent();
const Trending = proxyquire('../../../app/components/trending/trending', {
    '@bxm/teaser/lib/components/teaserList': TeaserListStub
}).default;

describe('Trending Component', () => {

	let trending = [1,2,3];
    let reactModule;

    Context.addStore('PageStore', {
        getTrendingItems() {
            return trending;
        }
    });

    beforeEach(() => {
        reactModule = Context.mountComponent(Trending, {trending});
    });

	describe('When trending response exists', () => {
		it ('trending component should render', () => {
           expect(React.findDOMNode(reactModule)).to.exist;
        });
    })

    describe('When trending response does not exist', () => {

        before(() => {
            trending = [];
        })

        after(() => {
            trending = [1,2,3];
        })

        it ('trending component should not render', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    })

    describe(`TeaserList Component`, () => {

        it ('should pass the appropriate props', () => {
            const TeaserListComponent = TestUtils.findRenderedComponentWithType(reactModule, TeaserListStub);
            expect(TeaserListComponent.props).to.deep.contain({
                listClassName: Trending.listClassName,
                imageSizes: Trending.imageSizes,
                articles: trending
            });
        });
    });
});
