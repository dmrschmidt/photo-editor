require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

Dir.glob('lib/tasks/*.rake').each { |r| load r}
