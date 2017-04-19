import cn from 'classnames';
import React, { cloneElement } from 'react';

import PropTypes from 'prop-types';

import SlideDownTransition from './SlideDownTransition';

class Popup extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    dropUp: PropTypes.bool,
    onOpening: PropTypes.func,
  };

  static defaultProps = {
    open: false,
  };

  render() {
    let { className, dropUp, open, onOpening, ...props } = this.props

    let child = React.Children.only(this.props.children)

    return (
      <SlideDownTransition
        {...props}
        in={open}
        onEntering={onOpening}
        className={cn(className,
          'rw-popup-container',
          dropUp && 'rw-dropup'
        )}
      >
        {cloneElement(child, {
          className: cn(child.props.className, 'rw-popup')
        })}
      </SlideDownTransition>
    )
  }
}


export default Popup
