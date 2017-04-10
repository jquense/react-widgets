import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from './Button';

class Select extends React.Component {
  static propTypes = {
    bordered: PropTypes.bool,
  }

  render() {
    let { className, bordered, children, ...props } = this.props;

    return (
      <span
        className={cn(
          className,
          'rw-select',
          bordered && 'rw-select-bordered'
        )}
      >
        {children
          ?  React.Children.map(children, child => child &&
              React.cloneElement(child, { variant: 'select' })
            )
          : <Button {...props} variant="select" />}
      </span>
    )
  }
}

export default Select;
