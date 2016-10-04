Given(/^I am currently viewing "([^"]*)"$/) do |url|
    puts ($base_url + url)
    visit ("/" + url)
end

Given(/^I can see the created date "([^"]*)"$/) do |date|
    expect(find('.article__date-created').text).to eq(date)
    # Validate the created date on article with hero image an article with hero video
end

Given(/^I can see the created date$/) do
   find('.article__date-created')
    # Validate the created date on article exists (for @crossbrowser)
end

Given(/^I can see the long title "([^"]*)"$/) do |long_title|
    expect(find('h1.article__title').text).to match(long_title)
    # Validate the long title on article with hero image and article with hero video
end

Given(/^I can see the hero image$/) do
  page.execute_script "window.scrollBy(0,1500)" # To scroll to around the position of the hero image before checking (Lazyloading)
  expect(find('div.article__hero-container .article__main-hero img').visible?).to eq(true)
  hero_image_url = find('div.article__hero-container .article__main-hero img')[:srcset].to_s
  puts "<img src='" + hero_image_url + "' style='width:10%;height:10%;'></img>"
  # Validate the hero image that is visible on article with hero image
end

Given(/^I can see the image alt text in the hero image element "([^"]*)"$/) do |alt_text|
    hero_image_alt_text = find('.article__main-hero img')[:alt].to_s
    #puts("Hero image alt text = " + hero_image_alt_text)
    expect(hero_image_alt_text).to match(alt_text)
    # Validate the image alt text that is in the hero image element on article with hero image
end


Given(/^I can see the hero image caption "([^"]*)"$/) do |image_caption|
  expect(find('.article__main-hero .article_image-caption').text).to match(image_caption)
  # Validate the hero image caption on article with hero image
end

Given(/^I can see the short teaser "([^"]*)"$/) do |short_teaser|
    expect(find('.article__summary').text).to match(short_teaser)
    # Validate the short teaser on article with hero image and article with hero video
end

Given(/^I can see the body paragraph "([^"]*)"$/) do |paragraph|
    body_paragraph = page.all('.content-body__paragraph')
    expect(body_paragraph[0].text).to match(paragraph)
    # Validate the body paragraph on article with hero image and article with hero video
end

Given(/^I can see the body heading "([^"]*)"$/) do |heading|
    body_heading = page.all('.content-body__heading')
    expect(body_heading[0].text).to match(heading)
    # Validate the body heading on article with hero image and article with hero video
end

Given(/^I can see the body related content$/) do
  expect(find('.related-content h2.related-content__heading').text).to eq("Related")
  expect(find('.related-content-items').visible?).to eq(true)
  # Validate the body related content on article with hero image and article with hero video
end

Given(/^I can see the body image$/) do
  body_image = page.all('.content-body__inline-image--landscape figure picture')
  expect(body_image[0].visible?).to eq(true)
  # Validate the body image that is visible on article with hero image and article with hero video
end

Given(/^I can see the body image caption "([^"]*)"$/) do |image_caption|
  body_image_caption = page.all('.content-body__inline-image--landscape figure .content-body__inline-image-caption')
  expect(body_image_caption[0].text).to match(image_caption)
  # Validate the body image caption that is visible on article with hero image and article with hero video
end

Given(/^I can see the body gallery$/) do
  body_gallery = page.all('.content-body__gallery-link a')
  expect(body_gallery[0][:href].to_s).to_not eq("")
  expect(body_gallery[1][:href].to_s).to eq(body_gallery[0][:href].to_s)
  expect(find('.content-body__gallery-link a picture').visible?).to eq(true)
  # Validate the body gallery on article with hero image and article with her video
end

Given(/^I can see the body video$/) do
  body_video = page.all('.content-body__inline-video')
  expect(body_video[0].visible?).to eq(true)
  # Validate the body video that is visible on article with hero image and article with hero video
end

Given(/^I can see the body tidps$/) do
  body_tips = page.all('.content-body__tips')
  expect(body_tips[0].text).to match("body tips body tips EOM")
  # Validate the body tips on article with hero image and article with hero video
end

Given(/^I can see the body tips "([^"]*)"$/) do |tip|
    body_tips = page.all('.content-body__tips')
    expect(body_tips[0].text).to match(tip)
    # Validate the body tips on article with hero image and article with hero video
end

