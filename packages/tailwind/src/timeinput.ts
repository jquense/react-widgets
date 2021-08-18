import css from 'style-convert/macro'
import { PluginApi } from 'tailwindcss/plugin'

export const theme = {}

export const plugin = ({ theme, addComponents }: PluginApi) => {
  const input = theme('rwInput')

  addComponents(css`
    .rw-time-input {
      @apply cursor-text outline-none inline-flex items-center;

      min-height: ${input.height};
      background-color: ${input.backgroundColor};
      border: ${input.borderColor} ${input.borderWidth} solid;
      border-radius: ${input.borderRadius};

      &.rw-state-disabled {
        @apply cursor-not-allowed;
      }
    }

    .rw-time-part-input {
      @apply rw-btn-input-reset rw-input-base;

      padding: 0 ${theme('padding.2')};
      cursor: inherit;

      &,
      &::placeholder {
        text-align: center;
      }
    }

    .rw-time-part-meridiem {
      @apply rw-btn-input-reset lowercase;

      padding: 0 ${theme('padding.2')};
      font-variant: small-caps;

      & :focus {
        outline: none;
      }
    }

    .rw-time-input-clear {
      @apply opacity-0 outline-none ml-auto;

      padding: 0 ${theme('padding.2')};

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
