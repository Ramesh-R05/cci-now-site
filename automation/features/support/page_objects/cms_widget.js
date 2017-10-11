var cms_widget = {

    loginUsername: 'input#lname',
    loginPassword: 'input#passw',
    loginButton: 'input[value="Login"]',
    cmsLeftSide: '#leftDIV',
    cmsRightSide: '#rightDIV',
    createName: 'input.bigInput',
    createDocumentType: 'select.bigInput',
    createButton: 'input[value="Create"]',
    itemTabs: '#body_TabView1',
    editorialLongTitle: 'div[module-id="contentTitle"] input',
    editorialShortTeaser: 'div[module-id="contentSummary"] textarea',
    editorialImage: 'input[id="body_txtbody_prop_contentImageUrl_fuCougarUploader"]',
    editorialBodyComponentList:'select[ng-model="newComponent"]',
    editorialBodyParagraphOption: 'option[value="0"]',
    editorialBodyHeadingOption: 'option[value="1"]',
    editorialBodyAddButton: 'button[ng-click="addComponent()"]',
    editorialBodyParagraph: 'textarea.form-control.paragraph-editor',
    editorialBodyHeading: '.content-body-editor .form-control.one-half.ng-pristine.ng-valid',
    searchAndSocialPageTitle: 'div[module-id="pageTitle"] input',
    searchBox: '#umbSearchField',
    searchResult: '.ac_results',
    menuDelete: '.menuSpr.sprDelete',
    unpublishButton: '[value="Unpublish"]',
    propertiesCreatedAt: '.tabpageContent div:nth-child(9) .umbDateTimePicker input',
    galleryImageButton: '#body_ctl00 > div > div > div.propertyItem > div > div > div.image.ng-scope > div > button:nth-child(2)',
    galleryImage: '#body_ctl00 > div > div > div.propertyItem > div > div > accordion > div > div > div > div.panel-collapse.collapse.in > div > div > image-uploader > div > div > div:nth-child(1) > p > input'

};

module.exports = cms_widget;
