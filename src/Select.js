import React from 'react';
import cn from 'classnames';

import Button from './Button';

class Select extends React.Component {

  render() {
    let { className, ...props } = this.props;

    return (
      <Button
        {...props}
        className={cn(
          className,
          'rw-select',
        )}
      />
    )
  }
}

export default Select;
