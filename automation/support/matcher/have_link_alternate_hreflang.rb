RSpec::Matchers.define :have_link_alternate_hreflang do |country_lang, expected|
  match do |actual|    
    has_css?("link[rel=alternate][hreflang='#{country_lang}'][href='#{expected}']", :visible => false)
  end

  failure_message_for_should do |actual|
    actual = first("link[rel=alternate][hreflang='#{country_lang}']")
    if actual
      "expected that link alternate would have content='#{country_lang}' and '#{expected}' but was '#{actual[:content]}'"
    else
      "expected that link alternate would exist with content='#{country_lang}' and '#{expected}'"
    end
  end
end