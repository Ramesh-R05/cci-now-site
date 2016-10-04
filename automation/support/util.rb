Capybara::Node::Element.class_eval do
    def click_at(x, y)
            right = x - (native.size.width / 2)
            top = y - (native.size.height / 2)
            driver.browser.action.move_to(native).move_by(right.to_i, top.to_i).click.perform
    end
end

def wait_until(timeout = 5)
  start_time = Time.now

  begin
    value = yield
    raise "condition is still false" if !value
  rescue
    sleep(0.1)
    if (Time.now - start_time) > timeout
      raise "Timed out waiting for field to change"
    else
      retry
    end
  end
end

# monkey patch - add a line logging the absolute URL that is being visited
module Capybara
  class Session
    def visit(url)
     #raise_server_error!

      url = url.to_s
      @touched = true

      url_relative = URI.parse(url).scheme.nil?

      if url_relative && Capybara.app_host
        url = Capybara.app_host + url
        url_relative = false
      end

      if @server
        url = "http://#{@server.host}:#{@server.port}" + url if url_relative

        if Capybara.always_include_port
          uri = URI.parse(url)
          uri.port = @server.port if uri.port == uri.default_port
          url = uri.to_s
        end
      end

      puts "      Visit: #{url}"

      driver.visit(url)
    end
  end
end

# To scroll the page down to ensure images are loaded
def handle_lazy_load(round)
    for i in 1..round
        page.execute_script "window.scrollBy(0,1500)"
        sleep(1)
    end
end

# To check whether the page is mobile style or desktop style (using WN Header to check)
def check_style
    if ENV['SELENIUM_DEVICE'] == "android" then
        $style = "mobile"
        # Android is not supported in page.driver.browser.manage.window but we know that android is tested on mobile only. So we can set $style to be "mobile"
    else
        width = page.driver.browser.manage.window.size.width
        puts ("Screen width = " + width.to_s)
        case width
            when 1050
                $style = "desktop"
            when 768
                $style = "tablet"
            else
                $style = "mobile"
        end
    end
end
