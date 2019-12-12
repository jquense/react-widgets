// import PropTypes from 'prop-types'

// const localePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.func])

// export type Format<TValue, TFormat> =
//   | TFormat
//   | ((date: TValue, localizer: Localizer<any, any>) => string)

// export interface NumberFormats<TFormat> {
//   default: Format<number, TFormat>
// }

// export interface DateFormats<TFormat> {
//   date: Format<Date, TFormat>
//   time: Format<Date, TFormat>
//   datetime: Format<Date, TFormat>
//   header: Format<Date, TFormat>
//   footer: Format<Date, TFormat>
//   weekday: Format<Date, TFormat>
//   dayOfMonth: Format<Date, TFormat>
//   month: Format<Date, TFormat>
//   year: Format<Date, TFormat>
//   decade: Format<Date, TFormat>
//   century: Format<Date, TFormat>
// }

// // export function mergeWithDefaults(
// //   localizer: Localizer,
// //   formatOverrides: Record<string, any>,
// //   messages: ProcessedMessages,
// // ) {
// //   return {
// //     ...localizer,
// //     messages,
// //     parseDate: (value: string, format) =>
// //       localizer.parseDate(
// //         value,
// //         formatOverrides[format] || localizer.dateFormats[format] || format,
// //       ),
// //     formatDate: (value: Date, format) =>
// //       localizer.formatDate(
// //         value,
// //         formatOverrides[format] || localizer.dateFormats[format] || format,
// //       ),
// //     formatNumber: (value: number, format) =>
// //       localizer.formatNumber(
// //         value,
// //         formatOverrides[format] || localizer.numberFormats[format] || format,
// //       ),
// //   }
// // }

// export interface LocalizerConfig<TDateFormat, TNumberFormat = TDateFormat> {
//   propType?: any
//   firstOfWeek?: number
//   dateFormats?: DateFormats<TDateFormat>
//   numberFormats?: NumberFormats<TNumberFormat>
// }

// export default abstract class Localizer<
//   TDateFormat,
//   TNumberFormat = TDateFormat
// > {
//   propType: any

//   numberFormats?: NumberFormats<TNumberFormat>
//   dateFormats?: DateFormats<TDateFormat>
//   firstOfWeek: number

//   constructor({
//     dateFormats,
//     numberFormats,
//     propType,
//     firstOfWeek = 0,
//   }: LocalizerConfig<TDateFormat, TNumberFormat>) {
//     this.propType = propType || localePropType
//     this.numberFormats = numberFormats
//     this.dateFormats = dateFormats
//     this.firstOfWeek = firstOfWeek
//   }

//   protected _formatDate?(date: Date, format?: TDateFormat): string

//   protected _formatNumber?(num: number, format?: TNumberFormat): string

//   formatDate(date: Date, format?: Format<Date, TDateFormat>) {
//     return format instanceof Function
//       ? format(date, this)
//       : this._formatDate!(date, format)
//   }

//   parseDate?(val: string, format?: any): Date | null

//   formatNumber(number: number, format?: Format<number, TNumberFormat>) {
//     return format instanceof Function
//       ? format(number, this)
//       : this._formatNumber!(number, format)
//   }

//   parseNumber?(val: string): number | null

//   precision?(format?: Format<number, TNumberFormat>): null | number

//   decimalChar() {
//     return '.'
//   }
// }

// export interface DateLocalizerConfig<TDateFormat> {
//   propType?: any
//   firstOfWeek?: number
//   dateFormats?: DateFormats<TDateFormat>
// }

// export declare class DateLocalizer<TDateFormat> extends Localizer<
//   TDateFormat,
//   never
// > {
//   dateFormats: DateFormats<TDateFormat>

//   constructor(config: DateLocalizerConfig<TDateFormat>)

//   protected _formatDate(date: Date, format?: Format<Date, TDateFormat>): string

//   parseDate(val: string, format?: any): Date | null
// }

// export declare class NumberLocalizer<TNumberFormat> extends Localizer<
//   never,
//   TNumberFormat
// > {
//   numberFormats: NumberFormats<TNumberFormat>

//   constructor(config: DateLocalizerConfig<TNumberFormat>)

//   protected _formatNumber(
//     num: number,
//     format?: Format<number, TNumberFormat>,
//   ): string

//   parseNumber(val: string): number | null

//   precision(format?: Format<number, TNumberFormat>): null | number
// }
