import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

interface Props extends Omit<React.HTMLProps<HTMLDivElement>, 'onSelect'> {
  component?: React.ElementType
}

const propTypes = {
  className: PropTypes.string,
  component: PropTypes.string,
}

function ListOptionGroup({ children, className, component = 'div' }: Props) {
  let Tag = component
  return (
    <Tag
      tabIndex="-1"
      role="separator"
      className={cn(className, 'rw-list-optgroup')}
    >
      {children}
    </Tag>
  )
}

ListOptionGroup.propTypes = propTypes

export default ListOptionGroup
