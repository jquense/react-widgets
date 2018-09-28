const React = require('react')
const globalize = require('globalize')
const Localizer = require('react-widgets-globalize-old')

const Provider = require('react-widgets/lib/LocalizationProvider')
const localizer = new Localizer(globalize, { culture: 'en' })

module.exports = fn => <Provider localizer={localizer}>{fn()}</Provider>
