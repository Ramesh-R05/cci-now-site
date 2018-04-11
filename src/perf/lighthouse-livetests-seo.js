const lighthouse = require('lighthouse');
const chromeLauncher = require('lighthouse/chrome-launcher');
const auditConfig = require('lighthouse/lighthouse-core/config/full-config.js');

const testLinks = [
    {
        title: 'homepage',
        url: 'https://www.nowtolove.com.au/',
        expectedScore: 90
    },
    {
        title: 'section',
        url: 'https://www.nowtolove.com.au/news/',
        expectedScore: 90
    },
    {
        title: 'article',
        url: 'https://www.nowtolove.com.au/health/body/how-to-harness-your-hormones-44097/',
        expectedScore: 90
    },
    {
        title: 'gallery',
        url: 'https://www.nowtolove.com.au/fashion/fashion-news/meghan-markles-style-file-41284/',
        expectedScore: 90
    }
];

function lighthouseInit(url, flags = {}, config = null) {
    return chromeLauncher.launch(flags).then((chrome) => {
        const generatedFlags = {
            port: chrome.port
        };
        return lighthouse(url, generatedFlags, config).then(results =>
            chrome.kill().then(() => results));
    });
}

function lighthouseTests(testObject) {
    const lighthouseOptions = {
        chromeFlags: ["--headless", "--disable-gpu", "--enable-logging", "--no-sandbox"]
    };
    const { title, url, expectedScore } = testObject;
    describe(`Now To Love site SEO testing for ${title} : ${url}`, function loopedTests() {
        this.retries(3);
        this.timeout(120000);
        let result;

        beforeEach('Run Lighthouse base test', (done) => {
            lighthouseInit(url, lighthouseOptions, auditConfig)
                .then(res => res.reportCategories)
                .then((res) => {
                    result = res;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        it(`should have a SEO score >= ${expectedScore}`, () => {
            const actualScore = result.find(data => data.id === 'seo').score;
            console.log(`current score is => ${Math.round(actualScore)}`);
            assert.isAtLeast(Math.round(actualScore), expectedScore);
        });

    });

}

process.setMaxListeners(12);

testLinks.forEach((doctypeSetting) => {
    lighthouseTests(doctypeSetting);
});
