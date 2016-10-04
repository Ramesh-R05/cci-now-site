require 'cucumber/rake/task'
require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'
require 'parallel'
require 'json'

@browsers = JSON.load(open('browsers.json'))
@parallel_limit = ENV["nodes"] || 1
@parallel_limit = @parallel_limit.to_i


def run_rake_task(name)
  begin
    Rake::Task[name].invoke
  rescue Exception => e
    return false
  end
  true
end

def create_tasks(extra_args)
    desc 'Open cucumber task'
        Cucumber::Rake::Task.new :no_tags, [:extra_args] do |t|
        t.cucumber_opts = ["--format pretty --format rerun --out rerun.txt #{extra_args} --strict"]
    end
    desc 'Default regression tests'
        Cucumber::Rake::Task.new :local, [:extra_args] do |t|
        t.cucumber_opts = ["--format pretty --format rerun --out rerun.txt #{extra_args} --tags=@local --strict"]
    end

    desc 'Default regression tests pointing to dev'
        Cucumber::Rake::Task.new :first, [:extra_args] do |t|
        t.cucumber_opts = ["--format pretty --format rerun --out rerun.txt #{extra_args} --tags=~@manual --tags=~@javascript --tags=@first --strict"]
    end

    desc 'Default regression tests'
        Cucumber::Rake::Task.new :regression, [:extra_args] do |t|
        t.cucumber_opts = ["--format pretty --format rerun --out rerun.txt #{extra_args} --tags=~@manual --tags=~@first --tags=~@javascript --strict"]
    end

    desc 'Rerun failed tests'
        Cucumber::Rake::Task.new :rerun do |t|
        t.cucumber_opts = ["@rerun.txt --format pretty #{extra_args} --strict"]
    end

    desc 'Tagged UI tests'
        Cucumber::Rake::Task.new :tagged_javascript, [:extra_args] do |t|
        t.cucumber_opts = ["--format pretty --format rerun --out rerun.txt #{extra_args} --tags=~@manual --tags=@javascript --strict"]
    end

    desc 'Rerun failed tagged UI tests'
        Cucumber::Rake::Task.new :tagged_javascript_rerun do |t|
        t.cucumber_opts = ["@rerun.txt --format pretty #{extra_args} --strict"]
    end

    desc 'Automation Envsetup'
        Cucumber::Rake::Task.new :auto_setup do |t|
        t.cucumber_opts = ["--format pretty env='automation' -t @crossbrowser"]
    end

    desc 'Run test on browser stak grid'
        Cucumber::Rake::Task.new :run_features do |t|
        t.cucumber_opts = "env=automation crossbrowser=true #{extra_args} -t @crossbrowser -f pretty"
    end
end

desc 'Run regression and rerun failed tests'
task :default, [:extra_args] do | t, args |

  create_tasks(args[:extra_args])

  first_successful = run_rake_task("first")
  Rake::Task['rerun'].invoke unless first_successful

  default_successful = run_rake_task("regression")
  Rake::Task['rerun'].invoke unless default_successful

  tagged_successful = run_rake_task("tagged_javascript")
  Rake::Task['tagged_javascript_rerun'].invoke unless tagged_successful

end

desc 'Run local acceptance tests'
task :local, [:extra_args] do | t, args |
  ENV['env'] = "stubbed"
  create_tasks(args[:extra_args])
      default_successful = run_rake_task("local")
  Rake::Task['rerun'].invoke unless default_successful
end

desc 'Run cucumber crossbrowser'
task :cucumber do
    Parallel.each(@browsers, :in_processes => @parallel_limit) do |browser|
        begin
            puts "Running with: #{browser.inspect}"
            ENV['SELENIUM_BROWSER'] = browser['browser']
            ENV['SELENIUM_VERSION'] = browser['browser_version']
            ENV['BS_AUTOMATE_OS'] = browser['os']
            ENV['BS_AUTOMATE_OS_VERSION'] = browser['os_version']
            ENV['SELENIUM_PLATFORM'] = browser['platform']
            ENV['SELENIUM_DEVICE'] = browser['browserName']
            ENV['SELENIUM_DEVICE_ID'] = browser['device']
            ENV['BS_REPORT'] = browser['BS_REPORT']

            Rake::Task[:run_features].execute()
        rescue Exception => e
            puts "Error while running task"
        end
    end
end

desc 'Crossbrowser regression tests'
task :cross => [:cucumber]


desc 'Crossbrowser regression and env setup'
task :crossbrowser, [:extra_args] do |t, args|
    create_tasks(args[:extra_args])
    run_rake_task("cross")
end

desc 'Run regression with tags passed in from Team City'
task :open, [:extra_args] do | t, args |
    create_tasks(args[:extra_args])
    run_rake_task("no_tags")
end
