import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const TeaserListStub = Context.createStubComponentWithChildren();
const TeaserStub = Context.createStubComponent();
const PromotedReadStub = Context.createStubComponentWithChildren();

const Promoted = proxyquire('../../../app/components/promoted/promoted', {
    '@bxm/teaser/lib/components/teaserList': TeaserListStub,
    '../teaser/teaser': TeaserStub
}).default;

describe('#Promoted Component', () => {
    
    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            brands: {
                shortSources: {
                    "Australian Women's Weekly": "AWW"
                }
            }
        }
    };

	let promotedData = {
        title : 'WOMEN Bala Bala Bala...',
        items : [
            {
                id: 'NOW-10467',
                title: '',
                source: 'Australian Women\'s Weekly',
                url: '',
            },
            {
                id: 'NOW-10465',
                title: '',
                source: 'Australian Women\'s Weekly',
                url: '',
            },
            {
                id: 'NOW-10463',
                title: '',
                source: 'Australian Women\'s Weekly',
                url: '',
            },
            {
                id: 'NOW-10470',
                title: '',
                source: 'Australian Women\'s Weekly',
                url: '',
            },
            {
                id: 'NOW-10474',
                title: '',
                source: 'Australian Women\'s Weekly',
                url: '',
            }
        ]
    };

    let reactModule;
    let teaserSource;
    let componentTitle;

    Context.addStore('TeaserStore', {
        getPromoted() {
            return promotedData;
        }
    });

    beforeEach(() => {
        reactModule = Context.mountComponent(Promoted,{ promoted: promotedData },[contextConfigStub]);
        teaserSource = TestUtils.scryRenderedComponentsWithType(reactModule,TeaserListStub);
    });

	describe('When promoted articles are >= 4', () => {

        it ('promoted component should render', () => {
           expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule,'promoted-teaser-view-grid').length).to.equal(1);
        });

        it ('Should pass in prop gtm class and should use short source name', () => {
            expect(teaserSource[0].props.articles[0].id).to.equal('promo1-homepage');
        })

        it ('Should get the component title from CMS', () => {
            expect(reactModule.props.promoted.title).to.equal('WOMEN Bala Bala Bala...');
        })
    })

    describe('When promoted articles are < 4', () => {

        before(() => {
            promotedData = {};
        });

        after(() => {
            promotedData = {
                title : 'WOMEN OF THE YEAR',
                items : [
                    {
                        id: 'NOW-10467',
                        title: '',
                        source: 'Australian Women\'s Weekly',
                        url: '',
                    }
                ]
            }
        });

        it ('Promoted component should not render', () => {
            expect(TestUtils.scryRenderedDOMComponentsWithTag(reactModule,'promoted-teaser-view-grid').length).to.equal(0);
        });
    })

});

