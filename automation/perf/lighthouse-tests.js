const lighthouseTests = require('../node_modules/@bxm/automation/lib/execution/lighthouseTests');

const testLinks = [
    {
        title: 'NTL-homepage',
        url: 'http://now-site.test.bxm.net.au/',
        expectedScore: 0.17
    },
    {
        title: 'NTL-section',
        url: 'http://now-site.test.bxm.net.au/fashion/',
        expectedScore: 0.17
    },
    {
        title: 'NTL-article',
        url: 'http://now-site.test.bxm.net.au/fashion/red-carpet/automation-test-article-with-hero-image-3663/',
        expectedScore: 0.14
    },
    {
        title: 'NTL-gallery',
        url: 'http://now-site.test.bxm.net.au/fashion/red-carpet/automation-test-gallery-13302/',
        expectedScore: 0.15
    }
];

testLinks.forEach((doctypeSetting) => {
    lighthouseTests(doctypeSetting, 'performance');
});
