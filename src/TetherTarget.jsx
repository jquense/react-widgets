import React, { PropTypes } from 'react';
import TetherElement from './util/tetherElement';
import compat from './util/compat';

class TetherTarget extends React.Component {

  static propTypes = {
    tethered: PropTypes.node,
    options: PropTypes.object,
    component: PropTypes.node,
  };

  static defaultProps = {
    component: 'div',
  };

  render(){
    const {
      component: Component,
    } = this.props;

    return (
      <Component {... this.props}>
        {this.props.children}
      </Component>
    )
  }

  componentDidMount(){
    const {
      tether,
      options: tetherOptions,
    } = this.props;

    const options = {... tetherOptions, target: compat.findDOMNode(this)};
    this.tethered = new TetherElement(tether, options);
  }

  componentDidUpdate(){
    const {
      tether,
    } = this.props;

    this.tethered.update(tether);
  }

  componentWillUnmount(){
    this.tethered.destroy();
  }
}

export default TetherTarget;
