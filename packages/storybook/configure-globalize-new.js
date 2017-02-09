var Globalize = require('globalize')
var localizers = require('react-widgets-globalize')

Globalize.load(
	require('cldr-data/main/en/ca-gregorian.json'),
	require('cldr-data/main/en/currencies.json'),
	require('cldr-data/main/en/dateFields.json'),
	require('cldr-data/main/en/numbers.json'),
  require('cldr-data/supplemental/numberingSystems.json'),
	require('cldr-data/supplemental/currencyData.json'),
	require('cldr-data/supplemental/likelySubtags.json'),
	require('cldr-data/supplemental/timeData.json'),
	require('cldr-data/supplemental/weekData.json')
);
Globalize.locale('en')

localizers()

module.exports = Globalize;
