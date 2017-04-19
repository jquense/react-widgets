import React  from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import css from 'dom-helpers/style';
import animate from 'dom-helpers/transition/animate';
import getWidth from 'dom-helpers/query/width';
import getHeight from 'dom-helpers/query/height';

import ReplaceTransitionGroup  from './ReplaceTransitionGroup';
import * as Props from './util/Props';

let TRANSFORM_MAP = {
  left: 'translateX', right: 'translateX',
  top: 'translateY', bottom: 'translateY'
};

let getDimension = (node, direction) => ({
  left: getWidth,
  right: n => -getWidth(n),
  top: getHeight,
  bottom: n => -getHeight(n),
}[direction](node))

class SlideChildGroup extends React.Component {
  static propTypes = {
    direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    duration:  PropTypes.number
  };

  componentWillEnter(done) {
    let { duration, direction } = this.props;

    let node = findDOMNode(this)
    let dimension = getDimension(node, direction);
    let transform = TRANSFORM_MAP[direction];

    this.ORGINAL_POSITION = node.style.position;

    css(node, { position: 'absolute', [transform]: dimension + 'px' })

    animate(node, { [transform]: 0 }, duration, () => {
      css(node, {
        position:  this.ORGINAL_POSITION,
        overflow: 'hidden'
      });

      this.ORGINAL_POSITION = null
      done && done()
    })
  }

  componentWillLeave(done) {
    let { duration, direction } = this.props;

    let node = findDOMNode(this)
    let dimension = getDimension(node, direction);
    let transform = TRANSFORM_MAP[direction];

    this.ORGINAL_POSITION = node.style.position

    css(node, { position: 'absolute' })

    animate(node, { [transform]: -dimension + 'px' }, duration, () => {
      css(node, {
        position: this.ORGINAL_POSITION,
        overflow: 'hidden'
      });

      this.ORGINAL_POSITION = null
      done && done()
    })
  }

  render() {
    return React.Children.only(this.props.children);
  }
}


class SlideTransition extends React.Component {

  static propTypes = {
    direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    duration:  PropTypes.number
  };

  static defaultProps = {
    direction: 'left',
    duration: 250,
  };

  _wrapChild = (child, ref) => {
    return (
      <SlideChildGroup key={child.key} ref={ref}
        direction={this.props.direction}
        duration={this.props.duration}>
        {child}
      </SlideChildGroup>
    )
  }

  render() {
    var { style, children } = this.props

    style = {
      ...style,
      position: 'relative',
      overflow: 'hidden'
    };

    return (
      <ReplaceTransitionGroup
        {...Props.omitOwn(this)}
        ref='container'
        component={'div'}
        childFactory={this._wrapChild}
        style={style}
      >
        { children }
      </ReplaceTransitionGroup>
    )
  }
}

export default SlideTransition
