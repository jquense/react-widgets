import cn from 'classnames';
import React, { cloneElement } from 'react';

import PropTypes from 'prop-types';

import SlideDownTransition from './SlideDownTransition';

class StaticContainer extends React.Component {
  shouldComponentUpdate = ({ shouldUpdate }) => !!shouldUpdate
  render = () => this.props.children;
}

class Popup extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    dropUp: PropTypes.bool,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
  };

  static defaultProps = {
    open: false,
  };

  render() {
    let { className, dropUp, open, ...props } = this.props

    let child = React.Children.only(this.props.children)

    return (
      <SlideDownTransition
        {...props}
        in={open}
        className={cn(className,
          'rw-popup-container',
          dropUp && 'rw-dropup'
        )}
      >
        <StaticContainer shouldUpdate={open}>
          {cloneElement(child, {
            className: cn(child.props.className, 'rw-popup')
          })}
        </StaticContainer>
      </SlideDownTransition>
    )
  }
}


export default Popup
