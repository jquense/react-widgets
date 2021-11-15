import css from 'style-convert/macro'
import colors from 'tailwindcss/colors'
// @ts-ignore
import { withAlphaValue } from 'tailwindcss/lib/util/withAlphaVariable'
// @ts-ignore
import transformThemeValue from 'tailwindcss/lib/util/transformThemeValue'
import { PluginApi } from 'tailwindcss/plugin'

const opts = {
  respectImportant: false,
  respectPrefix: false,
}

function hasAlpha(color: string) {
  return (
    color.startsWith('rgba(') ||
    color.startsWith('hsla(') ||
    (color.startsWith('#') && color.length === 9) ||
    (color.startsWith('#') && color.length === 5)
  )
}

export const theme = {
  rwCore: (theme: any) => ({
    fontWeight: null,
    fontSize: transformThemeValue('fontSize')(theme('fontSize.base', '1em')),
    backgroundClip: 'padding-box',

    borderRadius: theme('borderRadius.DEFAULT', '4px'),

    backgroundColor: theme('colors.white', colors.white),
    color: theme('textColor.DEFAULT', 'currentColor'),
    borderColor: theme('borderColor.DEFAULT', colors.gray[300]),

    hoverBackgroundColor: theme('colors.gray.200', colors.gray[200]),
    hoverBorderColor: theme('colors.gray.200', colors.gray[200]),
    hoverColor: null,

    focusWidth: theme('ringWidth.DEFAULT', '3px'),
    focusColor: theme('ringColor.DEFAULT', 'rgba(0, 123, 255, 0.5)'),
    focusBoxShadow:
      '0 0 0 var(--rw-core-focus-width) var(--rw-core-focus-color)',
    focusTransition: null, // 'box-shadow 0.15s ease-in-out',
  }),

  rwButton: (theme: any) => ({
    alignItems: null, // TD
    justifyContent: null, // TD

    paddingLeft: null,
    paddingRight: null,
    color: theme('rwCore.color'),
    borderColor: null,
    backgroundColor: null,
    backgroundClip: theme('rwCore.backgroundClip'),

    borderRadius: theme('borderRadius.DEFAULT', '4px'),
    disabledBackgroundColor: theme('colors.gray.200', colors.gray[200]),

    hoverColor: null,
    hoverBorderColor: null,
    hoverBackgroundColor: theme('colors.gray.200', colors.gray[200]),

    activeColor: null,
    activeBorderColor: null,
    activebackgroundColor: theme('colors.gray.300', colors.gray[300]),
  }),

  rwInput: (theme: any) => ({
    height: theme('height.10'),
    color: theme('colors.gray.700', colors.gray[700]),
    caretColor: null,
    boxShadow: null, // 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
    paddingX: theme('padding.4'),

    backgroundColor: theme('rwCore.backgroundColor'),
    placeholderColor: '#999',

    borderWidth: '1px',
    borderColor: theme('borderColor.DEFAULT', colors.gray[300]),
    borderRadius: theme('borderRadius.DEFAULT', '4px'),

    disabledBackgroundColor: theme('colors.gray.200', colors.gray[200]),
    disabledBorderColor: null,
    disabledColor: null,
    disabledPlaceholderColor: '#999',

    focusBackgroundColor: null,
    focusBorderColor: null,
    focusColor: null,

    autofillBackgroundColor: 'rgb(232, 240, 254)',
    autofillColor: 'rgb(0, 0, 0)',
  }),
  rwInputAddon: (theme: any) => ({
    width: theme('width.10'),
    borderColor: theme('rwInput.borderColor'),
  }),
}

