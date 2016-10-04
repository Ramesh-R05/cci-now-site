Given(/^Dolly logo on mobile header should display correctly$/) do
    expect(find('div.header__sections div.header-logo a').native.style('background-image')).to match("/assets/images/dolly-logo.svg")
    puts "<img src='#{$base_url}assets/images/dolly-logo.svg' style='width:3%;height:3%;'></img>"
    # Validate the Dolly logo on mobile header
end

Given(/^Dolly logo on mobile header should be clickable to open the homepage$/) do
    expect(find('div.header__sections div.header-logo a')[:href]).to eq($base_url)
    # Validate the Dolly logo on mobile header is clickable to open homepage
end

Given(/^Mobile header background should display correctly$/) do
    expect(find('div.header__sections').native.style('background')).to match("/assets/backgrounds/header.png")
    puts "<img src='#{$base_url}assets/backgrounds/header.png' style='width:3%;height:3%;'></img>"
    # Validate the mobile header background
end

Given(/^I should not see a pink background in the navigation$/) do
    expect(find('div.header__sections').native.style('background')).to_not match("/assets/backgrounds/header.png")
    # Validate the background of the navigation
end

Given(/^Hamburger menu is clickable to see the menu side bar$/) do
    expect(page).to_not have_selector("div.side-menu-wrapper.side-menu-wrapper--open.side-menu-wrapper--open-left")
    expect(page).to_not have_selector("div.off-canvas__overlay.off-canvas__overlay--left")
    find('div.header__sections div.header-menu').click
    expect(page).to have_selector("div.side-menu-wrapper.side-menu-wrapper--open.side-menu-wrapper--open-left")
    # Validate the hamburger button
end

Given(/^Background is darkened while hamburger menu is active$/) do
    expect(page).to have_selector("div.off-canvas__overlay.off-canvas__overlay--left")
    # Validate the background outside the hamburger
end

Given(/^I can navigate to any section of the site in the hamburger menu$/) do |table|
    table.hashes.each do |link|
        within(find('div.mobile-menu').find('nav.mobile-menu__nav')) do
            expect((find_link("#{link['link']}")[:href]).downcase).to include(link['url'].downcase)
        end
    end
    # Validate all menus in the hamburger
end

Given(/^I can close the humburger menu by clicking the close button$/) do
    find('div.off-canvas.off-canvas--left button.close-btn').click
    expect(page).to_not have_selector("div.side-menu-wrapper.side-menu-wrapper--open.side-menu-wrapper--open-left")
    expect(page).to_not have_selector("div.off-canvas__overlay.off-canvas__overlay--left")
    # Validate the close button of hamburger
end

Given(/^Dolly logo on desktop header banner should display correctly$/) do
    expect(find('div.header-banner a').native.style('background-image')).to match("/assets/images/dolly-logo.svg")
    puts "<img src='#{$base_url}assets/images/dolly-logo.svg' style='width:3%;height:3%;'></img>"
    # Validate the Dolly logo on desktop header banner
end

Given(/^Dolly logo on desktop header banner should be clickable to open the homepage$/) do
    expect(find('div.header-banner a')[:href]).to eq($base_url)
    # Validate the Dolly logo on desktop header banner is clickable to open homepage
end

Given(/^Header banner background should display correctly$/) do
    expect(find('div.header-banner').native.style('background')).to match("/assets/backgrounds/header.png")
    puts "<img src='#{$base_url}assets/backgrounds/header.png' style='width:3%;height:3%;'></img>"
    # Validate the header banner background
end

Given(/^I can navigate to any section of the site in the desktop header navigation bar$/) do |table|
    table.hashes.each do |link|
        within(find('div.header-nav').find('nav.header-nav__nav')) do
            expect((find_link("#{link['link']}")[:href]).downcase).to include(link['url'].downcase)
        end
    end
    # Validate all menus in the header navigation
end

