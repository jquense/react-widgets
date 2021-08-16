import css from 'style-convert/macro'
import { PluginApi } from 'tailwindcss/plugin'

export const theme = {}

export const plugin = ({ addComponents }: PluginApi) => {
  addComponents(css`
    .rw-popup > .rw-time-input {
      align-self: center;
      margin: 1em 0;
    }
  `)
}
