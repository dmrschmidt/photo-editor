feature "Feedback Prompt Display" do
  scenario "home page displays prompt" do
    visit '/index.html'
    within("#prompt") do
      expect(page.text).not_to be_empty
      expect(page).not_to have_content 'thinking'
    end
  end
end
