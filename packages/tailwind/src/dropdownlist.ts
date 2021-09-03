import css from 'style-convert/macro'
import { PluginApi } from 'tailwindcss/plugin'

export const theme = {}

export const plugin = ({ theme, addComponents }: PluginApi) => {
  addComponents(css`
    .rw-dropdown-list {
      width: 100%;
    }

    .rw-dropdownlist-search {
      @apply rw-btn-input-reset rw-input-base;
    }

    .rw-dropdown-list-value {
    }

    .rw-dropdown-list-input {
      padding: 0 ${theme('rwInput.paddingX')};
      align-self: center;
      display: grid;
      min-width: 0;
      grid-template: 1fr / 1fr;

      & > * {
        grid-area: 1/1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      [dir='rtl'] & {
        padding-right: ${theme('rwInput.paddingX')};
        padding-left: 0;
      }
    }
  `)
}
