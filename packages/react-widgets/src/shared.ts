import React, {
  AnimationEventHandler,
  ComponentType,
  DragEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactNode,
  Ref,
  SyntheticEvent,
  TouchEventHandler,
  TransitionEventHandler,
  UIEventHandler,
  WheelEventHandler,
} from 'react'

import { DateFormats, Localizer } from './Localization'
import { UserProvidedMessages } from './messages'
import { SearchMetadata, Value } from './types'
import { Filter } from './Filter'
import { TransitionProps } from 'react-transition-group/Transition'
import {
  ListProps,
  ListHandle,
  GroupBy,
  OptionComponentProp,
  RenderGroupProp,
  RenderItemProp,
} from './List'
import { TextAccessor, DataKeyAccessor } from './Accessors'

export interface WidgetProps {
  isRtl?: boolean
  className?: string
  tabIndex?: number
  id?: string
  autoFocus?: boolean
  messages?: UserProvidedMessages
}

/**
 * Smaller subset of relevant HTML attributes that make sense for the container
 */
export interface WidgetHTMLProps<T = HTMLDivElement>
  extends React.AriaAttributes {
  suppressContentEditableWarning?: boolean
  suppressHydrationWarning?: boolean

  // Standard HTML Attributes
  accessKey?: string
  className?: string
  contextMenu?: string
  dir?: string
  hidden?: boolean
  id?: string
  lang?: string
  style?: React.CSSProperties
  tabIndex?: number
  title?: string
  role?: string

  // events
  onFocus?: FocusEventHandler<T>
  onFocusCapture?: FocusEventHandler<T>
  onBlur?: FocusEventHandler<T>
  onBlurCapture?: FocusEventHandler<T>

  onKeyDown?: KeyboardEventHandler<T>
  onKeyDownCapture?: KeyboardEventHandler<T>
  onKeyPress?: KeyboardEventHandler<T>
  onKeyPressCapture?: KeyboardEventHandler<T>
  onKeyUp?: KeyboardEventHandler<T>
  onKeyUpCapture?: KeyboardEventHandler<T>
  onAuxClick?: MouseEventHandler<T>
  onAuxClickCapture?: MouseEventHandler<T>
  onClick?: MouseEventHandler<T>
  onClickCapture?: MouseEventHandler<T>
  onContextMenu?: MouseEventHandler<T>
  onContextMenuCapture?: MouseEventHandler<T>
  onDoubleClick?: MouseEventHandler<T>
  onDoubleClickCapture?: MouseEventHandler<T>
  onDrag?: DragEventHandler<T>
  onDragCapture?: DragEventHandler<T>
  onDragEnd?: DragEventHandler<T>
  onDragEndCapture?: DragEventHandler<T>
  onDragEnter?: DragEventHandler<T>
  onDragEnterCapture?: DragEventHandler<T>
  onDragExit?: DragEventHandler<T>
  onDragExitCapture?: DragEventHandler<T>
  onDragLeave?: DragEventHandler<T>
  onDragLeaveCapture?: DragEventHandler<T>
  onDragOver?: DragEventHandler<T>
  onDragOverCapture?: DragEventHandler<T>
  onDragStart?: DragEventHandler<T>
  onDragStartCapture?: DragEventHandler<T>
  onDrop?: DragEventHandler<T>
  onDropCapture?: DragEventHandler<T>
  onMouseDown?: MouseEventHandler<T>
  onMouseDownCapture?: MouseEventHandler<T>
  onMouseEnter?: MouseEventHandler<T>
  onMouseLeave?: MouseEventHandler<T>
  onMouseMove?: MouseEventHandler<T>
  onMouseMoveCapture?: MouseEventHandler<T>
  onMouseOut?: MouseEventHandler<T>
  onMouseOutCapture?: MouseEventHandler<T>
  onMouseOver?: MouseEventHandler<T>
  onMouseOverCapture?: MouseEventHandler<T>
  onMouseUp?: MouseEventHandler<T>
  onMouseUpCapture?: MouseEventHandler<T>

  // Touch Events
  onTouchCancel?: TouchEventHandler<T>
  onTouchCancelCapture?: TouchEventHandler<T>
  onTouchEnd?: TouchEventHandler<T>
  onTouchEndCapture?: TouchEventHandler<T>
  onTouchMove?: TouchEventHandler<T>
  onTouchMoveCapture?: TouchEventHandler<T>
  onTouchStart?: TouchEventHandler<T>
  onTouchStartCapture?: TouchEventHandler<T>

  // Pointer Events
  onPointerDown?: PointerEventHandler<T>
  onPointerDownCapture?: PointerEventHandler<T>
  onPointerMove?: PointerEventHandler<T>
  onPointerMoveCapture?: PointerEventHandler<T>
  onPointerUp?: PointerEventHandler<T>
  onPointerUpCapture?: PointerEventHandler<T>
  onPointerCancel?: PointerEventHandler<T>
  onPointerCancelCapture?: PointerEventHandler<T>
  onPointerEnter?: PointerEventHandler<T>
  onPointerEnterCapture?: PointerEventHandler<T>
  onPointerLeave?: PointerEventHandler<T>
  onPointerLeaveCapture?: PointerEventHandler<T>
  onPointerOver?: PointerEventHandler<T>
  onPointerOverCapture?: PointerEventHandler<T>
  onPointerOut?: PointerEventHandler<T>
  onPointerOutCapture?: PointerEventHandler<T>
  onGotPointerCapture?: PointerEventHandler<T>
  onGotPointerCaptureCapture?: PointerEventHandler<T>
  onLostPointerCapture?: PointerEventHandler<T>
  onLostPointerCaptureCapture?: PointerEventHandler<T>

  // UI Events
  onScroll?: UIEventHandler<T>
  onScrollCapture?: UIEventHandler<T>

  // Wheel Events
  onWheel?: WheelEventHandler<T>
  onWheelCapture?: WheelEventHandler<T>

  // Animation Events
  onAnimationStart?: AnimationEventHandler<T>
  onAnimationStartCapture?: AnimationEventHandler<T>
  onAnimationEnd?: AnimationEventHandler<T>
  onAnimationEndCapture?: AnimationEventHandler<T>
  onAnimationIteration?: AnimationEventHandler<T>
  onAnimationIterationCapture?: AnimationEventHandler<T>

  // Transition Events
  onTransitionEnd?: TransitionEventHandler<T>
  onTransitionEndCapture?: TransitionEventHandler<T>
}

