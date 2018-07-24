import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import each from 'lodash/collection/each';
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const SocialIconStub = Context.createStubComponent();

const SocialLinks = proxyquire('../../../app/components/social/links', {
    react: React,
    './icon': SocialIconStub
}).default;

describe(`SocialLinks`, () => {
    const links = [
        { name: 'facebook', url: 'http://www.facebook.com/dollymag', label: 'facebook' },
        { name: 'instagram', url: 'http://www.instagram.com/dollymag', label: 'instagram' },
        { name: 'snapchat', url: 'https://itunes.apple.com/us/app/snapchat/id447188370?mt=8', label: 'DollyMag' },
        { name: 'twitter', url: 'https://twitter.com/dollymag', label: 'twitter' },
        { name: 'newsletter', url: '#', label: 'newsletter' },
        { name: 'dollymag', url: 'https://www.magshop.com.au/dolly/h1608dol', label: 'dolly mag' },
        { name: 'dollydr', url: 'https://itunes.apple.com/au/app/dolly-doctor/id948492088?mt=8', label: 'dolly dr' },
        { name: 'youtube', url: 'https://www.youtube.com/user/DOLLYaus', label: 'youtube' }
    ];
    const nbSocialIcons = links.length;
    let reactModule;
    let socialIcons;

    before(() => {
        reactModule = Context.mountComponent(SocialLinks, { links });
        socialIcons = TestUtils.scryRenderedComponentsWithType(reactModule, SocialIconStub);
    });

    it(`should render the SocialLinks Component`, () => {
        expect(ReactDOM.findDOMNode(reactModule)).to.exist;
    });

    it(`should render ${nbSocialIcons} SocialIcons components`, () => {
        expect(socialIcons.length).to.eq(nbSocialIcons);
    });

    each(links, (icon, i) => {
        const { name, url, label } = icon;

        describe(`${name} social icon`, () => {
            it(`sets the name to "${name}"`, () => {
                expect(socialIcons[i].props.name).to.eq(name);
            });

            it(`sets the url to "${url}"`, () => {
                expect(socialIcons[i].props.url).to.eq(url);
            });

            it(`sets the label to "${label}"`, () => {
                expect(socialIcons[i].props.label).to.eq(label);
            });
        });
    });
});
