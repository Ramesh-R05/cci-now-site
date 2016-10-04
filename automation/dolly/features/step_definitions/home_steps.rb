Given(/^I am currently viewing the homepage$/) do
    puts ($base_url)
    visit '/'
end

When(/^I should see the trending title at the top$/) do
    within find(".trending-wrapper") do
        expect(page).to_not have_selector('.columns.xlarge-2.show-for-xlarge-up .trending__caption img')
        expect(find('.trending__caption.hide-for-xlarge-up img')[:src].to_s).to match("/assets/titles/trending-mobile.svg")
    end
    # Validate the trending title image at the top
end

When(/^I should see the trending title in the left hand side$/) do
    within find(".trending-wrapper") do
        expect(page).to_not have_selector('.trending__caption.hide-for-xlarge-up img')
        expect(find('.columns.xlarge-2.show-for-xlarge-up .trending__caption img')[:src].to_s).to match("/assets/titles/trending.svg")
    end
    # Validate the trending title image in the left hand side
end

When(/^I should see the trending background image$/) do
    expect(find('.trending-wrapper').native.style('background')).to match("/assets/backgrounds/trending-pink.svg")
    # Validate the trending background image
end

When(/^I should see (\d+) items in the trending$/) do |number|
    @trending_item_number = page.all('.trending-wrapper a.teaser__image').size.to_s
    expect(@trending_item_number).to eq(number)
    # Validate the number of items in trending
end

When(/^Image and title of all items are clickable$/) do
    within find('.trending-wrapper') do
        trending_item_image = page.all('.teaser__image')
        trending_item_image_url = page.all('.teaser__image img')
        trending_item_title = page.all('.teaser__title a')
        for i in 0..@trending_item_number.to_i-1
            #   expect(trending_item_image_url[i][:href].to_s).to_not eq('') #this code will be used once DDO-282 is clarified
            expect(trending_item_image[i][:href].to_s).to eq(trending_item_title[i][:href].to_s)
            puts "Item no." + i.to_s
            puts "<img src='" + trending_item_image_url[i][:srcset].to_s + "' style='width:10%;height:10%;'></img>"
            puts trending_item_title[i].text
            puts trending_item_title[i][:href].to_s # Automation environment will show href once DDO-282 is clarified
        end
    end
    # Validate the image and title contain a link
end

When(/^I should see the homepage hero element$/) do
    find('.hero-wrapper')
    # Validate the hero element frame on homepage
end

When(/^I should see the homepage hero image$/) do
    within find(".hero-wrapper") do
        hero_img_url =  find("img")[:srcset].to_s
        expect(hero_img_url).to_not eq("")
        puts "<img src='" + hero_img_url + "' style='width:10%;height:10%;'></img>"
    end
    # Validate the hero image that is visible on homepage
end

When(/^The homepage hero image should be clickable to open its page$/) do
    within find(".hero-wrapper") do
        hero_img_link = find('.teaser__image')[:href].to_s
        expect(hero_img_link).to_not eq("")
        puts hero_img_link
    end
    # Validate the hero image is clickable and print
end

When(/^I should see the homepage hero info appearing under hero image on "([^"]*)"$/) do |view|
    within find(".hero-wrapper") do
        case view
            when 'mobile' then
                expect(find('.teaser__body').native.css_value('width')).to match("655") # 100% on 'mobile' resolution = 655px when running on TeamCity. (637px on local)
            when 'tablet landscape' then
                expect(find('.teaser__body').native.css_value('width')).to match("592") # 100% on 'tablet landscape' resolution = 592.656px when running on TeamCity. (602.656px on local)
        end
    end
    # Validate the position of details appearing under hero image
end

