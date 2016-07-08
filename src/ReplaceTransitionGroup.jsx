/**
 * A streamlined version of TransitionGroup built for managing at most two active children
 * also provides additional hooks for animation start/end
 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
 * relevent code is licensed accordingly
 */
import React from 'react';
import css from 'dom-helpers/style';
import height from 'dom-helpers/query/height';
import width  from 'dom-helpers/query/width';
import compat from './util/compat';
import _ from './util/_';

function getChild(children){
  return React.Children.only(children)
}

function key(child){
  return child && child.key
}

export default React.createClass({

  displayName: 'ReplaceTransitionGroup',

  propTypes: {
    component: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.string
    ]),
    childFactory: React.PropTypes.func,
    onAnimating: React.PropTypes.func,
    onAnimate: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      component: 'span',
      childFactory: a => a,
      onAnimating: _.noop,
      onAnimate: _.noop
    };
  },

  getInitialState() {
    return {
      children: _.splat(this.props.children)
    };
  },

  componentWillReceiveProps(nextProps) {
    var nextChild = getChild(nextProps.children)
      , stack     = this.state.children.slice()
      , next      = stack[1]
      , last      = stack[0];

    var isLastChild = last && key(last) === key(nextChild)
      , isNextChild = next && key(next) === key(nextChild);

    //no children
    if (!last) {
      stack.push(nextChild)
      this.entering = nextChild
    }
    else if ( last && !next && !isLastChild) {
      //new child
      stack.push(nextChild)
      this.leaving  = last
      this.entering = nextChild
    }
    else if ( last && next && !isLastChild && !isNextChild) {
      // the child is not the current one, exit the current one, add the new one
      //  - shift the stack down
      stack.shift()
      stack.push(nextChild)
      this.leaving  = next
      this.entering = nextChild
    }
    //new child that just needs to be re-rendered
    else if (isLastChild) stack.splice(0, 1, nextChild)
    else if (isNextChild) stack.splice(1, 1, nextChild)

    if( this.state.children[0] !== stack[0] || this.state.children[1] !== stack[1] )
      this.setState({ children: stack });
  },

  componentWillMount() {
    this.animatingKeys = {};
    this.leaving  = null;
    this.entering = null;
  },

  componentDidUpdate() {
    var entering = this.entering
      , leaving  = this.leaving
      , first    = this.refs[key(entering) || key(leaving)]
      , node     = compat.findDOMNode(this)
      , el       = first && compat.findDOMNode(first);

    if( el )
      css(node, {
        overflow: 'hidden',
        height: height(el) + 'px',
        width:  width(el) + 'px'
      })

    this.props.onAnimating();

    this.entering = null;
    this.leaving  = null;

    if (entering) this.performEnter(key(entering))
    if (leaving)  this.performLeave(key(leaving))
  },

  performEnter(key) {
    var component = this.refs[key]

    if(!component) return

    this.animatingKeys[key] = true

    if (component.componentWillEnter)
      component.componentWillEnter(
        this._handleDoneEntering.bind(this, key))
    else
      this._handleDoneEntering(key)
  },

  _tryFinish() {

    if (this.isTransitioning())
      return

    if ( this.isMounted() )
      css(compat.findDOMNode(this), { overflow: 'visible', height: '', width: '' })

    this.props.onAnimate()
  },

  _handleDoneEntering(enterkey) {
    var component = this.refs[enterkey];

    if (component && component.componentDidEnter)
      component.componentDidEnter()

    delete this.animatingKeys[enterkey]

    if ( key(this.props.children) !== enterkey)
      this.performLeave(enterkey) // This was removed before it had fully entered. Remove it.

    this._tryFinish()
  },

  performLeave(key) {
    var component = this.refs[key]

    if(!component) return

    this.animatingKeys[key] = true

    if (component.componentWillLeave)
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    else
      this._handleDoneLeaving(key)
  },

  _handleDoneLeaving(leavekey) {
    var component = this.refs[leavekey];

    if (component && component.componentDidLeave)
      component.componentDidLeave()

    delete this.animatingKeys[leavekey]

    if (key(this.props.children) === leavekey )
      this.performEnter(leavekey) // This entered again before it fully left. Add it again.

    else if (this.isMounted())
      this.setState({
        children: this.state.children.filter( c => key(c) !== leavekey)
      })

    this._tryFinish()
  },
  
  isTransitioning() {
    return !!Object.keys(this.animatingKeys).length
  },

  render() {
    var Component = this.props.component;

    return (
      <Component {..._.omitOwnProps(this)}>
        {this.state.children.map(c => this.props.childFactory(c, key(c)))}
      </Component>
    );
  }
});
