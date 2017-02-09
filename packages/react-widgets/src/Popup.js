import cn from 'classnames';
import React, { cloneElement } from 'react';

import SlideDownTransition from './SlideDownTransition';

class Popup extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool,
    dropUp: React.PropTypes.bool,
    onOpening: React.PropTypes.func,
  };

  static defaultProps = {
    open: false,
  };

  render() {
    let { className, dropUp, open, onOpening, onOpened, ...props } = this.props

    let child = React.Children.only(this.props.children)

    return (
      <SlideDownTransition
        {...props}
        in={open}
        onEntered={onOpened}
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

// function childKey(children){
//   var nextChildMapping = React.Children.map(children, c => c );
//   for(var key in nextChildMapping) return key
// }
