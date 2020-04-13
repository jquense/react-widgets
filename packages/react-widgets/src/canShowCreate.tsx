import { AllowCreate } from './shared'
import { Accessors } from './Accessors'

interface Options {
  searchTerm?: string
  data: readonly unknown[]
  dataItems?: readonly unknown[]
  accessors: Accessors
}
export default function allowCreate(
  allowCreate: AllowCreate,
  { searchTerm = '', data, dataItems, accessors }: Options,
) {
  const eq = (v: unknown) =>
    accessors.text(v).toLowerCase() === searchTerm.toLowerCase()

  // if there is an exact match on textFields:
  // "john" => { name: "john" }, don't show
  const hasExtactMatch = () =>
    (dataItems && dataItems.some(eq)) || data.some(eq)

  return !!(
    (allowCreate === true || (allowCreate === 'onFilter' && searchTerm)) &&
    !hasExtactMatch()
  )
}