When(/^I should see the homepage hero custom label at the bottom edge of hero image$/) do
    page.execute_script "window.scrollBy(0,300)"
    within find(".hero-wrapper") do
        expect(find('.teaser__sub-section-container').native.css_value('position')).to match("absolute")
        hero_custom_label = find('.teaser__badge').text
        expect(hero_custom_label).to_not eq("")
        puts hero_custom_label
    end
    # Validate the hero custom label displays correctly (position:absolute)
end

When(/^I should see the homepage hero title$/) do
    within find(".hero-wrapper") do
        hero_title = find('.gtm-teaser').text
        expect(hero_title).to_not eq("")
        puts hero_title
    end
    # Validate the hero title
end

When(/^The homepage hero title should be clickable to open its page$/) do
    within find(".hero-wrapper") do
        hero_title_link = find('.gtm-teaser')[:href].to_s
        expect(hero_title_link).to_not eq("")
        expect(hero_title_link).to eq(find('.teaser__image')[:href].to_s)
        puts hero_title_link
    end
    # Validate the hero title is clickable
end

When(/^I should see the homepage hero short teaser$/) do
    within find(".hero-wrapper") do
        hero_short_teaser = find('.teaser__summary').text
        expect(hero_short_teaser).to_not eq("")
        puts hero_short_teaser
    end
    # Validate the hero short teaser
end

When(/^I should see the homepage hero border in mobile style$/) do
    expect(find('.content-wrapper .stripe-bg').native.style('background')).to match("/assets/backgrounds/line-light-pink.svg")
    # Validate the hero border on mobile style
end

When(/^I should see the homepage hero border in tablet style$/) do
    expect(find('.content-wrapper .stripe-bg').native.style('background-image')).to match("/assets/backgrounds/line-light-pink-ipad.svg")
    # Validate the hero border on tablet style
end

When(/^I should see the homepage hero border in desktop style$/) do
    expect(find('.content-wrapper .stripe-bg').native.style('background-image')).to match("/assets/backgrounds/line-light-pink.svg")
    # Validate the hero border on desktop style
end

When(/^I should see the homepage hero striped background$/) do
    expect(find('.hero-wrapper').native.style('background')).to match("/assets/backgrounds/hero.png")
    # Validate the hero striped background on homepage
end

When(/^I should see the homepage hero info appearing in the right side on "([^"]*)"$/) do |view|
    within find(".hero-wrapper") do
        case view
            when 'tablet portrait' then
                expect(find('.teaser__body').native.css_value('width')).to match("276")  # 41.66667% on 'tablet portrait' resolution = 276.25px when running on TeamCity. (268.75px on local)
            when 'desktop' then
                expect(find('.teaser__body').native.css_value('width')).to match("456")  # 41.66667% on 'desktop' resolution = 456.766px when running on TeamCity. (451.141px on local)
        end
    end
    # Validate the position of details appearing in the right side
end

When(/^I should see the homepage hero custom label in the right side$/) do
    within find(".hero-wrapper") do
        expect(find('.teaser__sub-section-container').native.css_value('position')).to match("relative")
        hero_custom_label = find('.teaser__badge').text
        expect(hero_custom_label).to_not eq("")
        puts hero_custom_label
    end
    # Validate the hero custom label displays correctly (position:relative)
end

When(/^I should see (\d+) top half feed$/) do |number|
    within find('.teaser__list.teaser-view-grid') do
        @top_feed_number = page.all('article.teaser').size.to_s
        expect(@top_feed_number).to eq(number)
    end
    # Validate the number of top feed items
end

When(/^I should see each top feed item containing images$/) do
    handle_lazy_load(3)
    # To ensure all images are loaded before checking element
    within find('.teaser__list.teaser-view-grid') do
        @top_feed_teaser_image_url = page.all('.teaser__image img')
        expect(@top_feed_teaser_image_url.size.to_s).to eq(@top_feed_number)
        @top_feed_teaser_image_url.each do |image|
            expect(image[:srcset].to_s).to_not eq("")
            puts ("<img src='" + image[:srcset].to_s + "' style='width:5%;height:5%;'></img>")
        end
    end
    # Validate the image of top feed items
