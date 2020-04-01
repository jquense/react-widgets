delete require.cache[require.resolve('../src/_')]

var React = require('react'),
  filters = require('../src/Filter').presets,
  propTypes = require('../src/PropTypes')

describe('when using array filter helpers', function() {
  it('should match correctly', function() {
    expect(filters.eq(1, 1)).to.equal(true)
    expect(filters.contains([1, 2], 1)).to.equal(true)
    expect(filters.contains('hello', 'll')).to.equal(true)
    expect(filters.startsWith('hello', 'hel')).to.equal(true)
  })
})

describe('when using custom PropTypes', function() {
  it('should concat names', function() {
    var props = { type: 'span' }

    expect(propTypes.elementType(props, 'type', 'component')).to.equal(null)

    props.type = function() {}

    expect(propTypes.elementType(props, 'type', 'component')).to.equal(null)

    props.type = React.createElement('span')

    expect(propTypes.elementType(props, 'type', 'component')).to.be.an('error')

    props.type = true
    expect(propTypes.elementType(props, 'type', 'component')).to.be.an('error')
  })
})
