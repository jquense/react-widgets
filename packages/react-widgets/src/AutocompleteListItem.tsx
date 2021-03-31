import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
  text: PropTypes.string,
  searchTerm: PropTypes.string,
}

function AutocompleteListItem({
  text,
  searchTerm,
}: {
  text: string
  searchTerm: string
}) {
  if (!text || !searchTerm) return text
  let idx = text.indexOf(searchTerm)
  if (idx === -1) idx = text.toLowerCase().indexOf(searchTerm)
  if (idx === -1 || searchTerm.length >= text.length) return text

  return (
    <>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + searchTerm.length)}</strong>
      {text.slice(idx + searchTerm.length)}
    </>
  )
}

AutocompleteListItem.propTypes = propTypes

export default AutocompleteListItem