end

When(/^I should see a correct hero image on top feed item if it has a hero image$/) do
    expect(@top_feed_teaser_image_url[0][:srcset].to_s).to match("http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Dolly/2015/06/11/68027/main.jpg")
    # Validate the hero image is correct
end

When(/^I should see a default image on top feed item if it does not have a hero image$/) do
    expect(@top_feed_teaser_image_url[2][:srcset].to_s).to match("defaultimage.png")
    # Validate the default hero image is correct
end

When(/^I should see each top feed item containing custom label$/) do
    within find('.teaser__list.teaser-view-grid') do
        @top_feed_custom_label = page.all('.teaser__badge')
        expect(@top_feed_custom_label.size.to_s).to eq(@top_feed_number)
        @top_feed_custom_label.each do |label|
            expect(label.text).to_not eq("")
            puts (label.text)
        end
    end
    # Validate the custom label of top feed items
end

When(/^I should see a custom label "([^"]*)" on top feed item if it has a custom label$/) do |labelName|
    expect(@top_feed_custom_label[0].text).to match(labelName)
    # Validate the custom label is correct
end

When(/^I should see a section name "([^"]*)" on top feed item if it does not have a custom label$/) do |sectionName|
    expect(@top_feed_custom_label[3].text).to match(sectionName)
    # Validate the section name is correct
end

When(/^I should see each top feed item containing long title and the first one is "([^"]*)"$/) do |long_title|
    within find('.teaser__list.teaser-view-grid') do
        top_feed_long_title = page.all('.teaser__title')
        expect(top_feed_long_title.size.to_s).to eq(@top_feed_number)
        top_feed_long_title.each do |title|
            expect(title.text).to_not eq("")
            puts (title.text)
        end
        expect(top_feed_long_title[0].text).to match(long_title)
    end
    # Validate the long title of top feed items
end

When(/^I should see each top feed item containing short teaser and the first one is "([^"]*)"$/) do |short_teaser|
    within find('.teaser__list.teaser-view-grid') do
        top_feed_short_teaser = page.all('.teaser__summary-wrap')
        expect(top_feed_short_teaser.size.to_s).to eq(@top_feed_number)
        top_feed_short_teaser.each do |short_teaser|
            expect(short_teaser.text).to_not eq("")
            puts (short_teaser.text)
        end
        expect(top_feed_short_teaser[0].text).to match(short_teaser)
    end
    # Validate the short teaser of top feed items
end

When(/^Image and long title in each top feed item are clickable to open its page$/) do
    within find('.teaser__list.teaser-view-grid') do
        top_feed_teaser_image = page.all('.teaser__image')
        top_feed_teaser_title = page.all('.teaser__title a')
        for i in 0..@top_feed_number.to_i-1
            expect(top_feed_teaser_image[i][:href].to_s).to_not eq('')
            expect(top_feed_teaser_image[i][:href].to_s).to eq(top_feed_teaser_title[i][:href].to_s)
            puts top_feed_teaser_image[i][:href].to_s
        end
        expect(top_feed_teaser_image[0][:href].to_s).to match("fashion/joe-manual-test-gallery-13317")
    end
    # Validate the image and title contain a link
end

When(/^I should see (\d+) bottom half feed$/) do |number|
    within find('.teaser__list.teaser-view-list')do
        @bottom_feed_number = page.all('article.teaser').size.to_s
        expect(@bottom_feed_number).to eq(number)
    end
end
When(/^I should see each bottom feed item containing images$/) do
    handle_lazy_load(8)
    # To ensure all images are loaded before checking element
    within find('.teaser__list.teaser-view-list') do
        @bottom_feed_teaser_image_url = page.all('.teaser__image img')
        expect(@bottom_feed_teaser_image_url.size.to_s).to eq(@bottom_feed_number)
        @bottom_feed_teaser_image_url.each do |image|
            expect(image[:srcset].to_s).to_not eq("")
            puts ("<img src='" + image[:srcset].to_s + "' style='width:5%;height:5%;'></img>")
        end
    end
    # Validate the image of bottom feed items
