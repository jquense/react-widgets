import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default React.createClass({
  displayName: 'Header',
  propTypes: {
    label:          PropTypes.string.isRequired,
    labelId:        PropTypes.string,

    upDisabled:     PropTypes.bool.isRequired,
    prevDisabled:   PropTypes.bool.isRequired,
    nextDisabled:   PropTypes.bool.isRequired,
    onViewChange:   PropTypes.func.isRequired,
    onMoveLeft:     PropTypes.func.isRequired,
    onMoveRight:    PropTypes.func.isRequired,

    messages:       PropTypes.shape({
      moveBack:     PropTypes.string,
      moveForward:  PropTypes.string
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
        <Button
          className="rw-btn-left"
          onClick={onMoveLeft}
          disabled={prevDisabled}
          label={messages.moveBack}
          icon={`caret-${rtl ? 'right' : 'left'}`}
        />
        <Button
          id={labelId}
          onClick={onViewChange}
          className="rw-btn-view"
          disabled={upDisabled}
          aria-live="polite"
          aria-atomic="true"
        >
          { label }
        </Button>
        <Button
          className="rw-btn-right"
          onClick={onMoveRight}
          disabled={nextDisabled}
          label={messages.moveForward}
          icon={`caret-${rtl ? 'left' : 'right'}`}
        />
      </div>
    )
  }
})
