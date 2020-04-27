declare function generateNames(
  limit?: number,
): Array<{
  first: string
  last: string
  id: number
  fullName: string
}>

declare namespace NodeJS {
  interface Global {
    chance: any
  }
}
