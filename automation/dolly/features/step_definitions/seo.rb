Given(/^i visit "(.*?)"$/) do |url|
    visit(url)
end

And(/^I can see the relevant file that disallow the crawler$/)do
    expect(page.text).to eq("User-agent: * Disallow: /")
end

Given(/^I can see the relevant file that disallow some folders from the crawler$/) do
    screenshot("robots")
    #creation of string to verify
    begin
    @string = "User-agent: * "\
         "Disallow: /app/ Disallow: /bin/ "\
         "Disallow: /App_Data/ Disallow: /App_Start/ "\
         "Disallow: /api/ Disallow: /config/ Disallow: /scss/ "\
         "Disallow: /services/ Disallow: /tasks/ Disallow: /cms/ "\
         "Disallow: /deploy/ Disallow: /Errors/ Disallow: /Views/ "\
         "Disallow: /BauerArticle/ Disallow: /Gallery/ "\
         "Disallow: /modules/ Disallow: /Wurfl/ "\
         "Disallow: /gulpfile.js "\
         "Disallow: /karma.conf.js "\
         "Disallow: /package.json Disallow: /packages.config"
    end
    expect(page.text).to eq(@string)
end


