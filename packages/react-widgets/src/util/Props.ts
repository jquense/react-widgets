const whitelist = [
  'style',
  'className',
  'role',
  'id',
  'autocomplete',
  'size',
  'tabIndex',
  'maxLength',
  'name',
]

const whitelistRegex = [/^aria-/, /^data-/, /^on[A-Z]\w+/]

export function pickElementProps(props) {
  const result = {}
  Object.keys(props).forEach(key => {
    if (
      whitelist.indexOf(key) !== -1 ||
      whitelistRegex.some(r => !!key.match(r))
    )
      result[key] = props[key]
  })

  return result
}
