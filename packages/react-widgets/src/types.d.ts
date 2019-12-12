type Overwrapped<T, U> = Pick<T, Extract<keyof T, keyof U>>

export type DataItem = unknown
export type Value = unknown

export type RenderProp<TArg> = (arg: TArg) => React.ReactNode

export interface WidgetHandle {
  focus(): void
}

export type ElementProps<TProps, TElement> = Omit<
  WidgetHTMLAttributes,
  keyof TProps
> &
  TProps

export type SearchMetadata = {
  action: 'clear' | 'input'
  lastSearchTerm?: string
  originalEvent?: React.SyntheticEvent
}
