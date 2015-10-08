import React from 'react';
import Btn from './WidgetButton';

export default React.createClass({
  displayName: 'Header',
  propTypes: {
    label:          React.PropTypes.string.isRequired,
    labelId:        React.PropTypes.string,

    upDisabled:     React.PropTypes.bool.isRequired,
    prevDisabled:   React.PropTypes.bool.isRequired,
    nextDisabled:   React.PropTypes.bool.isRequired,
    onViewChange:   React.PropTypes.func.isRequired,
    onMoveLeft:     React.PropTypes.func.isRequired,
    onMoveRight:    React.PropTypes.func.isRequired,

    messages:       React.PropTypes.shape({
      moveBack:     React.PropTypes.string,
      moveForward:  React.PropTypes.string
    })
  },

  mixins: [
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlChildContextMixin')
  ],

  getDefaultProps(){
    return {
      messages: {
        moveBack:     'navigate back',
        moveForward:  'navigate forward'
      }
    }
  },

  render(){
    let {
        messages, label, labelId
      , onMoveRight, onMoveLeft, onViewChange
      , prevDisabled, upDisabled, nextDisabled } = this.props;

    let rtl = this.isRtl();

    return (
      <div className='rw-header'>
        <Btn className="rw-btn-left"
          tabIndex='-1'
          onClick={onMoveLeft}
          disabled={prevDisabled}
          aria-disabled={prevDisabled}
          aria-label={messages.moveBack}
          title={messages.moveBack}
        >
          <i aria-hidden='false'
            className={'rw-i rw-i-caret-' + (rtl ? 'right' : 'left')}
          />
        </Btn>
        <Btn
          id={labelId}
          tabIndex='-1'
          className="rw-btn-view"
          disabled={upDisabled}
          aria-disabled={upDisabled}
          aria-live="polite"
          aria-atomic="true"
          onClick={onViewChange}
        >
          { label }
        </Btn>
        <Btn className="rw-btn-right"
          tabIndex='-1'
          onClick={onMoveRight}
          disabled={nextDisabled}
          title={messages.moveForward}
          aria-label={messages.moveForward}
          aria-disabled={nextDisabled}
        >
          <i aria-hidden='false'
            className={'rw-i rw-i-caret-' + (rtl ? 'left' : 'right')}
          />
        </Btn>
      </div>
    )
  }
})
