export type DataItem = unknown
export type Value = unknown

export type RenderProp<TArg> = (arg: TArg) => React.ReactNode

export interface WidgetHandle {
  focus(opts?: FocusOptions): void
}

export type SearchMetadata = {
  action: 'clear' | 'input'
  lastSearchTerm?: string
  originalEvent?: React.SyntheticEvent
}
