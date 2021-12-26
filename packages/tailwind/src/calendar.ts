import css from 'style-convert/macro'
import colors from 'tailwindcss/colors'
import { PluginApi, ThemeFn } from 'tailwindcss/plugin'

export const theme = {
  rwCalendar: (theme: ThemeFn) => {
    const core = theme('rwCore')
    const button = theme('rwButton')
    const selected = theme('colors.blue.500', colors.blue[500])

    return {
      backgroundColor: core.backgroundColor,
      borderRadius: button.borderRadius,

      btnBackgroundColor: theme('colors.white', colors.white),
      btnColor: button.color,
      btnBorderColor: null,
      btnBackgroundClip: button.backgroundClip,
      btnMutedColor: theme('colors.gray.400', colors.gray[400]),
      btnBorderRadius: button.borderRadius,

      btnHoverBackgroundColor: button.hoverBackgroundColor,
      btnHoverBorderColor: button.hoverBorderColor,
      btnHoverColor: button.hoverColor,

      btnActiveBackgroundColor: null,
      btnActiveBorderColor: null,
      btnActiveColor: null,

      btnFocusBackgroundColor: null,

      btnFocusBorderColor: null,
      btnFocusColor: null,

      cellAlign: 'center',
      cellPadding: theme('padding.2'),
      cellBackgroundClip: core.backgroundClip,
      cellColor: button.color,
      cellBorderColor: null,
      cellBorderRadius: button.borderRadius,

      cellHoverBackgroundColor: button.hoverBackgroundColor,
      cellHoverBorderColor: button.hoverBackgroundColor,
      cellHoverColor: button.hoverColor,

      cellActiveBackgroundColor: null,
      cellActiveBorderColor: null,
      cellActiveColor: null,

      cellFocusBackgroundColor: null,
      cellFocusBorderColor: null,
      cellFocusColor: null,

      cellSelectedBackgroundColor: selected,
      cellSelectedBorderColor: selected,
      cellSelectedColor: theme('colors.white', colors.white),
    }
  },
}

export const plugin = ({ theme, addComponents }: PluginApi) => {
  const core = theme('rwCore')
  const cal = theme('rwCalendar')

  addComponents(css`
    .rw-calendar-popup {
      @apply right-auto min-w-0;

      width: 22em;
    }

    .rw-calendar {
      @apply overflow-hidden;
    }

    .rw-calendar-contained {
      border-radius: ${cal.borderRadius};
      background-color: ${cal.backgroundColor};
      border: ${core.borderColor} 1px solid;
    }

    .rw-calendar-now {
      @apply font-bold;
    }
    .rw-calendar-header {
      display: flex;
      padding: ${theme('padding.3')};
    }

    .rw-cell,
    .rw-calendar-btn {
      background-clip: ${core.backgroundClip};

      // TODO: normal button disabled
      &:disabled,
      &.rw-state-disabled {
        pointer-events: none;
        opacity: 0.35;
      }

      &:focus {
        @apply rw-focus-ring;

        [data-intent='mouse'] & {
          z-index: auto;
          box-shadow: none;
        }
      }
    }

    .rw-calendar-btn {
      line-height: 2em;
      border-radius: ${cal.btnBorderRadius};
      border-color: ${cal.btnBorderColor};

      &:hover {
        color: ${cal.btnHoverColor};
        border-color: ${cal.btnHoverBorderColor};
        background-color: ${cal.btnHoverBackgroundColor};
      }
      &:active {
        color: ${cal.btnActiveColor};
        border-color: ${cal.btnActiveBorderColor};
        background-color: ${cal.btnActiveBackgroundColor};
      }
    }

    .rw-calendar-btn-left,
    .rw-calendar-btn-today,
    .rw-calendar-btn-right,
    .rw-calendar-btn-view {
      padding: ${theme('padding.1', '4px')} ${theme('padding[2.5]', '10px')};
    }

    .rw-calendar-btn-left,
    .rw-calendar-btn-right {
      [dir='rtl'] & {
        transform: scale(-1, 1);
      }
    }
    .rw-calendar-btn-view {
      font-weight: bold;

      & > :last-child {
        margin: 0 ${theme('margin.2')};
      }

      & + * {
        margin-left: auto;

        [dir='rtl'] & {
          margin-left: 0;
          margin-right: auto;
        }
      }
    }

    .rw-calendar-grid {
      display: table;
      outline: none;
      height: ${theme('height.56')};
      padding: ${core.focusWidth};
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;
      width: 100%;
      background-color: ${cal.backgroundColor};
    }
    .rw-calendar-head {
      display: table-header-group;
    }
    .rw-calendar-body {
      display: table-row-group;
    }

    .rw-calendar-row {
      display: table-row;
    }

    .rw-head-cell {
      display: table-cell;
      text-align: ${cal.cellAlign};
      border-bottom: 1px solid theme('rwInput.borderColor');
      padding: ${cal.cellPadding};
    }

    .rw-cell {
      display: table-cell;
      color: ${cal.cellColor};
      vertical-align: middle;
      border-color: ${cal.cellBorderColor};
      border-radius: ${cal.cellBorderRadius};
      background-clip: ${core.backgroundClip};
      cursor: pointer;
      line-height: normal;
      text-align: center;
      border: 1px solid transparent;
      padding: ${cal.cellPadding};
      outline: none;

      &:hover {
        color: ${cal.cellHoverColor};
        border-color: ${cal.cellHoverBorderColor};
        background-color: ${cal.cellHoverBackgroundColor};
      }
      &:active {
        color: ${cal.cellActiveColor};
        border-color: ${cal.cellActiveBorderColor};
        background-color: ${cal.cellActiveBackgroundColor};
      }

      &.rw-state-selected {
        background-color: ${cal.cellSelectedBackgroundColor};
        border-color: ${cal.cellSelectedBorderColor};
        color: ${cal.cellSelectedColor};
      }

      .rw-calendar-month & {
        text-align: ${cal.cellAlign};
      }
    }

    .rw-cell-off-range {
      color: ${cal.btnMutedColor};
    }

    .rw-calendar-transition-group {
      @apply relative overflow-hidden;
    }

    .rw-calendar-transition {
      @apply w-full overflow-hidden duration-200 transition-transform;

      transform: translate3d(0, 0, 0);
    }

    .rw-calendar-transition-next {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      .rw-calendar-transition-top & {
        transform: translate3d(0, -100%, 0);
      }
      .rw-calendar-transition-bottom & {
        transform: translate3d(0, 100%, 0);
      }
      .rw-calendar-transition-right & {
        transform: translate3d(-100%, 0, 0);
      }
      .rw-calendar-transition-left & {
        transform: translate3d(100%, 0, 0);
      }

      &.rw-calendar-transition-active {
        transform: translate3d(0, 0, 0);
      }
    }

    .rw-calendar-transition-prev {
      @apply absolute top-0 left-0;

      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      .rw-calendar-transition-top & {
        transform: translate3d(0, 100%, 0);
      }
      .rw-calendar-transition-bottom & {
        transform: translate3d(0, -100%, 0);
      }
      .rw-calendar-transition-right & {
        transform: translate3d(100%, 0, 0);
      }
      .rw-calendar-transition-left & {
        transform: translate3d(-100%, 0, 0);
      }
    }
  `)
}
