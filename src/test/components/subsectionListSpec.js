import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import { shallow } from 'enzyme';
import SubsectionList from '../../app/components/subsectionList'

const subsectionListStub = [
    {
        id: 'NOW-1207',
        url: '/fashion/fashion-trends',
        contentTitle: 'Fashion Trends'
    },
    {
        id: 'NOW-1208',
        url: '/fashion/fashion-news',
        contentTitle: 'Fashion News'
    },
    {
        id: 'NOW-1209',
        url: '/fashion/red-carpet',
        contentTitle: 'Red Carpet'
    }
];

const currentUrlStub = '/fashion/fashion-news'
const colourStub = '#40fa39';

describe('Subsection List', () => {
    let reactModule;

    before(()=> {
        reactModule = shallow(<SubsectionList currentUrl={currentUrlStub} subsections={subsectionListStub} themeColour={colourStub}/>)
    });

    it('should return a list item for each item in subsections', () => {
        expect(reactModule.children().length).to.equal(subsectionListStub.length);
    });

    it('should map the href and content title to each list item', () => {
        const listItems = reactModule.children().nodes
        for (var i = subsectionListStub.length - 1; i >= 0; i--) {
            const listItem = shallow(listItems[i]);
            expect(listItem.props().children.props.href).to.equal(subsectionListStub[i].url);
            expect(listItem.text()).to.equal(subsectionListStub[i].contentTitle)
        };
    })

    it('should style the list item that has a path matching the current url', () => {
        reactModule.find('a').nodes.forEach((n) => {
            if (n.props.href === currentUrlStub) {
                expect(n.props.children.props.style).to.deep.equal({ background: colourStub });
            }
        })
    });
});
