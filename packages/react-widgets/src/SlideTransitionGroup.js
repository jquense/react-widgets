import cn from 'classnames';
import events from 'dom-helpers/events';
import css from 'dom-helpers/style';
import getHeight from 'dom-helpers/query/height';
import { transitionDuration, transitionEnd } from 'dom-helpers/transition/properties';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition, { ENTERING, ENTERED, EXITING, EXITED }
  from 'react-transition-group/Transition';
import React  from 'react';
import { findDOMNode } from 'react-dom';

import * as Props from './util/Props';

const DirectionPropType = PropTypes.oneOf(['left', 'right', 'top', 'bottom']);

const transitionStyle = {
  [ENTERING]: { position: 'absolute' },
  [EXITING]: { position: 'absolute' },
}

const transitionClasses = {
  [ENTERED]: 'rw-calendar-transition-entered',
  [ENTERING]: 'rw-calendar-transition-entering',
  [EXITING]: 'rw-calendar-transition-exiting',
  [EXITED]: 'rw-calendar-transition-exited',
}

function parseDuration(node) {
  let str = css(node, transitionDuration)
  let mult = str.indexOf('ms') === -1 ? 1000 : 1
  return parseFloat(str) * mult
}
class SlideTransition extends React.Component {

  static contextTypes = {
    direction: DirectionPropType,
  };

  handleTransitionEnd = (node, done) => {
    let duration = parseDuration(node) || 300

    const handler = () => {
      events.off(node, transitionEnd, handler, false)
      done();
    }

    setTimeout(handler, duration * 1.5);
    events.on(node, transitionEnd, handler, false);
  }

  render() {
    const { children, ...props } = this.props;
    const { direction } = this.context;
    const child = React.Children.only(children);

    return (
      <Transition
        {...props}
        timeout={5000}
        addEndListener={this.handleTransitionEnd}
      >
        {(status, innerProps) => (
          React.cloneElement(child, {
            ...innerProps,
            style: transitionStyle[status],
            className: cn(
              child.props.className,
              'rw-calendar-transition',
              `rw-calendar-transition-${direction}`,
              transitionClasses[status],
            )
          })
        )}
      </Transition>
    )
  }
}


class SlideTransitionGroup extends React.Component {

  static childContextTypes = {
    direction: DirectionPropType,
  }

  static defaultProps = {
    direction: 'left',
  };

  static propTypes = {
    direction: DirectionPropType,
  };

  getChildContext() {
    return { direction: this.props.direction };
  }

  handleEnter = (child) => {
    let node = findDOMNode(this)

    if (!child) return
    const height =  getHeight(child) + 'px';

    css(node, {
      height,
      overflow: 'hidden',
    })
  }

  handleExited = () => {
    let node = findDOMNode(this)
    css(node, { overflow: '', height: '' });
  }

  render() {
    let { children, direction } = this.props

    return (
      <TransitionGroup
        {...Props.omitOwn(this)}
        component='div'
        className="rw-calendar-transition-group"
      >
        <SlideTransition
          key={children.key}
          direction={direction}
          onEnter={this.handleEnter}
          onExited={this.handleExited}
        >
          {children}
        </SlideTransition>
      </TransitionGroup>
    )
  }
}

export default SlideTransitionGroup