Given(/^I can see the body competition$/) do
  body_competitions = page.all('section.article__body div iframe')
  puts ("Number of iframe = " + body_competitions.size.to_s)
  if body_competitions.size.to_s == "5" then
      puts ("Second iframe = " + body_competitions[1][:src].to_s)
      expect(body_competitions[1][:src].to_s).to match("engagesciences")
  else
      puts ("First iframe = " + body_competitions[0][:src].to_s)
      expect(body_competitions[0][:src].to_s).to match("engagesciences")
  end
  # Validate the body competition on article with hero image and article with hero video
end

Given(/^I can see the body Twitter embed "([^"]*)"$/) do |id|
    within(find('div.twitter-embed'))do
       twitter_embed_id = find('#twitter-widget-0')
        expect(twitter_embed_id [:"data-tweet-id"].to_s).to eq(id)
    end
      # Validate the body Twitter embed with a correct ID
end

Given(/^I can see the body Instagram embed with caption "([^"]*)"$/) do |src|
    sleep(3)
    instagram_embed = page.all(".instagram-media")
    # instagram_embed = page.all('div.content-body__embed.content-body__embed--instagram iframe')
    expect(instagram_embed[0][:src].to_s).to match(src)
    # Validate the body Instagram embed with a caption
end

Given(/^I can see the body Instagram embed without caption "([^"]*)"$/) do |src|
    sleep(3)
    instagram_embed = page.all('.instagram-media')
    expect(instagram_embed[1][:src].to_s).to match(src)
    expect(instagram_embed[1][:src].to_s).to_not match("captioned")
    # Validate the body Instagram embed without a caption
end

Given(/^I can see the related tags "([^"]*)" "([^"]*)"$/) do|tag1,tag2|
    expect(find('section.article__tags .tags__title').text).to eq('Related Tags:')
    related_tags = page.all('section.article__tags ul.related-tags li')
    related_tags_link = page.all('section.article__tags ul.related-tags li a')
    expect(related_tags[0].text).to eq(tag1)
    expect(related_tags[1].text).to eq(tag2)
    # Validate the related tags on article with hero image and article with hero video
end

Given(/^I can see the author "([^"]*)"$/) do |author|
    expect(find('.article .article-header-author span:last-child').text).to eq(author)
    # Validate the author on article with hero image and article with hero video
end


Given(/^I can see the hero video instead of the main image$/) do
  expect(find('div.article__hero-container .article__main-hero-video').visible?).to eq(true)
  expect(page).not_to have_selector('div.article__hero-container .article__main-hero img')
  # Validate the hero video on article with hero video
end

Given(/^I should not see the hero image caption$/) do
  expect(page).not_to have_selector('.article__main-hero .article_image-caption')
  # Validate the hero image caption not appearing on article with hero video
end

Given(/^I can see (\d+) items in the list of items in LHR$/) do |number_items|
  $LHR_item = page.all('.article-feed-container.container.row ul.feed__items li.feed-item')
  expect($LHR_item.size).to eq(number_items.to_i)
  # Validate the number of items in the LHR
end

Given(/^I can see the image of each item in LHR$/) do
  $LHR_item_image = page.all('.article-feed-container.container.row ul.feed__items li.feed-item a.teaser__image')
  expect($LHR_item_image.size).to eq($LHR_item.size)
  # Validate the number of images in the LHR is the same number of items
end

Given(/^Image in LHR is clickable to open its page$/) do
  $LHR_item_image.each do |image|
    expect(image[:href]).to_not eq("")
    #puts ("Link from image = " + image[:href])
  end
  # Validate all item images contain their link
end

Given(/^I can see the long title of each item in LHR$/) do
  $LHR_item_title = page.all('.article-feed-container.container.row ul.feed__items li.feed-item div.feed-item__body a.feed-item__body-title')
  expect($LHR_item_title.size).to eq($LHR_item.size)
  $LHR_item_title.each do |title|
    expect(title.text).to_not eq("")
  end
  # Validate the number of titles in the LHR is the same number of items
end

Given(/^Long title in LHR is clickable to open its page$/) do
  $LHR_item_title.each do |title|
    expect(title[:href]).to_not eq("")
    #puts ("Link from title = " + title[:href])
  end
  # Validate all item titles contain their link
end

Given(/^I can see the items in LHR sorted by created date$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I can see the LHR$/) do
  expect(page).to have_selector('.feed')
  # Validate the LHR exists
end

Given(/^I should not see the LHR$/) do
  expect(page).to_not have_selector('.feed')
  # Validate the LHR does not exist
end



