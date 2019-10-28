import React, { ReactNode, useMemo } from 'react'

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
type Messages = typeof messages

export type UserProvidedMessages = {
  [P in keyof Messages]?: ReactNode | ((...args: any[]) => ReactNode)
}

export type ProcessedMessages = {
  [P in keyof Messages]: Messages[P] extends string
    ? () => ReactNode
    : Messages[P]
}

const DEFAULTS = {}

export function getMessages(defaults: UserProvidedMessages = DEFAULTS) {
  let processed = {}
  Object.keys(messages).forEach(message => {
    let value = defaults[message]
    if (value == null) value = messages[message]

    processed[message] = typeof value === 'function' ? value : () => value
  })

  return processed as ProcessedMessages
}

export const useMessagesWithDefaults = (defaults: UserProvidedMessages) =>
  useMemo(() => getMessages(defaults), [defaults])
