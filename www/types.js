
module.exports = {
  accessor: {
    name: 'union',
    value: ['string', '(dataItem?) => string'],
  },
  elementType: {
    name: 'union',
    value: ['ReactComponent', 'string'],
  },
  message: {
    name: 'union',
    value: ['string', '(props?) => string'],
  },
  disabled: {
     name: 'bool'
  },
  'disabled.acceptsArray': {
    name: 'union',
    value: ['bool', 'Array'],
  },
  dateFormat: {
    name: 'union',
    value: ['string', '(value: Date, culture: ?string, localizer: Localizer) => string'],
  },
  numberFormat: {
    name: 'union',
    value: ['string', '(value: number, culture: ?string, localizer: Localizer) => string'],
  },
  views: {
    name: 'enum',
    value: ['month', 'year', 'decade', 'century']
  }
}
