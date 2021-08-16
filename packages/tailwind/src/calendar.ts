import css from 'style-convert/macro'
import colors from 'tailwindcss/colors'
import { PluginApi, ThemeFn } from 'tailwindcss/plugin'

const opts = {
  respectImportant: false,
  respectPrefix: false,
}

export const theme = {
  rwCalendar: (theme: ThemeFn) => {
    const core = theme('rwCore')
    const selected = theme('colors.blue.500', colors.blue[500])

    return {
      bg: core.bg,

      btnBg: theme('colors.white', colors.white),
      btnColor: core.color,
      btnBorderColor: null,
      btnMutedColor: theme('colors.gray.400', colors.gray[400]),
      btnBorderRadius: core.borderRadius,

      btnHoverBg: core.hoverBg,
      btnHoverBorderColor: core.hoverBg,
      btnHoverColor: core.hoverBg,

      btnActiveBg: null,
      btnActiveBorderColor: null,
      btnActiveColor: null,

      btnFocusBg: null,
      btnFocusBorderColor: null,
      btnFocusColor: null,

      cellAlign: 'center',
      cellPadding: '0.25em',
      cellColor: core.color,
      cellBorderColor: null,
      cellBorderRadius: core.borderRadius,

      cellHoverBg: core.hoverBg,
      cellHoverBorderColor: core.hoverBg,
      cellHoverColor: core.hoverBg,

      cellActiveBg: null,
      cellActiveBorderColor: null,
      cellActiveColor: null,

      cellFocusBg: null,
      cellFocusBorderColor: null,
      cellFocusColor: null,

      cellSelectedBg: selected,
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
      border-radius: ${core.borderRadius};
      background-color: ${cal.bg};
      border: ${core.borderColor} 1px solid;
    }

    .rw-calendar-now {
      @apply font-bold;
    }
    .rw-calendar-header {
      display: flex;
      padding: 0.8em;
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
        background-color: ${cal.btnHoverBg};
      }
      &:active {
        background-color: ${cal.btnActiveBg};
      }
    }

    .rw-calendar-btn-left,
    .rw-calendar-btn-today,
    .rw-calendar-btn-right,
    .rw-calendar-btn-view {
      padding: 0.3em 0.6em;
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
        margin: 0 0.5em;
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
      height: 14em;
      padding: ${core.focusWidth};
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;
      width: 100%;
      background-color: ${cal.bg};
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
      color: $cell-color;
      vertical-align: middle;
      border-color: ${cal.cellBorderColor};
      border-radius: ${cal.cellBorderRadius};
      cursor: pointer;
      line-height: normal;
      text-align: center;
      border: 1px solid transparent;
      padding: ${cal.cellPadding};
      outline: none;

      &:hover {
        background-color: ${cal.cellHoverBg};
      }
      &:active {
        background-color: ${cal.cellActiveBg};
      }

      &.rw-state-selected {
        background-color: ${cal.cellSelectedBg};
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
