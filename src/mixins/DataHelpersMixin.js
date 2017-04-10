import PropTypes from 'prop-types';
import warning from 'warning';
import propTypes from '../util/propTypes';
import * as dataHelpers from '../util/dataHelpers';

export default {

  propTypes: {
    valueField: PropTypes.string,
    textField:  propTypes.accessor
  },

  componentWillMount(){
    warning(false, '`DataHelpersMixin` is deprecated and will be removed in a later version')
  },

  _dataValue(item){
    return dataHelpers.dataValue(item, this.props.valueField)
  },

  _dataText(item){
    return dataHelpers.dataText(item, this.props.textField)
  },

  _dataIndexOf(data, item){
    return dataHelpers.dataIndexOf(data, item, this.props.valueField)
  },

  _valueMatcher(a, b){
    return dataHelpers.valueMatcher(a, b, this.props.valueField)
  },

  _dataItem(data, item){
    return dataHelpers.dataItem(data, item, this.props.valueField)
  }
}
