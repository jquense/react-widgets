import * as React from 'react'
import { ReactNode, useMemo } from 'react'
import { message } from './util/PropTypes';

type LabelMessage = string | ((ctx: any) => string)
type RenderableMessage = ReactNode | (() => ReactNode)

export interface Messages {
  moveToday: LabelMessage
  moveBack: LabelMessage
  moveForward: LabelMessage

  dateButton: LabelMessage
  timeButton: LabelMessage

  openCombobox: LabelMessage
  openDropdown: LabelMessage

  placeholder: LabelMessage

  emptyList: RenderableMessage
  emptyFilter: RenderableMessage

  createOption: (_value: any, searchTerm: string) => ReactNode | ReactNode

  tagsLabel: LabelMessage
  removeLabel: LabelMessage
  noneSelected: LabelMessage
  selectedItems: (labels: string[]) => string

  // number
  increment: LabelMessage
  decrement: LabelMessage
}

const messages = {
  moveToday: 'Today',
  moveBack: 'Navigate back',
  moveForward: 'Navigate forward',

  dateButton: 'Select date',
  timeButton: 'Select time',

  openCombobox: 'open combobox',
  openDropdown: 'open dropdown',

  placeholder: '',
  filterPlaceholder: '',

  emptyList: 'There are no items in this list',
  emptyFilter: 'The filter returned no results',

  createOption: (_value: any, searchTerm: string) => [
    ' Create option',
    searchTerm && ' ',
    searchTerm && <strong key="_">{`"${searchTerm}"`}</strong>,
  ],

  tagsLabel: 'Selected items',
  removeLabel: 'Remove selected item',
  noneSelected: 'no selected items',
  selectedItems: (labels: string[]) => `Selected items: ${labels.join(', ')}`,

  // number
  increment: 'Increment value',
  decrement: 'Decrement value',
}

export type UserProvidedMessages = Partial<Messages>

export type ProcessedMessages = {
  [P in keyof Messages]: Messages[P] extends Function
    ? Messages[P]
    : () => string
}

const DEFAULTS = {}

export function getMessages(defaults: UserProvidedMessages = DEFAULTS) {
  let processed = {} as ProcessedMessages;
  Object.keys(messages).forEach((message : keyof Messages) => {
    let value = defaults[message]
    if (value == null) value = messages[message]

    processed[message] = typeof value === 'function' ? (value as ()=> string) : () => (value as string)
  })

  return processed
}

export const useMessagesWithDefaults = (defaults?: UserProvidedMessages) =>
  useMemo(() => getMessages(defaults), [defaults])
