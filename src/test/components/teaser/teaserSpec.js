import teaserMock from '../../mocks/teaser';
import { betterMockComponentContext } from '@bxm/flux';
import merge from 'lodash/object/merge';
import { shallow } from 'enzyme';

const Context = betterMockComponentContext();
const { React } = Context;
const ImageStub = Context.createStubComponent();
const TeaserTitleStub = Context.createStubComponent();
const DateStub = Context.createStubComponent();
const context = {
    config: {
        defaultImageUrl: '',
        global:  {
            breakpoints: ''
        }
    }
};
const proxyquire = require('proxyquire').noCallThru();
const Teaser = proxyquire('../../../app/components/teaser/teaser', {
    "react": React,
    '@bxm/teaser/lib/components/image': ImageStub,
    '@bxm/teaser/lib/components/title': TeaserTitleStub,
    '@bxm/datetime/lib/components/Date': DateStub
}).default;

describe('Component', () => {
    describe('Teaser', () => {
        const wrapper = shallow(<Teaser
            article={teaserMock}
            sourceClassName="hero-teaser__source"
            className="hero-teaser" />, { context });

        it('it should contain source detail', () => {
            expect(wrapper.find('p.hero-teaser__source').length).to.be.equal(1);
        });

        it('it should display default source now to love', () => {
            expect(wrapper.find('p.hero-teaser__source').text()).to.contain('Now to love');
        });

        it('it should container teaser image', () => {
            expect(wrapper.find(ImageStub).length).to.be.equal(1);
        });

        it('it should container teaser title', () => {
            expect(wrapper.find(TeaserTitleStub).length).to.be.equal(1);
        });

        it('it should container date component', () => {
            expect(wrapper.find(DateStub).length).to.be.equal(1);
        });

        describe('when there is source field in the article', () => {
            const wrapper = shallow(<Teaser
                article={{...teaserMock, source: 'Australian women\'s weekly' }}
                sourceClassName="hero-teaser__source"
                className="hero-teaser" />, { context });

            it('it should find source with correct className to style', () => {
                const elm = wrapper.find('.hero-teaser__source--australian-women-s-weekly');
                expect(elm.length).to.be.equal(1);
                expect(elm.text()).to.contain('Australian women\'s weekly|< />');
            });
        });
    });
});
