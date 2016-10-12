import React, { cloneElement } from 'react';
import { mountManager } from 'react-component-managers';

import css from 'dom-helpers/style';
import { transform } from 'dom-helpers/transition/properties';
import getHeight from 'dom-helpers/query/height';
import config from './util/configuration';
import cn from 'classnames';
import compat from './util/compat';

const CLOSING = 0
    , CLOSED = 1
    , OPENING = 2
    , OPEN = 3;

let OVERFLOW = {
  [CLOSED]:  'hidden',
  [CLOSING]: 'hidden',
  [OPENING]: 'hidden'
}

class Popup extends React.Component {
  static propTypes = {
    open:           React.PropTypes.bool,
    dropUp:         React.PropTypes.bool,
    duration:       React.PropTypes.number,

    onClosing:      React.PropTypes.func,
    onOpening:      React.PropTypes.func,
    onClose:        React.PropTypes.func,
    onOpen:         React.PropTypes.func
  };

  static defaultProps = {
    duration:    200,
    open:        false,
    onClosing:   function(){},
    onOpening:   function(){},
    onClose:     function(){},
    onOpen:      function(){}
  };

  constructor(...args) {
    super(...args);
    this.mounted = mountManager(this);
    this.state = {
      initialRender: true,
      status: this.props.open ? OPENING : CLOSED
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contentChanged:
        childKey(nextProps.children) !== childKey(this.props.children)
    })
  }

  componentDidMount() {
    let isOpen = this.state.status === OPENING;

    compat.batchedUpdates(() => {
      this.setState({ initialRender: false })
      if (isOpen) {
        this.open();
      }
    })
  }

  componentDidUpdate(pvProps) {
    var closing =  pvProps.open && !this.props.open
      , opening = !pvProps.open && this.props.open
      , open    = this.props.open
      , status  = this.state.status;

    if (!!pvProps.dropUp !== !!this.props.dropUp) {
      this.cancelNextCallback()
      if (status === OPENING) this.open()
      if (status === CLOSING) this.close()
      return
    }

    if (opening)      this.open()
    else if (closing) this.close()
    else if (open) {
      // this.height() returns a floating point number with the desired height
      // for this popup. Because of potential rounding errors in floating point
      // aritmetic we must allow an error margin when comparing to the current
      // state, otherwise we can end up in an infinite loop where the height
      // is never exactly equal to our target value.
      const height = this.height()
          , diff = Math.abs(height - this.state.height);
      if (isNaN(diff) || diff > 0.1)
        this.setState({ height });
    }
  }

  render() {
    var { className, dropUp, style } = this.props
      , { status, height } = this.state;

    let overflow = OVERFLOW[status] || 'visible'
      , display = status === CLOSED ? 'none' : 'block';

    return (
      <div
        style={{
          display,
          overflow,
          height,
          ...style
        }}
        ref={r => this.element = r}
        className={cn(className,
          'rw-popup-container',
          dropUp && 'rw-dropup',
          this.isTransitioning() && 'rw-popup-animating'
        )}
      >
        {this.renderChildren()}
      </div>
    )
  }

  renderChildren() {
    let offset = this.getOffsetForStatus(this.state.status)
      , child = React.Children.only(this.props.children)

    return (
      <div
        className="rw-popup-animation-box"
        style={offset}
      >
        {cloneElement(child, {
          className: cn(child.props.className, 'rw-popup')
        })}
      </div>
    );
  }

  open() {
    this.cancelNextCallback()
    var el = this.element.firstChild
      , height = this.height();

    this.props.onOpening()

    this.safeSetState({ status: OPENING, height }, () => {
      let offset = this.getOffsetForStatus(OPEN)
        , duration = this.props.duration;

      this.animate(el, offset, duration, 'ease-out', () => {
        this.safeSetState({ status: OPEN }, ()=> {
          this.props.onOpen()
        })
      })
    })
  }

  close() {
    this.cancelNextCallback()
    var el = this.element.firstChild
      , height = this.height();

    this.props.onClosing()

    this.safeSetState({ status: CLOSING, height }, () => {
      let offset = this.getOffsetForStatus(CLOSED)
        , duration = this.props.duration;

      this.animate(el, offset, duration, 'ease-in', () =>
        this.safeSetState({ status: CLOSED }, () => {
          this.props.onClose()
        })
      )
    })
  }

  getOffsetForStatus(status) {
    if (this.state.initialRender)
      return {}
    let { dropUp } = this.props;

    let enter = { [transform]: `translateY(${dropUp ? '100%' : '-100%'})` }
    let leave = { [transform]: `translateY(0)` }

    return {
      [CLOSED]: enter,
      [CLOSING]: leave,
      [OPENING]: enter,
      [OPEN]: leave
    }[status] || {}
  }

  height() {
    var container = this.element
      , content = container.firstChild
      , margin = parseInt(css(content, 'margin-top'), 10)
               + parseInt(css(content, 'margin-bottom'), 10);

    let old = container.style.display
      , height;

    container.style.display = 'block'
    height = (getHeight(content) || 0) + (isNaN(margin) ? 0 : margin)
    container.style.display = old
    return height
  }

  isTransitioning() {
    return this.state.status === OPENING
        || this.state.status === CLOSED
  }

  animate(el, props, dur, easing, cb) {
    this._transition =
      config.animate(el, props, dur, easing, this.setNextCallback(cb))
  }

  cancelNextCallback() {
    if (this._transition && this._transition.cancel) {
      this._transition.cancel()
      this._transition = null
    }
    if (this.nextCallback) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  }

  safeSetState(nextState, callback) {
    if (this.mounted()) {
      this.setState(nextState, this.setNextCallback(callback));
    }
  }

  setNextCallback(callback) {
    let active = true;

    this.nextCallback = (event) => {
      if (active) {
        active = false;
        this.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = () => active = false;
    return this.nextCallback;
  }
}

export default Popup

function childKey(children){
  var nextChildMapping = React.Children.map(children, c => c );
  for(var key in nextChildMapping) return key
}
