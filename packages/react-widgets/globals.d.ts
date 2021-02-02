/* eslint-disable no-inner-declarations */

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: NonNullable<Base[Key]> extends Condition ? Key : never
}
type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base]

declare namespace Intl {
  interface DateTimeFormatOptions {
    dateStyle?: 'short' | 'medium' | 'full'
    timeStyle?: 'short' | 'medium' | 'full'
  }
}

declare module 'date-arithmetic' {
  export type DateUnit =
    | 'second'
    | 'minutes'
    | 'hours'
    | 'day'
    | 'week'
    | 'month'
    | 'year'
    | 'decade'
    | 'century'

  /** Add specified amount of units to a provided date and return new date as a result */
  export function add(date: Date, num: number, unit: DateUnit): Date

  export function min(...dates: Date[]): Date

  export function max(...dates: Date[]): Date

  export function startOf(
    date: Date | null | number,
    unit: DateUnit,
    firstOfWeek?: number,
  ): Date

  export function endOf(date: Date, unit: DateUnit, firstOfWeek?: number): Date

  export function milliseconds(date: Date, value: number): Date
  export function milliseconds(date: Date): number

  export function seconds(date: Date, value: number): Date
  export function seconds(date: Date): number

  export function minutes(date: Date, value: number): Date
  export function minutes(date: Date): number

  export function hours(date: Date, value: number): Date
  export function hours(date: Date): number

  export function day(date: Date, value: number): Date
  export function day(date: Date): number

  export function date(date: Date, value: number): Date
  export function date(date: Date): number

  export function month(date: Date, value: number): Date
  export function month(date: Date): number

  export function year(date: Date, value: number): Date
  export function year(date: Date): number

  export function decade(date: Date, value: number): Date
  export function decade(date: Date): number

  export function century(date: Date, value: number): Date
  export function century(date: Date): number

  export function inRange(
    day: Date,
    min?: Date,
    max?: Date,
    unit?: DateUnit,
  ): boolean

  /** Subtract specified amount of units from a provided date and return new date as a result */
  export function subtract(
    date: Date | null | number,
    num: number,
    unit: DateUnit,
  ): Date

  /** Compare two dates and return true if they are equal */
  export function eq(
    date?: Date | null | number,
    date2?: Date | null | number,
    unit?: DateUnit,
  ): boolean

  /** Compare two dates and return false if they are equal */
  export function neq(
    date?: Date | null | number,
    date2?: Date | null | number,
    unit?: DateUnit,
  ): boolean

  /** Compare two dates and return true if date is greater than date2 */
  export function gt(
    date?: Date | null | number,
    date2?: Date | null | number,
    unit?: DateUnit,
  ): boolean

  /** Compare two dates and return true if date is greater or equal than date2 */
  export function gte(
    date?: Date | null | number,
    date2?: Date | null | number,
    unit?: DateUnit,
  ): boolean

  /** Compare two dates and return true if date is less than date2 */
  export function lt(
    date?: Date | null | number,
    date2?: Date | null | number,
    unit?: DateUnit,
  ): boolean

  /** Compare two dates and return true if date is less or equal than date2 */
  export function lte(
    date?: Date | null | number,
    date2?: Date | null | number,
    unit?: DateUnit,
  ): boolean
}

declare module 'prop-types-extra/lib/elementType'

declare module 'prop-types-extra/lib/utils/createChainableTypeChecker' {
  import * as PropTypes from 'prop-types'

  export default function createChainableTypeChecker<T>(
    props: PropTypes.Validator<T>,
  ): PropTypes.Validator<T>
}

declare module 'warning' {
  export default function warning(enabled: boolean, message: string): void
}

declare module 'invariant' {
  export default function invariant(
    enabled: boolean,
    message: string,
    other?: string,
  ): void
}
