import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-overlays/lib/Transition';
import css from 'dom-helpers/style';
import getHeight from 'dom-helpers/query/height';

const propTypes = {
  in: PropTypes.bool.isRequired,
  onEntering: PropTypes.func,
};

class SlideDownTransition extends React.Component {
  handleEntering = () => {
    if (this.props.onEntering)
      this.props.onEntering();
  }

  setContainerHeight = (elem) => {
    elem.style.height = this.getHeight() + 'px';
  }

  clearContainerHeight = (elem) => {
    elem.style.height = '';
  }

  getHeight() {
    let container = this.element
    let content = container.firstChild
    let margin = parseInt(css(content, 'margin-top'), 10)
               + parseInt(css(content, 'margin-bottom'), 10);

    let old = container.style.display
    let height;

    container.style.display = 'block'
    height = (
      (getHeight(content) || 0) +
      (isNaN(margin) ? 0 : margin)
    );
    container.style.display = old
    return height
  }

  render() {
    const { children, className } = this.props;

    return (
      <Transition
        transitionAppear
        in={this.props.in}
        className="rw-transition-slide"
        enteringClassName="rw-transition-slide-entering"
        exitingClassName="rw-transition-slide-exiting"
        exitedClassName="rw-transition-slide-exited"
        onEnter={this.setContainerHeight}
        onEntering={this.handleEntering}
        onExit={this.setContainerHeight}
        onExited={this.clearContainerHeight}
      >
        <div
          ref={r => this.element = r}
          className={className}
        >
          <div className='rw-popup-animation-box'>
            {children}
          </div>
        </div>
      </Transition>
    );
  }
}

SlideDownTransition.propTypes = propTypes;

export default SlideDownTransition
