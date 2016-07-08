import React  from 'react';
import ReplaceTransitionGroup  from './ReplaceTransitionGroup';
import compat from './util/compat';
import css from 'dom-helpers/style';
import getWidth from 'dom-helpers/query/width';
import config from './util/configuration';
import _ from './util/_';

var SlideChildGroup = React.createClass({

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right']),
    duration:  React.PropTypes.number
  },

  componentWillEnter(done) {
    var node  = compat.findDOMNode(this)
      , width = getWidth(node)
      , direction = this.props.direction;

    width = direction === 'left' ? width : -width

    this.ORGINAL_POSITION = node.style.position;

    css(node, { position: 'absolute', left: width + 'px', top: 0 })

    config.animate(node, { left: 0 }, this.props.duration, () => {

        css(node, {
          position:  this.ORGINAL_POSITION,
          overflow: 'hidden'
        });

        this.ORGINAL_POSITION = null
        done && done()
      })
  },

  componentWillLeave(done) {
    var node  = compat.findDOMNode(this)
      , width = getWidth(node)
      , direction = this.props.direction;

    width = direction === 'left' ? -width : width

    this.ORGINAL_POSITION = node.style.position

    css(node, { position: 'absolute', top: 0, left: 0})

    config.animate(node, { left: width + 'px' }, this.props.duration, () => {
        css(node, {
          position: this.ORGINAL_POSITION,
          overflow: 'hidden'
        });

        this.ORGINAL_POSITION = null
        done && done()
      })
  },

  render() {
    return React.Children.only(this.props.children);
  }
})


module.exports = React.createClass({

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right']),
    duration:  React.PropTypes.number
  },

  getDefaultProps(){
    return {
      direction: 'left',
      duration: 250
    }
  },

  _wrapChild(child, ref) {
    return (
      <SlideChildGroup key={child.key} ref={ref}
        direction={this.props.direction}
        duration={this.props.duration}>
        {child}
      </SlideChildGroup>)
  },

  render() {
    var { style, children } = this.props

    style = {
      ...style,
      position: 'relative',
      overflow: 'hidden'
    };

    return (
      <ReplaceTransitionGroup
        {..._.omitOwnProps(this)}
        ref='container'
        component={'div'}
        childFactory={this._wrapChild}
        style={style}
      >
        { children }
      </ReplaceTransitionGroup>
    )
  }
});
