desc 'run tests, push to git and deploy'
task :shipit => [:test, :'git:check_for_uncommitted_changes', :'git:push', :'cf:deploy'] do
  puts 'hellp'
end

task :test => [:'jasmine:ci', :spec] do
  puts 'testing'
end
