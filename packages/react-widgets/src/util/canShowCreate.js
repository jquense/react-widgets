export default function allowCreate(
  allowCreate,
  { searchTerm, caseSensitive, data, dataItems, accessors }
) {
  const hasExtactMatch = () => {
    let lower = text => (caseSensitive ? text : text.toLowerCase())
    let eq = v => lower(accessors.text(v)) === lower(searchTerm)

    // if there is an exact match on textFields:
    // "john" => { name: "john" }, don't show
    return dataItems?.some(eq) || data.some(eq)
  }

  return !!(
    (allowCreate === true || (allowCreate === 'onFilter' && searchTerm)) &&
    !hasExtactMatch()
  )
}
