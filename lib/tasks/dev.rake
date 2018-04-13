namespace :dev do
  desc 'runs a local dev server'
  task :server do
    system('ruby -run -e httpd . -p 9090')
  end
end
