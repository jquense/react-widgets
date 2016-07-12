import React from 'react';
import Button from './Button';
import { date as dateLocalizer } from './util/localizers';

var format = props => dateLocalizer.getFormat('footer', props.format)

module.exports = React.createClass({

    displayName: 'Footer',

    render() {
      let { disabled, readOnly, value } = this.props;

      return (
        <div className='rw-footer'>
          <Button
            disabled={!!(disabled || readOnly)}
            onClick={this.props.onClick.bind(null, value)}
          >
            {dateLocalizer.format(
              value,
              format(this.props),
              this.props.culture
            )}
          </Button>
        </div>
      );
    }

});
