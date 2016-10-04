import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

import videoGalleryMock from '../../mocks/galleryOfGalleries';
const videoGalleryTeaserItem = videoGalleryMock.data[0];

const InlineGalleryItem = proxyquire('../../../app/components/inlineGallery/item', {
    'react': React,
    '../helpers/theme': (Component) => class extends React.Component {
        render() {
            return <Component {...this.props} className="theme-stub" />;
        }
    }
}).default;

describe('InlineGalleryItem', () => {
    let reactModule;

    const imageUrl = videoGalleryTeaserItem.contentImageUrl;
    const title = videoGalleryTeaserItem.contentTitle;
    const url = videoGalleryTeaserItem.url;
    const props = {imageUrl, title, url};

    let heading;
    let image;
    let link;

    afterEach(Context.cleanup);

    describe(`with all valid props`, () => {
        before(() => {

            reactModule = Context.mountComponent(InlineGalleryItem, {...props});
            heading = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery-item__title');
            link = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'a');
            image = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'img');
        });


        it(`should render a link with the correct href`, () => {
            expect(link.props.href).to.eq(url);
        });

        it(`should render the correct heading`, () => {
            expect(ReactDOM.findDOMNode(heading).textContent).to.eq(title);
        });
    });

    describe(`without props`, () => {
        before(() => {
            reactModule = Context.mountComponent(InlineGalleryItem);
        });

        it(`should not render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe(`without imageUrl prop`, () => {
        before(() => {
            let missingProps = {...props};
            delete missingProps.imageUrl;
            reactModule = Context.mountComponent(InlineGalleryItem, {...missingProps});
        });

        it(`should not render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe(`with only the imageUrl prop`, () => {
        before(() => {
            reactModule = Context.mountComponent(InlineGalleryItem, {imageUrl:imageUrl});
        });

        it(`should not render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe(`with only the imageUrl and url prop`, () => {
        let meta;

        before(() => {
            reactModule = Context.mountComponent(InlineGalleryItem, {imageUrl:imageUrl, url:url});
            image = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'img');
            meta = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery-item__meta');
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should hide the meta box`, () => {
            expect(ReactDOM.findDOMNode(meta).className.indexOf('hide')).to.be.greaterThan(-1);
        });
    });
});
