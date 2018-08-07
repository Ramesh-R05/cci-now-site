const lighthouse = require('lighthouse');
const chromeLauncher = require('lighthouse/chrome-launcher');
const auditConfig = require('lighthouse/lighthouse-core/config/full-config.js');

const testLinks = [
    {
        title: 'homepage',
        url: 'http://now-site.test.bxm.net.au/',
        expectedScore: 26
    },
    {
        title: 'section',
        url: 'http://now-site.test.bxm.net.au/fashion/',
        expectedScore: 33
    },
    {
        title: 'article',
        url: 'http://now-site.test.bxm.net.au/fashion/red-carpet/automation-test-article-with-hero-image-3663/',
        expectedScore: 23
    },
    {
        title: 'gallery',
        url: 'http://now-site.test.bxm.net.au/fashion/red-carpet/automation-test-gallery-13302/',
        expectedScore: 24
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
    describe(`Now To Love site performance testing for ${title} : ${url}`, function loopedTests() {
        let numberLoops = 3;
        this.retries(numberLoops);
        this.timeout(120000);
        let result;
        var scoreRound = [];
        var i = 0;

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
        it(`should have a performance score >= ${expectedScore}`, () => {
            const actualScore = Math.round(result.find(data => data.id === 'performance').score);
            scoreRound[i]= actualScore;
            console.log(`current score is => ${actualScore}`);
            if (actualScore >= expectedScore || i == numberLoops) {
                console.log(`The maximum score for ${title} is ${Math.max(...scoreRound)}`);
            }
            i++;
            assert.isAtLeast(Math.round(actualScore), expectedScore);
        });
    });

}

process.setMaxListeners(12);

testLinks.forEach((doctypeSetting) => {
    lighthouseTests(doctypeSetting);
});
