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
        reactModule = shallow(<SubsectionList currentUrl={currentUrlStub} subsections={subsectionListStub} />)
    });

    it('should return a list item for each item in subsections', () => {
        expect(reactModule.children().length).to.equal(subsectionListStub.length + 1);
    });
});
