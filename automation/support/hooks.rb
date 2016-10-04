Before('~@mobile', '~@tablet-landscape', '~@tablet-portrait', '~@crossbrowser') do
  if Capybara.current_driver == Capybara.default_driver
    if page.nil? or page.driver.nil?
      puts "the page and driver are not defined"
    else
      page.driver.resize(1600, 900)
    end
  else
    page.driver.browser.manage.window.maximize
  end
end

Before('@desktop') do
    if Capybara.current_driver == Capybara.default_driver
        page.driver.resize(1600, 900)
    else
        page.driver.browser.manage.window.resize_to(1600,900)
    end
end

Before('@mobile') do
  if Capybara.current_driver == Capybara.default_driver
    page.driver.resize(320, 568)
  else
    page.driver.browser.manage.window.resize_to(320,568)
  end
end

Before('@tablet-landscape') do
  if Capybara.current_driver == Capybara.default_driver
    page.driver.resize(1024, 768)
  else
    page.driver.browser.manage.window.resize_to(1024, 768)
  end
end

Before('@tablet-portrait') do
  if Capybara.current_driver == Capybara.default_driver
    page.driver.resize(768, 1024)
  else
    page.driver.browser.manage.window.resize_to(768, 1024)
  end
end

Before do |scenario|
    $style = nil
end

After do |scenario|
  if scenario.failed?
    begin
      print URI.parse(current_url)
    rescue
      print 'unable to access current url'
    end
    file_name = scenario.name.gsub(/ /, '-').gsub(/,/, '').downcase+'.png'
    page.save_screenshot('artifacts/' + file_name, :full => true)
    embed("#{file_name}", "image/png", "SCREENSHOT")
  end
end

at_exit do
#at exit it will close all open windows
    page.driver.browser.window_handles.each do |handle|
        # page.driver.browser.window_size(handle)
        page.driver.browser.switch_to.window(handle)
        page.execute_script "window.close()"
    end
end

def screenshot name="file"
    if name == "file"
        file_name = Time.now.to_s.delete('+ :').downcase+'.png'
    else
        file_name=name
    end
    page.save_screenshot('artifacts/' + file_name, :full => true)
    embed("#{file_name}", "image/png", "SCREENSHOT")
end

def clear_site_cache
  # clear cache on all servers (load-balancer is round-robin, so sequential calls should clear each server)
  (1..$server_count).each do |idx|
    call_url "#{$base_url}api/cache/clear"
    puts "cleared site cache of server #{idx}" if $verbose_logging
  end
end

def call_url url
  puts "call URL: #{url}" if $verbose_logging
  ($proxy_bypass == 'false') ? open(url, :proxy => nil) : open(url)
end

def base_url_without_port
  url_without_port = $base_url.sub( %r{:\d+/?}, '' )
  url_without_port = (url_without_port.end_with? "/") ? url_without_port[0..-2] : url_without_port
  url_without_port
end
