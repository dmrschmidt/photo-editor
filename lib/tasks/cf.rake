namespace :cf do
  desc 'deploys to Cloud Foundry'
  task :deploy do
    system('cf push -f manifest.yml')
  end
end
