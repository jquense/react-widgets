const React = require('react')
const Localizer = require('react-widgets/lib/IntlLocalizer')

const Provider = require('react-widgets/lib/LocalizationProvider').default
const localizer = new Localizer({ culture: 'en' })

module.exports = fn => <Provider localizer={localizer}>{fn()}</Provider>
