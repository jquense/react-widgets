import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import SlideDownTransition, { SlideDownTransitionProps } from './SlideDownTransition'
import { elementType } from './util/PropTypes'
import { TransitionProps } from 'react-transition-group/Transition'

interface StaticContainerProps {
  children : React.ReactNode;
  shouldUpdate? : boolean;
}

const StaticContainer = React.memo(
  ({ children }: StaticContainerProps) => children as React.ReactElement, 
  (_, { shouldUpdate } : StaticContainerProps) => !shouldUpdate,
);

const defaultProps = {
  open: false,
  transition: SlideDownTransition,
}

const propTypes = {
  open: PropTypes.bool,
  dropUp: PropTypes.bool,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  transition: elementType,
  role: PropTypes.string,
  id: PropTypes.string,
}

export interface PopupProps extends TransitionProps {
  className?: string;
  open?: boolean;
  dropUp?: boolean;
  onEntering?: ()=> void;
  onEntered?: ()=> void;
  transition?: React.ComponentType<TransitionProps>;
  role?: string;
  id?: string;
  children: React.ReactNode;
}

const Popup = React.forwardRef(
  (
    {
      className,
      dropUp,
      open,
      role,
      id,
      transition,
      children,
      ...props
    } : PopupProps,
    ref : React.Ref<HTMLDivElement>,
  ) => {

    const Transition = transition!;

    return (
      <Transition
        {...props}
        in={open}
        dropUp={dropUp}
        timeout={undefined! /**hack*/}
        className={cn('rw-popup-container', className)}
      >
        <div id={id} className="rw-popup" ref={ref} role={role}>
          <StaticContainer shouldUpdate={open}>{children}</StaticContainer>
        </div>
      </Transition>
    )
  }
);

(Popup as any).displayName = 'Popup';
(Popup as any).propTypes = propTypes;
(Popup as any).defaultProps = defaultProps;

export default Popup
