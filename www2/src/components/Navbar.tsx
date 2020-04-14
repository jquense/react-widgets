import { css } from 'astroturf'
import { Link } from 'gatsby'
import React from 'react'

export const widgets = [
  'Calendar',
  'Combobox',
  'Date/Time Picker',
  'DropdownList',
  'Listbox',
  'Multiselect',
  'NumberPicker',
]

export default function Navbar({ static: isStatic }: { static?: boolean }) {
  return (
    <div
      className={`${
        isStatic ? 'relative' : 'sticky'
      } inset-0 z-30 bg-primary text-white`}
      css={css`
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
      `}
    >
      <nav className="flex flex-wrap w-100 justify-center">
        {widgets.map((name) => (
          <Link
            activeClassName="bg-accent"
            to={`/api/${name.replace('/', '').replace(' ', '')}`}
            className="px-4 flex  h-navbar items-center hover:bg-accent"
          >
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
