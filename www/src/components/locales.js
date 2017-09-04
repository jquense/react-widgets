var Globalize = require('globalize')

Globalize.load(
	require('cldr-data/main/en/ca-gregorian.json'),
	require('cldr-data/main/en/currencies.json'),
	require('cldr-data/main/en/dateFields.json'),
	require('cldr-data/main/en/numbers.json'),

  require('cldr-data/main/en-GB/ca-gregorian.json'),
	require('cldr-data/main/en-GB/currencies.json'),
	require('cldr-data/main/en-GB/dateFields.json'),
	require('cldr-data/main/en-GB/numbers.json'),

  require('cldr-data/main/fr/ca-gregorian.json'),
	require('cldr-data/main/fr/currencies.json'),
	require('cldr-data/main/fr/dateFields.json'),
	require('cldr-data/main/fr/numbers.json'),

  require('cldr-data/main/es/ca-gregorian.json'),
	require('cldr-data/main/es/currencies.json'),
	require('cldr-data/main/es/dateFields.json'),
	require('cldr-data/main/es/numbers.json'),

  require('cldr-data/main/ar-AE/ca-gregorian.json'),
	require('cldr-data/main/ar-AE/currencies.json'),
	require('cldr-data/main/ar-AE/dateFields.json'),
	require('cldr-data/main/ar-AE/numbers.json'),

  require('cldr-data/supplemental/numberingSystems.json'),
	require('cldr-data/supplemental/currencyData.json'),
	require('cldr-data/supplemental/likelySubtags.json'),
	require('cldr-data/supplemental/timeData.json'),
	require('cldr-data/supplemental/weekData.json')
);

Globalize.locale('en')

require('react-widgets-globalize')()
