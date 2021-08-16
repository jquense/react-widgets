import css from 'style-convert/macro'
import { PluginApi } from 'tailwindcss/plugin'

export const theme = {}

export const plugin = ({ theme, addComponents }: PluginApi) => {
  const input = theme('rwInput')

  addComponents(css`
    .rw-time-input {
      @apply cursor-text outline-none inline-flex items-center;

      min-height: ${input.height};
      background-color: ${input.bg};
      border: $input-border-color ${input.borderWidth} solid;
      border-radius: ${input.borderRadius};
    }

    .rw-time-part-input {
      @apply rw-btn-input-reset rw-input-base;

      padding: 0 0.5em;

      &,
      &::placeholder {
        text-align: center;
      }
    }

    .rw-time-part-meridiem {
      @apply rw-btn-input-reset;

      padding: 0 0.5em;
      text-transform: lowercase;
      font-variant: small-caps;

      & :focus {
        outline: none;
      }
    }

    .rw-time-input-clear {
      @apply opacity-0 outline-none ml-auto;

      padding: 0 0.4em;

      [dir='rtl'] & {
        margin-left: revert;
        margin-right: auto;
      }

      .rw-time-input:hover &.rw-show,
      .rw-time-input.rw-state-focus &.rw-show {
        @apply opacity-100;
      }
    }
  `)
}
