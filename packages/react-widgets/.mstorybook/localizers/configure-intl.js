const React = require('react')
const {
  DateLocalizer,
  NumberLocalizer,
} = require('react-widgets/IntlLocalizer')

const Localization = require('react-widgets/Localization').default

const date = new DateLocalizer({ culture: 'en' })
const number = new NumberLocalizer({ culture: 'en' })

module.exports = (fn) => (
  <Localization date={date} number={number}>
    {fn()}
  </Localization>
)
