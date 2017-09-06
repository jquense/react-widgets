import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';

import SlideDownTransition from './SlideDownTransition';
import { elementType }from './util/PropTypes';

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
    transition: elementType
  };

  static defaultProps = {
    open: false,
    transition: SlideDownTransition,
  };

  render() {
    let { className, dropUp, open, transition: Transition, ...props } = this.props

    let child = React.Children.only(this.props.children)

    return (
      <Transition
        {...props}
        in={open}
        dropUp={dropUp}
        className={cn(className, 'rw-popup-container')}
      >
        <StaticContainer shouldUpdate={open}>
          {cloneElement(child, {
            className: cn(child.props.className, 'rw-popup')
          })}
        </StaticContainer>
      </Transition>
    )
  }
}


export default Popup
