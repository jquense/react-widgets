import css from 'style-convert/macro'
import colors from 'tailwindcss/colors'
import { PluginApi, ThemeFn } from 'tailwindcss/plugin'

export const theme = {
  rwMultiselect: (theme: ThemeFn) => {
    const input = theme('rwInput')
    const gutter = 0.115

    return {
      tagPaddingInlineStart: theme('padding[1.5]'),
      tagPaddingInlineEnd: theme('padding[1.5]'),

      tagColor: null,
      tagBorderColor: theme('colors.gray.300', colors.gray[300]),
      tagBackgroundColor: theme('colors.gray.300', colors.gray[300]),

      tagGutter: `calc(${input.height} * ${gutter} - ${input.borderWidth})`,
      tagHeight: `calc(${input.height} * ${1 - gutter * 2})`,
      tagBorderRadius: theme('borderRadius.DEFAULT'),

      tagBtnPaddingY: 0,
      tagBtnPaddingX: theme('padding[1.5]'),

      tagBtnBackgroundColor: null,
      tagBtnBorderColor: null,
      tagBtnColor: null,

      tagBtnHoverBackgroundColor: null,
      tagBtnHoverBorderColor: null,
      tagBtnHoverColor: null,

      tagBtnActiveBackgroundColor: null,
      tagBtnActiveBorderColor: null,
      tagBtnActiveColor: null,
    }
  },
}

export const plugin = ({ theme, addComponents }: PluginApi) => {
  const input = theme('rwInput')
  const ms = theme('rwMultiselect')

  addComponents(css`
    .rw-multiselect {
    }

    .rw-multiselect-input {
      @apply rw-btn-input-reset rw-input-base;

      height: calc(${input.height} - ${input.borderWidth} * 2);
      padding: 0 ${input.paddingX};
      max-width: 100%; // breaks to a new line but doesn't stop growing

      &:disabled,
      &:read-only {
        // use parent style
        cursor: inherit;
      }
    }

    .rw-multiselect-taglist {
      @apply flex flex-wrap items-start w-full outline-none cursor-text;

      .rw-state-disabled & {
        cursor: unset;
      }
    }

    .rw-multiselect-tag {
      @apply inline-flex items-center overflow-hidden max-w-full;
      // reset the text selection cursor on the parent
      @apply cursor-default;

      color: ${ms.tagColor};
      margin-left: ${ms.tagGutter};
      margin-top: ${ms.tagGutter};
      min-height: ${ms.tagHeight};
      border-radius: ${ms.tagBorderRadius};
      background-color: ${ms.tagBackgroundColor};
      border: ${ms.tagBorderColor ? `1px solid ${ms.tagBorderColor}` : null};

      [dir='rtl'] & {
        margin-left: 0;
        margin-right: ${ms.tagGutter};
        padding: 0 ${ms.tagPaddingInlineStart} 0 ${ms.tagPaddingInlineEnd};
      }

      &.rw-state-focus {
        @apply rw-focus-ring;

        zindex: 1;
      }

      &.rw-state-disabled,
      fieldset[disabled] & {
        opacity: 0.65;
      }
    }

    .rw-multiselect-tag-label {
      padding: 0 ${ms.tagPaddingInlineEnd} 0 ${ms.tagPaddingInlineStart};
    }

    .rw-multiselect-tag-btn {
      @apply rw-btn-input-reset cursor-pointer self-stretch;

      padding: ${ms.tagBtnPaddingY} ${ms.tagBtnPaddingX};
      color: ${ms.tagBtnColor};
      border-color: ${ms.tagBtnBorderColor};
      background-color: ${ms.tagBtnBackgroundColor};

      &:hover {
        color: ${ms.tagBtnHoverColor};
        border-color: ${ms.tagBtnHoverBorderColor};
        background-color: ${ms.tagBtnHoverBackgroundColor};
      }
      &:active {
        color: ${ms.tagBtnActiveColor};
        border-color: ${ms.tagBtnActiveBorderColor};
        background-color: ${ms.tagBtnActiveBackgroundColor};
      }

      &:disabled {
        cursor: inherit;
      }

      @apply focus:outline-none;
    }
  `)
}
