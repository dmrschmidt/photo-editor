function StubRandomizer(stubbedValue) {
  this.stubbedValue = stubbedValue
}
StubRandomizer.prototype.constructor = StubRandomizer
StubRandomizer.prototype.pickWithinRange = function(upperBound) {
  return this.stubbedValue
}

describe("FeedbackFeeder", function() {
  var prompts = ['foo', 'bar']

  it("returns a feedback prompt based on randomizer", function() {
    const alwaysFirstRandomizer = new StubRandomizer(0)
    const feedbackFeeder = new FeedbackFeeder(prompts, alwaysFirstRandomizer)

    expect(feedbackFeeder.feedbackPrompt()).toEqual('foo')
  })

  it("returns a different feedback prompt based on a different randomizer", function() {
    const alwaysSecondRandomizer = new StubRandomizer(1)
    const feedbackFeeder = new FeedbackFeeder(prompts, alwaysSecondRandomizer)

    expect(feedbackFeeder.feedbackPrompt()).toEqual('bar')
  })

  it('restricts randomization to available prompts', function() {
    const randomizer = new StubRandomizer(0)
    const feedbackFeeder = new FeedbackFeeder(prompts, randomizer)
    spyOn(randomizer, 'pickWithinRange').and.callThrough()

    feedbackFeeder.feedbackPrompt()

    expect(randomizer.pickWithinRange).toHaveBeenCalledWith(1)
  })
})
