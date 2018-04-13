namespace :git do
  desc 'Checks for uncommitted changes and aborts if any are found'
  task :check_for_uncommitted_changes do
    puts 'Checking for uncommitted changes...'
    if `git status -s`.chomp.length > 0
      system('git status')
      puts 'Uncommitted changes detected (maybe something got auto-corrected?). Please commit these and try again.'
      abort
    end
    puts 'Done!'
  end

  desc 'Pushes the current branch to origin'
  task :push do
    system('git push origin head') || abort
  end
end
