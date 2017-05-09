import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const linksStub = Context.createStubComponent();

const block = proxyquire('../../../app/components/social/block', {
    'react': React,
    './links': linksStub
}).default;

const brandMock = {
    socialUrls: {
    	"facebook": "https://www.facebook.com/WomensWeeklyMag",
		"instagram": "https://www.instagram.com/womensweeklymag"
	}
}

describe(`Social Block`, () => {
	let reactModule;
	let links;

	before(() => {
        reactModule = Context.mountComponent(block, brandMock);
        links = TestUtils.findRenderedComponentWithType(reactModule, linksStub);
    });

	it(`should pass proper props to links component`, () => {
        expect(links.props.links).to.deep.equal([
        	{ id: 0, name: 'facebook', url: "https://www.facebook.com/WomensWeeklyMag" },
     		{ id: 1, name: 'instagram',url: "https://www.instagram.com/womensweeklymag" }
     	]);
    });
});

