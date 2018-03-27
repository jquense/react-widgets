import PropTypes from 'prop-types'
import React from 'react'

const Fragment = React.Fragment || 'div'
const propTypes = {
  text: PropTypes.string,
  searchTerm: PropTypes.string,
}

function AutocompleteListItem({ text, searchTerm }) {
  if (!text || !searchTerm) return <Fragment>{text}</Fragment>

  let idx = text.indexOf(searchTerm)
  if (idx === -1) idx = text.toLowerCase().indexOf(searchTerm)
  if (idx === -1 || searchTerm.length >= text.length)
    return <Fragment>{text}</Fragment>

  return (
    <Fragment>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + searchTerm.length)}</strong>
      {text.slice(idx + searchTerm.length)}
    </Fragment>
  )
}

AutocompleteListItem.propTypes = propTypes

export default AutocompleteListItem
