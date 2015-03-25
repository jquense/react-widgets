var React = require('react')
  , Btn = require('./WidgetButton')
  , dates = require('./util/dates');

module.exports = React.createClass({

    displayName: 'Footer',

    render() {
      var now = this.props.value
        , formatted = dates.format(
            now
          , this.props.format
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
