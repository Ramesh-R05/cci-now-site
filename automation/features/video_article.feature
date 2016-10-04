@article @wd
Feature: Video Article
    As a user
    I should be able to see the article page

    @DWD-163 @DIGEVT-30
    Scenario: Verify an article page which contains a hero video and video playlist on desktop view
        Given I switch to "desktop" view
        And I am currently viewing "celebrity/australian-celebrities/hugh-jackman-as-blackbeard-15156"
        * I can see the playlist container
        * I can see the hero video is "4925012401001"
        * I can see the video thumbnail of each video in the playlist
        * I can see the video title of each video in the playlist
        * I can click the play button of the main video
        * I can see the video playing
     #   * I can see the next video is auto-played after the previous video  #This step needs to use a short pre-roll ad. We will enable when DWD-180 is ready to test

    @DWD-163 @DIGEVT-30
    Scenario: Verify an article page which contains a hero video and video playlist on mobile view
        Given I switch to "mobile" view
        And I am currently viewing "celebrity/australian-celebrities/hugh-jackman-as-blackbeard-15156"
        * I can see the playlist container
        * I can see the hero video is "4925012401001"
        * I can see the video thumbnail of each video in the playlist
        * I can see the video title of each video in the playlist
        * I can click the play button of the main video
        * I can see the video playing
    #    * I can see the next video is auto-played after the previous video #This step needs to use a short pre-roll ad. We will enable when DWD-180 is ready to test

