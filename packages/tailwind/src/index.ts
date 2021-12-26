import plugin from 'tailwindcss/plugin'

import * as Widget from './widget'
import * as Popup from './popup'
import * as List from './list'
import * as Combobox from './combobox'
import * as Multiselect from './multiselect'
import * as DatePicker from './datepicker'
import * as Calendar from './calendar'
import * as DropdownList from './dropdownlist'
import * as NumberPicker from './numberpicker'
import * as TimeInput from './timeinput'
import * as Listbox from './listbox'

const isEmpty = (value: any) => {
  return (
    value == null || value === 'null' || value === 'undefined' || value === ''
  )
}
function removeEmpty(value: any): any {
  if (Array.isArray(value)) {
    value.forEach(removeEmpty)
    return value
  }
  if (value && typeof value === 'object') {
    for (let [key, v] of Object.entries(value)) {
      if (isEmpty(v)) {
        delete value[key]
      } else {
        removeEmpty(v)
      }
    }
    return value
  }

  return value
}

function wrap<T extends (d: any, ...args: any[]) => any>(
  fn: T,
  options?: Parameters<T>[1],
): T {
  return ((decls: any, ...args: any[]) => {
    // console.log(removeEmpty(decls))
    return fn(removeEmpty(decls), options, ...args)
  }) as any
}

const ComponentPlugins = {
  Popup: Popup,
  List: List,
  Listbox: Listbox,
  Autocomplete: null,
  Combobox: Combobox,
  Multiselect: Multiselect,
  DatePicker: DatePicker,
  Calendar: Calendar,
  DropdownList: DropdownList,
  NumberPicker: NumberPicker,
  TimeInput: TimeInput,
}

export type Components = keyof typeof ComponentPlugins

const dependencies: Record<Components, Components[]> = {
  List: [],
  Popup: [],
  Listbox: ['List'],
  DropdownList: ['List', 'Popup'],
  Combobox: ['List', 'Popup'],
  Autocomplete: ['List', 'Popup', 'Combobox'],
  Multiselect: ['List', 'Popup'],
  DatePicker: ['Popup', 'Calendar'],
  Calendar: [],
  TimeInput: [],
  NumberPicker: [],
}

function sort(components: Components[]) {
  const visited = new Set<Components>()

  const topo = (comp: Components): Components[] => {
    const deps = dependencies[comp] || []
    let result: Components[] = []
    for (let dep of deps) {
      if (!visited.has(dep)) {
        result.push(...topo(dep))
      }
    }
    visited.add(comp)
    result.push(comp)
    return result
  }

  return components.reduce((result, c) => [...result, ...topo(c)], [])
}
const defaultComponents = Object.keys(dependencies)

export default plugin.withOptions(
  ({ components = defaultComponents } = {}) => {
    const enabled = sort(components)

    return ({ addBase, addComponents, addUtilities, ...args }) => {
      const api = {
        addBase: wrap(addBase),
        addUtilities: wrap(addUtilities, { respectImportant: false }),
        addComponents: wrap(addComponents),
        ...args,
      }

      Widget.plugin(api)

      enabled.forEach((comp) => {
        ComponentPlugins[comp]?.plugin(api)
      })
    }
  },
  ({ components = defaultComponents } = {}) => {
    const enabled = sort(components)
    return {
      theme: Object.assign(
        {},
        Widget.theme,
        ...enabled.map((c) => ComponentPlugins[c]?.theme),
      ),
    }
  },
)
