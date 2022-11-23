import cn from 'clsx'
import React from 'react'
import SlideDownTransition from './SlideDownTransition'
import { TransitionProps } from 'react-transition-group/Transition'

export interface StaticContainerProps {
  children: React.ReactNode
  shouldUpdate?: boolean
}

export const StaticContainer = React.memo(
  ({ children }: StaticContainerProps) => children as React.ReactElement,
  (_, { shouldUpdate }: StaticContainerProps) => !shouldUpdate,
)

export interface PopupProps {
  className?: string
  open?: boolean
  dropUp?: boolean
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
  onExiting?: () => void
  transition?: React.ComponentType<TransitionProps>
  role?: string
  id?: string
  children: React.ReactNode
  [prop: string]: unknown
}

const Popup = React.forwardRef(
  (
    {
      id,
      role,
      dropUp,
      className,
      children,
      open = false,
      transition = SlideDownTransition as any,
      ...props
    }: PopupProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const Transition = transition!

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
  },
)

Popup.displayName = 'Popup'

export default Popup
