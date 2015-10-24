import React from 'react';
import Btn from './WidgetButton';
import { date as dateLocalizer } from './util/localizers';

var format = props => dateLocalizer.getFormat('footer', props.format)

module.exports = React.createClass({

    displayName: 'Footer',

    render() {
      var now = this.props.value
        , formatted = dateLocalizer.format(
            now
          , format(this.props)
          , this.props.culture);

      return (
        <div className='rw-footer'>
          <Btn tabIndex='-1'
            aria-disabled={!!this.props.disabled}
            aria-readonly={!!this.props.readOnly}
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
            onClick={this.props.onClick.bind(null, now)}
          >{ formatted }</Btn>
        </div>
      );
    }

});
