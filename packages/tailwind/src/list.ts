import css from 'style-convert/macro'
import colors from 'tailwindcss/colors'
import { PluginApi } from 'tailwindcss/plugin'

const opts = {
  respectImportant: false,
  respectPrefix: false,
}

export const theme = {
  rwList: (theme: any) => {
    const core = theme('rwCore')
    const selected = theme('colors.blue.500', colors.blue[500])
    return {
      color: core.color,
      fontSize: core.fontSize,
      paddingY: '0.5em',

      focusBg: core.hoverBg,
      focusBorderColor: core.hoverBorderColor,
      focusColor: core.hoverColor,

      selectedBg: selected,
      selectedBorderColor: selected,
      selectedColor: theme('colors.white'),

      disabledBg: 'transparent',
      disabledBorderColor: 'transparent',
      disabledColor: theme('colors.gray.300'),

      optionPaddingY: '0.25em',
      optionPaddingX: '1.5em',
      optionMutedColor: theme('colors.gray.3400'),

      optionCreateBg: core.bg,

      optgroupColor: null,
      optgroupFontWeight: theme('fontWeight.bold'),
    }
  },
}

export const plugin = ({ theme, addComponents }: PluginApi) => {
  const list = theme('rwList') as any
  const core = theme('rwCore') as any

  addComponents(css`
    .rw-list {
      // outline: 0;
      font-size: ${list.fontSize};
      overflow-x: visible;
      overflow-y: auto;
      padding-top: ${list.paddingY};
      padding-bottom: ${list.paddingY};

      &:focus {
        outline: none;
      }
    }

    .rw-list-option {
      user-select: none;
      color: ${list.color};
      cursor: pointer;
      border: 1px solid transparent;
      background-clip: ${core.backgroundClip};

      &:hover,
      [data-intent='keyboard'] &.rw-state-focus:not(.rw-state-selected) {
        background-color: ${list.focusBg};
        border-color: ${list.focusBorderColor};
        color: ${list.focusColor};
      }

      &.rw-state-selected {
        background-color: ${list.selectedBg};
        border-color: ${list.selectedBorderColor};
        color: ${list.selectedColor};
      }

      &.rw-state-disabled {
        cursor: not-allowed; // required to override the cursor above
        background-color: ${list.disabledBg};
        border-color: ${list.disabledBorderColor};
        color: ${list.disabledColor};
      }
    }

    .rw-list-empty,
    .rw-list-option,
    .rw-list-optgroup,
    .rw-list-option-create \ {
      padding: ${list.optionPaddingY} ${list.optionPaddingX};
      outline: none;
    }

    .rw-list-empty {
      text-align: center;
      color: ${list.optionMutedColor};
    }

    .rw-list-optgroup {
      color: $ ${list.optgroupColor};
      font-weight: ${list.optgroupFontWeight};
      padding-top: 7px;
    }

    .rw-list-option-create {
      display: block;
      font-size: $font-size;
      padding: ${list.optionPaddingY} ${list.optionPaddingX};
    }
  `)
}
