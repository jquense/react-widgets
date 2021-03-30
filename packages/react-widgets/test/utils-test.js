const filters = require('../src/Filter').presets

describe('when using array filter helpers', function () {
  it('should match correctly', function () {
    expect(filters.eq(1, 1)).to.equal(true)
    expect(filters.contains([1, 2], 1)).to.equal(true)
    expect(filters.contains('hello', 'll')).to.equal(true)
    expect(filters.startsWith('hello', 'hel')).to.equal(true)
  })
})
