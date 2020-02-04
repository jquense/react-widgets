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

export function pickElementProps<T>(props: T): Partial<T> {
  const result: Partial<T> = {}
  Object.keys(props).forEach(key => {
    if (
      whitelist.indexOf(key) !== -1 ||
      whitelistRegex.some(r => !!key.match(r))
    )
      (result as any)[key] = (props as any)[key]
  })

  return result
}