export interface PopupWidgetProps {
  open?: boolean
  defaultOpen?: boolean
  onToggle?: (isOpen: boolean) => void

  className?: string
  containerClassName?: string

  dropUp?: boolean
  popupTransition?: React.ComponentType<TransitionProps>

  onKeyPress?: KeyboardEventHandler<HTMLDivElement>
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>
}

export type SearchHandler = (
  searchTerm: string,
  metadata: SearchMetadata,
) => void

export interface Searchable {
  searchTerm?: string
  defaultSearchTerm?: string
  onSearch?: SearchHandler
}

export type AllowCreate = boolean | 'onFilter'

export interface Filterable<TDataItem> {
  filter?: Filter<TDataItem>
  minLength?: number
  allowCreate?: AllowCreate
  caseSensitive?: boolean
  delay?: number
}

export type ChangeHandler<TDataItem> = (
  dataItem: TDataItem,
  metadata: {
    searchTerm?: string
    lastValue: Value
    originalEvent?: SyntheticEvent
  },
) => void

export type MultipleChangeHandler<TDataItem> = (
  dataItem: TDataItem[],
  metadata: {
    action: 'insert' | 'remove'
    dataItem: TDataItem
    searchTerm?: string
    lastValue: Value
    originalEvent?: React.SyntheticEvent
  },
) => void

export type SelectHandler<TDataItem> = (
  dataItem: TDataItem,
  metadata: { originalEvent?: SyntheticEvent },
) => void

export interface BaseListboxInputProps<TDataItem, TValue = Value> {
  data?: TDataItem[]
  textField?: TextAccessor
  dataKey?: DataKeyAccessor

  value?: TValue
  defaultValue?: TValue
  onChange?: ChangeHandler<TDataItem>

  defaultFocusedItem?: TDataItem

  onSelect?: SelectHandler<TDataItem>

  placeholder?: string

  focusFirstItem?: boolean

  busy?: boolean
  busySpinner?: ReactNode

  disabled?: boolean | Array<TDataItem>
  readOnly?: boolean

  selectIcon?: ReactNode

  inputProps?: object
  listProps?: object

  renderListItem?: RenderItemProp<TDataItem>
  renderListGroup?: RenderGroupProp
  optionComponent?: OptionComponentProp
  groupBy?: GroupBy<TDataItem>
  listComponent?: ComponentType<ListProps<TDataItem> & { ref: Ref<ListHandle> }>
}

export interface DateLocalizationProps<
  TLocalizer = unknown,
  TFormat = TLocalizer extends Localizer<infer TFormat, any> ? TFormat : unknown
> {
  formats?: DateFormats<TFormat>
}

export interface NumberLocalizationProps<
  TLocalizer = unknown,
  TFormat = TLocalizer extends Localizer<any, infer TFormat> ? TFormat : unknown
> {
  formats?: DateFormats<TFormat>
}
