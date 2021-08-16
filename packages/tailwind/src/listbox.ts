import css from 'style-convert/macro'
import { PluginApi } from 'tailwindcss/plugin'

export const theme = {}

export const plugin = ({ theme, addComponents }: PluginApi) => {
  const core = theme('rwCore')
  const input = theme('rwInput')

  addComponents(css`
    .rw-listbox {
      border-radius: ${core.borderRadius};
      background-color: ${core.bg};
      border: ${core.borderColor} 1px solid;

      &.rw-state-focus {
        @apply rw-focus-ring;

        color: ${input.focusColor};
        background-color: ${input.focusBg};
        border-color: ${input.focusBorderColor};

        box-shadow: ${input.boxShadow && core.focusShadow
          ? `${core.focusShadow}, ${input.boxShadow}`
          : null};
      }

      &.rw-state-disabled > *,
      fieldset[disabled] & > * {
        pointer-events: none;
      }

      &.rw-state-readonly > * {
        cursor: inherit;
      }
    }
  `)
}
