import css from 'style-convert/macro'
import { PluginApi } from 'tailwindcss/plugin'

export const theme = {
  rwPopup: (theme: any) => {
    const core = theme('rwCore')

    return {
      offset: theme('margin[0.5]'),
      maxHeight: theme('height.64'),
      backgroundColor: core.backgroundColor,
      border: core.borderColor,
      borderRadius: core.borderRadius,
      boxShadowOffset: '1em',
      boxShadow: theme('boxShadow.md'),
      boxShadowUp: theme('boxShadow.md'),

      zindex: 1005,
      zindexFocused: 1006,
    }
  },
}

export const plugin = ({ theme, addUtilities, addComponents }: PluginApi) => {
  const popup = theme('rwPopup') as any
  const core = theme('rwCore') as any

  addUtilities(css`
    .rw-slide-transition {
      transition: transform 130ms, opacity 100ms;
    }

    .rw-slide-transition-entering {
      overflow: hidden;

      & .rw-slide-transition {
        transform: translateY(0);
        opacity: 1;
        transition-timing-function: ease-out;
      }
    }

    .rw-slide-transition-exiting {
      & .rw-slide-transition {
        transition-timing-function: ease-in;
      }
    }

    .rw-slide-transition-exiting,
    .rw-slide-transition-exited {
      overflow: hidden;

      & .rw-slide-transition {
        opacity: 0;
        transform: translateY(-10%);
      }

      &.rw-dropup .rw-slide-transition {
        opacity: 0;
        transform: translateY(10%);
      }
    }

    .rw-slide-transition-exited {
      display: none;
    }
  `)

  addComponents(css`
    .rw-popup-container {
      position: absolute;
      z-index: ${popup.zindex};
      top: 100%;
      left: -${popup.boxShadowOffset};
      right: -${popup.boxShadowOffset};
      padding: 0 ${popup.boxShadowOffset};

      &.rw-dropup {
        top: auto;
        bottom: 100%;
      }

      .rw-state-focus & {
        z-index: ${popup.$zindexFocused};
      }
    }

    .rw-slide-transition {
      // the offsets allows for drop shadow to not be clipped by the container
      // width: 100%;
      margin-bottom: ${popup.boxShadowOffset};
      // margin: 0 ${popup.boxShadowOffset};

      .rw-dropup > & {
        margin-bottom: 0;
        margin-top: ${popup.boxShadowOffset};
      }
    }

    .rw-popup {
      @apply flex flex-col;

      overflow: auto; // this is needed for some reason to clip scrollbar corners
      -webkit-overflow-scrolling: touch;
      margin-top: ${popup.offset};
      border-radius: ${popup.borderRadius};
      box-shadow: ${popup.boxShadow};
      border: ${popup.border} 1px solid;
      background-clip: ${core.backgroundClip};
      background: ${popup.backgroundColor};

      & .rw-list {
        max-height: ${popup.maxHeight};
      }

      .rw-dropup & {
        margin-top: 0;
        margin-bottom: ${popup.offset};
        box-shadow: ${popup.boxShadowUp};
      }
    }
  `)
}
