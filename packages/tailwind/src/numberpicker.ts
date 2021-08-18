import css from 'style-convert/macro'
import { PluginApi } from 'tailwindcss/plugin'

export const theme = {}

export const plugin = ({ addComponents }: PluginApi) => {
  addComponents(css`
    .rw-number-picker-spinners {
      @apply flex flex-col;

      .rw-btn {
        flex: 1 1 0;
      }
    }
  `)
}
