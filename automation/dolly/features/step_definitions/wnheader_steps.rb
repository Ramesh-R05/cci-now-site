Given(/^To Love is clickable to open the menu list of all sites$/) do
    find('header.global-header nav.tl-header div.left.tl-header__button').click
    expect(page).to have_selector('nav.tl-header div.tl-modal--menu.tl-modal--dark.tl-modal')
    # Validate the To Love text is clickable on the mobile screen size
end

Given(/^I can navigate to all sites in the mobile menu list on the left side$/) do |table|
    table.hashes.each do |title|
        within(find('div.tl-modal__content').find('div.small-6.columns.mobile-menu-column.mobile-menu-column--image')) do
            expect((find_link("#{title['title']}")[:href]).downcase).to include(title['url'].downcase)
        end
    end
    # Validate all sites in the mobile menu on the left side
end

Given(/^I can navigate to all sites in the mobile menu list on the right side$/) do |table|
    table.hashes.each do |title|
        within(find('div.tl-modal__content')) do
            expect((find_link("#{title['title']}")[:href]).downcase).to include(title['url'].downcase)
        end
    end
    # Validate all sites in the mobile menu on the right side
end

Given(/^The mobile menu list can be closed by clicking To Love$/) do
    find('header.global-header nav.tl-header div.left.tl-header__button').click
    expect(page).to_not have_selector('nav.tl-header div.tl-modal--menu.tl-modal--dark.tl-modal')
    # Validate the To Love text is clickable to close the WN menus
end

Given(/^To Love is unclickable$/) do
    find('header.global-header nav.tl-header div.left.tl-header__button').click
    expect(page).to_not have_selector('nav.tl-header div.tl-modal--menu.tl-modal--dark.tl-modal')
    # Validate the To Love text is unclickable on the desktop screen size
end

Given(/^I can navigate to all sites in the desktop list on the header$/) do |table|
    table.hashes.each do |title|
        within(find('nav.left.global-nav').find('ul.global-nav-list')) do
            expect((find_link("#{title['title']}")[:href]).downcase).to include(title['url'].downcase)
        end
    end
    # Validate all sites in the main sites on the global nav on desktop
end

Given(/^More should show more sites on hover$/) do
    find('ul.global-nav-list li.global-nav-list__has-children a').hover
    expect(page).to have_selector('ul.global-nav-list__dropdown')
    # Validate the More text can hover to see more sites
end

Given(/^I can navigate to all sites in the desktop list under More$/) do |table|
    table.hashes.each do |title|
        within(find('ul.global-nav-list').find('ul.global-nav-list__dropdown')) do
            expect((find_link("#{title['title']}")[:href]).downcase).to include(title['url'].downcase)
        end
    end
    # Validate all sites in the sites under the More list
end

Given(/^The list under More should disappear if there is no hover on More$/) do
    find('div.left.tl-header__button').hover
    expect(page).to_not have_selector('ul.global-nav-list__dropdown')
    # Validate the more sites list disappears
end

When(/^I should see the clickable To Love$/) do
    find('header.global-header nav.tl-header div.left.tl-header__button').click
    expect(page).to have_selector('nav.tl-header div.tl-modal--menu.tl-modal--dark.tl-modal')
    find('header.global-header nav.tl-header div.left.tl-header__button').click
    expect(page).to_not have_selector('nav.tl-header div.tl-modal--menu.tl-modal--dark.tl-modal')
    # Validate the To Love text is clickable
end

When(/^I should not see any sites displaying on the WN header$/) do
    expect(page).to_not have_selector('nav.left.global-nav')
    # Validate the sites don't appear on the WN header
end

When(/^I should not see the WN header$/) do
    expect(find('.header--pinned')[:style].to_s).to match("top: 0px")
    # Validate the WN header disappear
end

When(/^I should see the unclickable To Love$/) do
    find('header.global-header nav.tl-header div.left.tl-header__button').click
    expect(page).to_not have_selector('nav.tl-header div.tl-modal--menu.tl-modal--dark.tl-modal')
    # Validate the To Love text is unclickable
end

When(/^I should see "([^"]*)" site displaying on the WN header$/) do |site|
    expect(find('nav.left.global-nav').text).to match(site)
    # Validate the WN header contains that site on it
end

When(/^I should see "([^"]*)" site displaying either on the WN header or under the More list$/) do |site|
    number_menusOnWNHeader = page.all('ul.global-nav-list li').size.to_s

    case site

        when 'Food To Love' then
            case number_menusOnWNHeader
                when '4' then
                    expect(find('nav.left.global-nav').text).to match(site)
                    puts ("\"" + site + "\" appears on WN header.")
                when '3' then
                    step "I should see More button which contains \"#{site}\" in the More list"
                    puts ("\"" + site + "\" appears under the More list.")
            end

        when 'Homes To Love' then
            case number_menusOnWNHeader
                when '5' then
                    expect(find('nav.left.global-nav').text).to match(site)
                    puts ("\"" + site + "\" appears on WN header.")
                when '4' then
                    step "I should see More button which contains \"#{site}\" in the More list"
                    puts ("\"" + site + "\" appears under the More list.")
            end

        when 'Beauty Heaven' then
            case number_menusOnWNHeader
                when '6' then
                    expect(find('nav.left.global-nav').text).to match(site)
                    puts ("\"" + site + "\" appears on WN header.")
                when '5' then
                    step "I should see More button which contains \"#{site}\" in the More list"
                    puts ("\"" + site + "\" appears under the More list.")
            end
    end
    # Validate the WN header contains that site either on the WN header or under the More list
end

When(/^I should see More button which contains "([^"]*)" in the More list$/) do |site|
    find('ul.global-nav-list li.global-nav-list__has-children').hover
    expect(find('ul.global-nav-list__dropdown').text).to match(site)
    # Validate the More list shows the first site correctly
end

When(/^I can see the WN header$/) do
    wn_header_text = find('.tl-header').text
    expect(wn_header_text).to match("TO LOVE")
    puts(wn_header_text)
    # Validate the WN header appearing on the page (for @crossbrowser)
end

When(/^I can not see the WN header$/) do
    expect(page).to_not have_selector('.tl-header')
    # Validate the WN header not appearing on the page (for @crossbrowser)
end
