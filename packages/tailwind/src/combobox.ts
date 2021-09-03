import css from 'style-convert/macro'
import { PluginApi } from 'tailwindcss/plugin'

export const theme = {}

export const plugin = ({ addComponents }: PluginApi) => {
  addComponents(css`
    .rw-combobox-input {
      background-color: transparent;
      z-index: 1;
    }
  `)
}
