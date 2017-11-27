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
    editorialBodyParagraph: 'textarea.markdown-input',
    editorialBodyHeading: '.content-body-editor .form-control.one-half.ng-pristine.ng-valid',
    searchAndSocialPageTitle: 'div[module-id="pageTitle"] input',
    searchBox: '#umbSearchField',
    searchResult: '.ac_results',
    menuDelete: '.menuSpr.sprDelete',
    unpublishButton: '[value="Unpublish"]',
    propertiesCreatedAt: '.tabpageContent div:nth-child(9) .umbDateTimePicker input',
    ampEnablebox: 'div.col-xs-10 > input',
    ampHtml: 'link[rel=amphtml]',
    editorialSearchVideo: 'div > div:nth-child(2) > input.form-control.one-half.ng-pristine.ng-valid',
    editorialSearchButton: 'div > div:nth-child(2) > input.btn.btn-primary',
    galleryImageOption: '#the_media_select > option[value="1"]',
    editorialUseVideo: 'video-uploader div > div:nth-child(n) > div >div.bordered-group > input',
    editorialVideoAddButton: 'video-uploader > div div:nth-child(n) > div > div.bordered-group div button',
    editorialVideoId: '.tw-bs.module.video .panel [ng-show="data.videoId"] td.ng-binding',
    editorialAddVideoButton: 'search-videos > div > div.top-five-latest-videos.bordered-group > div:nth-child(1) > div.video-info > div.button-group > button',
    editorialVideoThumbnail: 'div.propertyItem > div > div > div > div.preview.ng-scope > div:nth-child(2) > img',
    editorialSecondVideoThumbnail: 'video-uploader > div > div > div.preview.ng-scope > div:nth-child(2) > img',
    editorialBodyVideoOption: 'option[value="5"]',
    pageContentTags: 'tag-picker [ng-model="item.tagName"]',
    pageContentTagsFirstTag: 'a.ng-scope.ng-binding > strong',
    pageContentTagsDropDown: 'ul#typeahead-01Y-9026.dropdown-menu.ng-scope'

};

module.exports = cms_widget;