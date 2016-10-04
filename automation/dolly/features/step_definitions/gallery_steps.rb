Given(/^I can see the dolly logo on the gallery header$/) do
    expect(find('.icon-logo').native.style('background-image')).to match("/assets/images/dolly-logo.svg")
    # Validate the dolly logo on the gallery header
end

Given(/^I can click the dolly logo to go to homepage$/) do
    expect(find('.icon-logo')[:href].to_s).to eq($base_url)
    # Validate the dolly logo is clickable to open Homepage
end

Given(/^I can see the long title on the gallery header "([^"]*)"$/) do |long_title|
    gallery_long_title = find('.gallery__title').text
    expect(gallery_long_title).to match(long_title)
    puts (gallery_long_title)
    # Validate the long title on the gallery header
end

Given(/^I should not see the long title on mobile$/) do
    expect(page).to_not have_selector('.gallery__title')
    # Validate the long title should not appear on mobile
end

Given(/^I can see an image appearing on the gallery$/) do
    within find('.gallery__slide') do
        gallery_image = find('img')[:src].to_s
        expect(gallery_image).to_not eq("")
        puts "<img src='" + gallery_image + "' style='width:5%;height:5%;'></img>"
    end
    # Validate the first image of the gallery
end

Given(/^I can see the custom label of the gallery$/) do
    within find('.gallery__summary') do
        # waiting DDO-305
    end
    pending # completing this step once DDO-305 is done
end

Given(/^I can see the created date of the gallery "([^"]*)"$/) do |date|
    gallery_date = find('.gallery__date').text
    expect(gallery_date).to eq(date) #This need to be updated once DDO-306 is fixed
    puts (gallery_date)
    # Validate the created date
end

Given(/^I can see the created date of this gallery$/) do
    gallery_date = find('.gallery__date').text
    expect(gallery_date).to_not eq("")
    puts (gallery_date)
    # Validate the created date
end

Given(/^I can see the gallery description of the gallery containing "([^"]*)"$/) do |message|
    gallery_description = find('.gallery__summary-text').text
    expect(gallery_description).to match(message)
    # Validate the gallery description
end

Given(/^I should not see the gallery description on mobile$/) do
    expect(page).to_not have_selector('.gallery__summary-text')
    # Validate the gallery description should not appear on mobile
end

Given(/^I should not see the left arrow on the gallery$/) do
    expect(page).to_not have_selector('button.gallery__nav.gallery__nav--prev')
    # Validate the left arrow should not appear
end

When(/^I can see the right arrow on the gallery$/) do
    find('button.gallery__nav.gallery__nav--next')
    # Validate the right arrow should appear on the gallery
end

Given(/^I can see the image number "([^"]*)" of total "([^"]*)" on the gallery$/) do |no,total|
    gallery_image_count = find('.gallery__slide-count').text
    expect(gallery_image_count).to eq(no + " / " + total)
    puts (gallery_image_count)
    # Validate the count image number
end

Given(/^I can see the image caption on the gallery containing "([^"]*)"$/) do |message|
    gallery_image_caption = find('.gallery-caption__content').text
    expect(gallery_image_caption).to match(message)
    puts (gallery_image_caption)
    # Validate the image caption on the gallery
end

Given(/^I can click MORE to see the full image caption on the gallery$/) do
    find('.gallery-caption__toggle--more').click
    expect(find('.gallery-caption__toggle--less')[:style].to_s).to eq("opacity: 1;")
    # Validate the more button in the image caption
end

Given(/^I can click LESS to see the short image caption on the gallery$/) do
    expect(page).to_not have_selector('.gallery-caption__toggle--more')
    find('.gallery-caption__toggle--less').click
    find('.gallery-caption__toggle--more')
    # Validate the less button in the image caption
end

