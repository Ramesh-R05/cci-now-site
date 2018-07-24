import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import polarConfig from '../../mocks/polar';

import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const TeaserListStub = Context.createStubComponentWithChildren();
const TeaserStub = Context.createStubComponent();

const MustRead = proxyquire('../../../app/components/mustRead/mustRead', {
    '@bxm/teaser/lib/components/teaserList': TeaserListStub,
    '../teaser/teaser': TeaserStub
}).default;

describe('#MustRead Component', () => {
    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            brands: {
                shortSources: {
                    "Australian Women's Weekly": 'AWW'
                }
            },
            polar: polarConfig.polarSetting
        }
    };

    let mustReadItems = [
        {
            id: 'NOW-10467',
            title: '',
            source: "Australian Women's Weekly",
            url: ''
        },
        {
            id: 'NOW-10465',
            title: '',
            source: "Australian Women's Weekly",
            url: ''
        },
        {
            id: 'NOW-10463',
            title: '',
            source: "Australian Women's Weekly",
            url: ''
        },
        {
            id: 'NOW-10470',
            title: '',
            source: "Australian Women's Weekly",
            url: ''
        },
        {
            id: 'NOW-10474',
            title: '',
            source: "Australian Women's Weekly",
            url: ''
        },
        {
            id: 'NOW-2946',
            title: '',
            source: "Australian Women's Weekly",
            url: ''
        },
        {
            id: 'NOW-2946',
            title: '',
            source: "Australian Women's Weekly",
            url: ''
        }
    ];

    let reactModule;
    let teaserSource;

    Context.addStore('TeaserStore', {
        getMustReadItems() {
            return mustReadItems;
        }
    });

    beforeEach(() => {
        reactModule = Context.mountComponent(MustRead, { mustReadItems }, [contextConfigStub]);
        teaserSource = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserListStub);
    });

    describe('When MustRead articles are >= 6', () => {
        it('MustRead component should render', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('Should pass in prop gtm class and should use short source name', () => {
            expect(teaserSource[0].props.articles[0].id).to.equal('mustread1-homepage');
            expect(teaserSource[0].props.articles[0].source).to.equal('AWW');
        });
    });

    describe('When mustRead articles are < 6', () => {
        before(() => {
            mustReadItems = [];
        });

        after(() => {
            mustReadItems = [
                {
                    id: 'NOW-2946',
                    title: 'The best royal makeovers',
                    source: "Australian Women's Weekly"
                }
            ];
        });

        it('MustRead component should not render', () => {
            expect(TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'mustread-teaser-view-grid').length).to.equal(0);
        });
    });
});