When(/^I should see mobile header$/) do
    expect(page).to have_selector("div.header__sections div.header-logo")
    # Validate the mobile header should appear
end

When(/^I should see small Dolly logo$/) do
    expect(page).to have_selector("div.header__sections div.header-logo")
    # Validate the small Dolly logo should appear
end

When(/^I should not see mobile header$/) do
    expect(page).to_not have_selector("div.header__sections div.header-logo")
    # Validate the mobile header should not appear
end

When(/^I should see mobile hamburger$/) do
    expect(page).to have_selector("div.header__sections div.header-menu button.header-menu__button-menu")
    # Validate the mobile hamburger should appear
end

When(/^I should not see mobile hamburger$/) do
    expect(page).to_not have_selector("div.header__sections div.header-menu button.header-menu__button-menu")
    # Validate the mobile hamburger should not appear
end

When(/^I should see desktop header$/) do
    expect(page).to have_selector("div.header-banner")
    # Validate the desktop header should not appear
end

When(/^I should not see desktop header$/) do
    expect(page).to_not have_selector("div.header-banner")
    # Validate the desktop header should not appear
end

When(/^I should see desktop navigation$/) do
    expect(find('div.header__sections div.header-nav nav.header-nav__nav').text).to match("CELEBRITY")
    # Validate the desktop navigation should appear
end

When(/^I should not see desktop navigation on mobile$/) do
    expect(page).to_not have_selector("div.header__sections div.header-nav")
    # Validate the desktop navigation should not appear on mobile
end

When(/^I should not see desktop navigation$/) do
    expect(find('div.header__sections div.header-nav').text).to eq("")
    # Validate the desktop navigation should not be visible
end

When(/^I scroll the page down$/) do
    page.execute_script "window.scrollBy(0,1000)"
    # Scroll the page down
end

And(/^I scroll the page up$/) do
    page.execute_script "window.scrollBy(0,-1000)"
    # Scroll the page up
end

When(/^I can see the dolly header and navigation on "([^"]*)"$/) do |page|
    check_style
    case $style

        when 'mobile' then
            case page
                when 'article' then
                    step 'I should see mobile header'
                    step 'I should see mobile hamburger'
                    step 'I should not see desktop header'
                    step 'I should not see desktop navigation on mobile'
                when 'section' then
                    step 'I should see mobile header'
                    step 'I should see mobile hamburger'
                    step 'I should not see desktop header'
                    step 'I should not see desktop navigation on mobile'
                when 'homepage' then
                    step 'I should see mobile header'
                    step 'I should see mobile hamburger'
                    step 'I should not see desktop header'
                    step 'I should not see desktop navigation on mobile'
            end

        when 'tablet' then
            case page
                when 'article' then
                    step 'I should see mobile hamburger'
                    step 'I should see small Dolly logo'
                    step 'I should not see desktop header'
                    step 'I should not see desktop navigation'
                when 'section' then
                    step 'I should not see mobile header'
                    step 'I should not see mobile hamburger'
                    step 'I should see desktop header'
                    step 'I should see desktop navigation'
                when 'homepage' then
                    step 'I should not see mobile header'
                    step 'I should not see mobile hamburger'
                    step 'I should see desktop header'
                    step 'I should see desktop navigation'
            end

        when 'desktop' then
            case page
                when 'article' then
                    step 'I should not see mobile hamburger'
                    step 'I should see small Dolly logo'
                    step 'I should not see desktop header'
                    step 'I should see desktop navigation'
                when 'section' then
                    step 'I should not see mobile header'
                    step 'I should not see mobile hamburger'
                    step 'I should see desktop header'
                    step 'I should see desktop navigation'
                when 'homepage' then
                    step 'I should not see mobile header'
                    step 'I should not see mobile hamburger'
                    step 'I should see desktop header'
                    step 'I should see desktop navigation'
            end
    end
    # Validate the dolly header including navigation appearing correctly (for @crossbrowser)
end