end
When(/^I should see each bottom feed item containing custom label$/) do
    within find('.teaser__list.teaser-view-list') do
        @bottom_feed_custom_label = page.all('.teaser__badge')
        expect(@bottom_feed_custom_label.size.to_s).to eq(@bottom_feed_number)
        @bottom_feed_custom_label.each do |label|
            expect(label.text).to_not eq("")
            puts (label.text)
        end
    end
    # Validate the custom label of bottom feed items
end
When(/^I should see a custom label "([^"]*)" on bottom feed item if it has a custom label$/) do |labelName|
    expect(@bottom_feed_custom_label[0].text).to match(labelName)
    # Validate the custom label is correct
end
When(/^I should see a section name "([^"]*)" on bottom feed item if it does not have a custom label$/) do |sectionName|
    expect(@bottom_feed_custom_label[6].text).to match(sectionName)
    # Validate the section name is correct
end

When(/^I should see each bottom feed item containing long title with first long title as "([^"]*)"$/) do |longTitle|
    within find('.teaser__list.teaser-view-list') do
        @bottom_feed_long_title = page.all('.teaser__title')
        expect(@bottom_feed_long_title.size.to_s).to eq(@bottom_feed_number)
        @bottom_feed_long_title.each do |title|
            expect(title.text).to_not eq("")
            puts (title.text)
        end
        expect(@bottom_feed_long_title[0].text).to match(longTitle)
    end
    # Validate the long title of bottom feed items
end
When(/^I should see each bottom feed item containing short teaser with first short teaser as "([^"]*)"$/) do |shortTeaser|
    within find('.teaser__list.teaser-view-list') do
        @bottom_feed_short_teaser = page.all('.teaser__summary-wrap')
        expect( @bottom_feed_short_teaser.size.to_s).to eq(@bottom_feed_number)
        @bottom_feed_short_teaser.each do |short_teaser|
            expect(short_teaser.text).to_not eq("")
            puts (short_teaser.text)
        end
        expect( @bottom_feed_short_teaser[0].text).to match(shortTeaser)
    end
    # Validate the short teaser of bottom feed items
end
When(/^Image and long title in each bottom feed item are clickable to open its page with first bottom teaser page as "([^"]*)"$/) do |teaserPage|
    within find('.teaser__list.teaser-view-list') do
        @bottom_feed_teaser_image = page.all('.teaser__image')
        @bottom_feed_teaser_title = page.all('.teaser__title a')
        for i in 0..@bottom_feed_number.to_i-1
            expect(@bottom_feed_teaser_image[i][:href].to_s).to_not eq('')
            expect(@bottom_feed_teaser_image[i][:href].to_s).to eq(@bottom_feed_teaser_title[i][:href].to_s)
            puts @bottom_feed_teaser_image[i][:href].to_s
        end
        expect(@bottom_feed_teaser_image[0][:href].to_s).to match(teaserPage)
    end
    # Validate the image and title contain a link
end

When(/^the correct social media icons are clickable$/) do |table|
    expected=[]
    actual=[]

    #creates an array for the expected data
     data = table.raw
     data.each do |entry|
         expected.push [entry[1],entry[2]]
     end

    #creates an array for the actual data
    within find(".home-page__top-container") do
        social=page.all(".social-link")
        social.each do |entry|
            incon_url=entry.find("img")[:src].split("/")
            actual.push [incon_url[6],entry.find("a")[:href]]
        end
    end

    # ensure expected data matched with actual data
    expect(expected).to eq(actual)
end

When(/^I should see the trending element$/) do
    find('.trending-wrapper')
    # Validate the trending element exists (for @crossbrowser)
end
