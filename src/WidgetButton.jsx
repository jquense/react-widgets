import React from 'react';
import cn from 'classnames';

export default React.createClass({

  render(){
    var { className, children, ...props} = this.props;

    return (
      <button {...props} type='button' className={cn(className, 'rw-btn')}>
        { children }
      </button>
    )
  }
})
