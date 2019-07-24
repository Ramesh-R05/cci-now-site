var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var world = require('../world');
var fs = require('fs');
var request = require('request');
var sectionName;
var subsectionName;
var contentName = {}; //Global Hash variable to collect the value of content name from different doc type e.g. contentName['article'] = 'article-test-xxxx'
var docTypeID = {}; //Global Hash variable to collect the value of random ID from different doc type e.g. docTypeID['article'] = 'xxxx'
var docType;

function randomValue() {
    return Math.floor(Math.random() * 60000) + 50000;
}
var randomId = randomValue();

module.exports = function() {
    this.Given(/^Emily just published the "([^"]*)" doc type item$/, function(page) {
        var content_json;
        var documentPath;
        docType = page;

        //Specify json file and path
        switch (page) {
            case 'article':
                randomId = randomId + 2;
                content_json = 'test-article-on-sit.json'; //The data in this json file is from http://dev.umbraco.services.bauer-media.internal/v1/now/documents/32106
                documentPath = '-1,1159,'; //Parent nodes in dev CMS
                break;
            case 'gallery':
                randomId = randomId + 3;
                content_json = 'test-gallery-on-sit.json'; //The data in this json file is from http://dev.umbraco.services.bauer-media.internal/v1/now/documents/32045
                documentPath = '-1,1159,'; //Parent nodes in dev CMS
                break;
            case 'section':
                randomId = randomId;
                content_json = 'test-section-on-sit.json'; //The data in this json file is from http://dev.umbraco.services.bauer-media.internal/v1/now/documents/34189
                documentPath = '-1,1159,'; //Parent node in dev CMS
                break;
            case 'subsection':
                randomId = randomId + 1;
                content_json = 'test-subsection-on-sit.json'; //The data in this json file is from http://dev.umbraco.services.bauer-media.internal/v1/now/documents/34189
                documentPath = '-1,1159,'; //Parent node in dev CMS
                break;
        }

        //Read Json File and update Title and ID
        var body_content = JSON.parse(fs.readFileSync('../automation/features/support/files/' + content_json, 'utf8'));
        switch (page) {
            case 'article':
            case 'gallery':
                body_content['document']['nodeName'] = docType + ' Test'; //e.g. Article Test
                body_content['document']['urlName'] = docType + '-test-' + randomId; //e.g. article-test-xxxx
                body_content['document']['contentTitle'] = docType + ' Test ' + randomId; //e.g. Article Test xxxx
                body_content['document']['id'] = randomId;
                body_content['document']['path'] = documentPath + docTypeID['section'] + ',' + docTypeID['subsection'] + ',' + randomId;
                body_content['document']['parentID'] = docTypeID['subsection'];
                contentName[page] = body_content['document']['urlName']; //e.g. article-test-xxxx
                docTypeID[page] = randomId;
                break;
            case 'section':
                body_content['document']['nodeName'] = 'SectionTest-' + randomId;
                body_content['document']['urlName'] = 'sectiontest-' + randomId;
                body_content['document']['contentTitle'] = body_content['document']['nodeName'];
                body_content['document']['id'] = randomId;
                body_content['document']['path'] = documentPath + randomId;
                docTypeID[page] = randomId;
                sectionName = body_content['document']['urlName'];
                break;
            case 'subsection':
                body_content['document']['nodeName'] = 'SubsectionTest-' + randomId;
                body_content['document']['urlName'] = 'subsectiontest-' + randomId;
                body_content['document']['contentTitle'] = body_content['document']['nodeName'];
                body_content['document']['id'] = randomId;
                body_content['document']['path'] = documentPath + docTypeID['section'] + ',' + randomId;
                body_content['document']['parentID'] = docTypeID['section'];
                subsectionName = body_content['document']['urlName'];
                docTypeID[page] = randomId;
                break;
        }

        request(
            {
                url: 'https://services.sit.bxm.net.au/publishing-broker/',
                method: 'POST',
                json: true,
                headers: {
                    'postman-token': '98215063-b20d-eb89-4865-35af75c73e11',
                    'content-type': 'application/json',
                    'x-service-access-key': process.env.APP_SERVICES_ACCESS_KEY
                },
                body: body_content
            },
            function(error, response, body) {
                if (error) throw new Error(error);
            }
        );
    });

    //only used for smoke test
    this.When(/^I navigate to the "([^"]*)" page$/, function(docType) {
        var elementOnPage;
        var pageURL;
        var sitUrl = process.env.URL || 'http://now-site-au.sit.bxm.net.au/';

        switch (docType) {
            case 'article':
            case 'gallery':
                elementOnPage = '.article__title';
                pageURL = sitUrl + sectionName + '/' + subsectionName + '/' + contentName[docType];
                break;
            case 'section':
                elementOnPage = '.page-title-container .page-title';
                pageURL = sitUrl + sectionName;
                break;
            case 'subsection':
                elementOnPage = '.page-title-container .page-title';
                pageURL = sitUrl + sectionName + '/' + subsectionName;
                break;
            case 'amp article':
                elementOnPage = '.article__title';
                pageURL = sitUrl + 'amp/' + sectionName + '/' + subsectionName + '/' + contentName['article'];
                docTypeID[docType] = docTypeID['article'];
                break;
            case 'amp gallery':
                elementOnPage = '.article__title';
                pageURL = sitUrl + 'amp/' + sectionName + '/' + subsectionName + '/' + contentName['gallery'];
                docTypeID[docType] = docTypeID['gallery'];
                break;
        }

        browser.waitUntil(
            () => {
                browser.refresh();
                browser.url(pageURL);

                if (browser.isExisting(elementOnPage)) {
                    return true;
                }

                console.log('Page not created yet, current page url is : ' + browser.getUrl());
            },
            60000,
            'document did not load in time',
            1000
        );
    });

    this.Then(/^our readers can enjoy the created "([^"]*)" page$/, function(docType) {
        var ID = docTypeID[docType];
        switch (docType) {
            case 'article':
            case 'amp article':
                browser.waitForVisible('.article__title', 30000);
                expect(browser.getText('.article__title')).toEqual('article Test ' + ID);
                break;
            case 'gallery':
            case 'amp gallery':
                browser.waitForVisible('.article__title', 30000);
                expect(browser.getText('.article__title')).toEqual('gallery Test ' + ID);
                break;
            case 'section':
                browser.waitForVisible('h1.page-title', 30000);
                expect(browser.getText('h1.page-title')).toEqual('SectionTest-' + ID);
                break;
            case 'subsection':
                browser.waitForVisible('h1.page-title', 30000);
                expect(browser.getText('h1.page-title')).toEqual('SubsectionTest-' + ID);
                break;
        }
    });
};