export const plugin = ({
  theme,
  addComponents,
  addUtilities,
  addBase,
}: PluginApi) => {
  addBase(css`
    @keyframes react-widgets-autofill-start {
      from {
        /**/
      }
      to {
        /**/
      }
    }

    @keyframes react-widgets-autofill-cancel {
      from {
        /**/
      }
      to {
        /**/
      }
    }
  `)

  const utils = css`
    .rw-btn-input-reset {
      padding: 0;
      margin: 0;
      border: none;
      color: inherit;
      box-shadow: none;
      background: none;
      font: inherit;
      line-height: inherit;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      outline: 0;
    }

    .rw-input-base {
      caret-color: ${theme('rwInput.caretColor')};

      &:disabled {
        // For safari, which seems to ignore color on disabled inputs
        // opacity for IOS
        -webkit-text-fill-color: ${theme('rwInput.disabledColor')};
        opacity: 1;
      }
    }
  `

  const focusShadow = theme('rwCore.focusBoxShadow')
  let focusColor = theme('rwCore.focusColor')

  if (!hasAlpha(focusColor))
    focusColor = withAlphaValue(focusColor, theme('ringOpacity.DEFAULT', 0.5))

  utils['.rw-focus-ring'] = {
    ...(focusShadow
      ? {
          '--rw-core-focus-width': theme('rwCore.focusWidth'),
          '--rw-core-focus-color': focusColor,
          boxShadow: focusShadow,
          transition: theme('rwCore.focusTransition'),
        }
      : null),
  }

  addUtilities(utils, opts)

  const components = css`
    .rw-btn {
      @apply rw-btn-input-reset inline-flex items-center justify-center cursor-pointer focus:outline-none;

      background-clip: ${theme('rwButton.backgroundClip')};

      &:disabled,
      fieldset[disabled] &,
      // for picker-caret
      .rw-state-disabled &,
      .rw-state-readonly & {
        cursor: inherit;
      }
      // easier to disable this way then check in each event handler
      fieldset[disabled] & {
        pointer-events: none;
      }
    }

    // The Psuedo button on DropdownList and Multiselect
    // also composes rw-btn
    .rw-picker-caret,
    .rw-picker-btn {
      color: ${theme('rwButton.color')};
      align-items: ${theme('rwButton.align-items')};
      justify-content: ${theme('rwButton.justifyContent')};
      padding-left: ${theme('rwButton.paddingLeft')};
      padding-right: ${theme('rwButton.paddingRight')};
    }

    .rw-picker-btn {
      background-color: ${theme('rwButton.backgroundColor')};
      // border color doesn't make sense here
      // since it's surrounded by the input border

      &:hover {
        color: ${theme('rwButton.hoverColor')};
        background-color: ${theme('rwButton.hoverBackgroundColor')};
      }
      &:active {
        color: ${theme('rwButton.activeColor')};
        background-color: ${theme('rwButton.activeBackgroundColor')};
      }

      &:disabled,
      fieldset[disabled] & {
        background-color: ${theme('rwButton.disabledBackgroundColor')};
      }
    }

    .rw-input-addon {
      // The input border should be more important here
      &,
      &.rw-picker-btn {
        border-left: ${theme('rwInputAddon.borderColor')} 1px solid;

        [dir='rtl'] & {
          border-right: ${theme('rwButton.borderColor')} 1px solid;
          border-left: none;
        }
      }
    }

    .rw-sr {
      @apply sr-only;
    }

    .rw-widget {
      border: none;
      color: ${theme('rwCore.color')};
      font-weight: ${theme('rwCore.fontWeight')};
      font-size: ${theme('rwCore.fontSize')};
      font-family: ${theme('rwCore.fontFamily')};
      outline: none;
      position: relative;
    }

    .rw-state-readonly,
    .rw-state-disabled,
    fieldset[disabled] .rw-widget {
      cursor: not-allowed;
    }

    .rw-widget-picker {
      display: grid;
      overflow: hidden;
      min-height: ${theme('rwInput.height')};
      background-color: ${theme('rwInput.backgroundColor')};
      border: ${theme('rwInput.borderColor')} ${theme('rwInput.borderWidth')}
        solid;
      border-radius: ${theme('rwInput.borderRadius')};
      outline: none;
      grid-template: 1fr / 1fr ${theme('rwInputAddon.width')};
      // ensure that the "chrome" is the same width as the actual container
      width: 100%;

      &.rw-hide-caret {
        grid-template-columns: 1fr;
      }

      .rw-state-focus & {
        @apply rw-focus-ring;

        color: ${theme('rwInput.focusColor')};
        background-color: ${theme('rwInput.focusBackgroundColor')};
        border-color: ${theme('rwInput.focusBorderColor')};

        &.rw-widget-input {
          box-shadow: ${theme('rwInput.boxShadow') && focusShadow
            ? `${focusShadow}, ${theme('rwInput.boxShadow')}`
            : null};
        }
      }
    }

    .rw-input {
      @apply rw-btn-input-reset rw-input-base;

      padding: 0 ${theme('rwInput.paddingX')};

      &[type='text']::-ms-clear {
        display: none;
      }

      &:disabled,
      &:read-only {
        // use parent style
        cursor: inherit;
      }
    }

    // This class represents the abstract container that is the "input" of any
    // given widget
    .rw-widget-input {
      color: ${theme('rwInput.color')};
      background-color: ${theme('rwInput.backgroundColor')};
      box-shadow: ${theme('rwInput.boxShadow')};
      background-clip: ${theme('rwCore.backgroundClip')};

      // Listbox is also the rw-widget
      &.rw-state-disabled,
      .rw-state-disabled &,
      fieldset[disabled] & {
        color: ${theme('rwInput.disabledColor')};
        background-color: ${theme('rwInput.disabledBackgroundColor')};
        border-color: ${theme('rwInput.disabledBorderColor')};
      }
    }

    .rw-placeholder,
    .rw-input::placeholder {
      color: ${theme('rwInput.placeholderColor')};

      .rw-state-disabled & {
        color: ${theme('rwInput.disabledPlaceholderColor')};
      }
    }

    // https://github.com/klarna/ui/blob/master/Field/styles.scss
    .rw-detect-autofill {
      @apply rw-btn-input-reset rw-input-base;
    }

    .rw-detect-autofill:-webkit-autofill {
      animation-name: react-widgets-autofill-start;
      animation-duration: 0.01ms;
    }

    .rw-detect-autofill:not(:-webkit-autofill) {
      animation-name: react-widgets-autofill-cancel;
      animation-duration: 0.01ms;
    }

    .rw-webkit-autofill .rw-widget-container,
    .rw-input:-webkit-autofill {
      background-color: ${theme('rwInput.autofillBackgroundColor')} !important;
      background-image: none !important;
      color: ${theme('rwInput.autofillColor')} !important;
    }
  `

  addComponents(components, opts)
}
