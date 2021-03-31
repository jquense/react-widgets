import React, { useContext, useMemo } from 'react'
import * as IntlLocalizers from './IntlLocalizer'
import {
  ProcessedMessages,
  UserProvidedMessages,
  getMessages,
} from './messages'

export type DateTimePartType =
  | 'day'
  | 'dayPeriod'
  | 'era'
  | 'hour'
  | 'literal'
  | 'minute'
  | 'month'
  | 'second'
  | 'weekday'
  | 'year'
  | 'millisecond'

export type DateTimePart = { type: DateTimePartType; value: string }

export type RequiredDateMethods =
  | 'date'
  | 'time'
  | 'datetime'
  | 'header'
  | 'weekday'
  | 'dayOfMonth'
  | 'month'
  | 'year'
  | 'decade'
  | 'century'

export type DateLocalizer<TD> = {
  // toFormattedParts(date: Date, format: any): DateTimePart[]

  parse(dateString: string, format?: TD): Date | null
  firstOfWeek(): number
} & { [Key in RequiredDateMethods]: (date: Date, format?: TD) => string }

export interface NumberLocalizer<TN> {
  parse(numberString: string, format?: TN): number | null

  decimalCharacter(): string

  format(value: number, format?: TN): string
}

export interface Localizer<TD = unknown, TN = unknown> {
  formatOverrides: FormatterOverrides<TD, TN>
  messages: ProcessedMessages

  formatDate(
    value: Date,
    formatter: RequiredDateMethods,
    userFormat?: TD,
  ): string
  // formatDateToParts(value: Date, format: TD): DateTimePart[]

  formatNumber(value: number, userFormat?: TN): string

  parseDate(dateString: string, format?: TD): Date | null
  parseNumber(numberString: string, format?: TN): number | null

  firstOfWeek(): number
  decimalCharacter(): string
}

export type DateFormats<TFormat> = {
  [Key in RequiredDateMethods]?: TFormat
}

export type FormatterOverrides<TD, TN> = DateFormats<TD> & {
  number?: TN
}

function mergeWithDefaults<TD, TN>(
  date?: DateLocalizer<TD>,
  number?: NumberLocalizer<TN>,
  messages?: UserProvidedMessages,
  formatOverrides: FormatterOverrides<TD, TN> = {},
): Localizer<TD, TN> {
  if (!date && !number)
    throw new Error('This component requires a Localizer but none was provided')

  return {
    formatOverrides,
    messages: getMessages(messages),

    formatDate(value: Date, format: RequiredDateMethods, userFormat?: TD) {
      return date![format](value, userFormat ?? this.formatOverrides[format])
    },
    formatNumber(value: number, userFormat?: TN) {
      return number!.format(value, userFormat ?? this.formatOverrides.number)
    },

    parseDate: date!.parse.bind(date),

    parseNumber: number!.parse.bind(number),

    decimalCharacter: number!.decimalCharacter.bind(number),

    firstOfWeek: date!.firstOfWeek.bind(date),
  }
}

const LocalizerContext = React.createContext<Localizer<unknown, unknown>>(
  mergeWithDefaults(
    new IntlLocalizers.DateLocalizer(),
    new IntlLocalizers.NumberLocalizer(),
  ),
)

type ProviderProps = {
  date?: DateLocalizer<any>
  number?: NumberLocalizer<any>
  messages?: UserProvidedMessages
  children?: React.ReactNode
}

const Localization = ({
  date = new IntlLocalizers.DateLocalizer(),
  number = new IntlLocalizers.NumberLocalizer(),
  messages,
  children,
}: ProviderProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localizer = useMemo(() => mergeWithDefaults(date, number, messages), [
    date,
    number,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(messages),
  ])

  return (
    <LocalizerContext.Provider value={localizer}>
      {children}
    </LocalizerContext.Provider>
  )
}

export const useLocalizer = (
  messages?: UserProvidedMessages,
  formats?: FormatterOverrides<any, any>,
) => {
  const localizer = useContext(LocalizerContext)

  return useMemo(() => {
    if (!messages && !formats) return localizer
    return {
      // @ts-ignore
      ...localizer,
      messages: getMessages({ ...localizer.messages, ...messages }),
      formatOverrides: { ...localizer.formatOverrides, ...formats },
    }
  }, [messages, formats, localizer])
}

Localization.useLocalizer = useLocalizer

export default Localization