Given(/^I can click the right arrow on the gallery$/) do
    current_image_number = find('.gallery__slide-current').text.to_i
    find('button.gallery__nav.gallery__nav--next').click
    next_image_number = find('.gallery__slide-current').text.to_i
    expect(next_image_number).to be > (current_image_number)
    # Validate the right arrow on the gallery can show next slide
end

Given(/^I can click the right arrow on the gallery "([^"]*)" times$/) do |num|
    for i in 1..num.to_i
        find('button.gallery__nav.gallery__nav--next').click
    end
end

Given(/^I can click the right arrow on the gallery on the last slide$/) do
    find('button.gallery__nav.gallery__nav--next').click
    # Validate the right arrow on the gallery on the last slide
end

When(/^I see the image no "([^"]*)" on the gallery$/) do |no|
    expect(find('.gallery__slide-current').text).to eq(no)
    # Validate the page shows the correct image no
end

When(/^I can see the left arrow on the gallery$/) do
    find('button.gallery__nav.gallery__nav--prev')
    # Validate the left arrow appear on the gallery page
end

When(/^I can click the left arrow to go back to a previous image on the gallery$/) do
    current_image_number = find('.gallery__slide-current').text.to_i
    find('button.gallery__nav.gallery__nav--prev').click
    previous_image_number = find('.gallery__slide-current').text.to_i
    expect(previous_image_number).to be < (current_image_number)
    # Validate the left arrow on the gallery can show previous slide
end

When(/^I see the video ID "([^"]*)" on the gallery$/) do |id|
    # The video is in the third slide in stubbed data
    find('button.gallery__nav.gallery__nav--next').click
    find('button.gallery__nav.gallery__nav--next').click
    expect(find('.video-wrapper video')[:'data-video-id'].to_s).to eq(id)
    # Validate the video appearing on the slide
end

When(/^I can see the play button and click on it$/) do
    find('button',:text=>"Play Video").click
    find('.video-wrapper').hover
    find('.vjs-control-bar')
    # Validate the play button appearing and clickable
end

When(/^I can click the left and right arrows on the gallery$/) do
    find('button.gallery__nav.gallery__nav--prev').click
    find('button.gallery__nav.gallery__nav--next').click
    find('button.gallery__nav.gallery__nav--next').click
    find('button.gallery__nav.gallery__nav--prev').click
    # Validate that the right and left arrows are clickable on that slide
end

When(/^I see the last image on the gallery$/) do
    current_slide = find('.gallery__slide-current').text.to_i
    last_slide = find('.gallery__slide-last').text.to_i
    while current_slide != last_slide do
         case current_slide
             when 3,7,11,15 then  #to ensure we skip the ad slide
                 find('button.gallery__nav.gallery__nav--next').click
         end
         find('button.gallery__nav.gallery__nav--next').click
         current_slide = find('.gallery__slide-current').text.to_i
    end
    puts find('.gallery__slide-count').text
    # Validate the last slide on the gallery
end

When(/^I see the next gallery slide on the gallery$/) do
    expect(find('.gallery__next h5').text).to eq("NEXT GALLERY")
    # Validate the page is showing the next gallery slide
end

When(/^I see the next gallery slide on the gallery on mobile$/) do
    expect(find('.gallery__more-heading').native.style("background")).to match("/assets/images/more-galleries.svg")
    # Validate the page is showing the next gallery slide
end

When(/^I can see the next gallery name "([^"]*)"$/) do |name|
    expect(find('.gallery__next h2').text).to match(name)
    # Validate the next gallery name
end

When(/^I can see the next gallery name on mobile "([^"]*)"$/) do |nextGallery|
    expect(find('.gallery__next-main .teaser__title').text).to match(nextGallery)
    # Validate the next gallery name on mobile
end

When(/^I can see the right arrow on the next gallery slide$/) do
    find('.icon-arrow-next')
    # Validate the right arrow on the next gallery slide
end

Given(/^I can see an ad displayed$/) do
    find(".gallery__slide-ad ")
    #move to the next slide
    find('button.gallery__nav.gallery__nav--next').click
end
