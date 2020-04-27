module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#028fcc',
        accent: '#0273a3',
        purple: '#913d88',
        divider: '#ddd',
      },
      // height: {
      //   navbar: '50px',
      // },
      fontFamily: {
        default: 'Raleway',
        brand: 'Lobster',
      },
      LiveCode: (t) => ({
        '& .content': {
          backgroundColor: t('colors.gray.200'),
        },

        '& .editor': {
          backgroundColor: t('colors.gray.200'),
        },

        '& .show-code:focus': {
          '@apply outline-none shadow-outline': '',
        },

        '& .preview': {
          maxWidth: 400,
          width: '100%',
          margin: '0 auto',

          '& :global': {
            '.rw-widget + input, .rw-widget + button,  input + .rw-widget, button + .rw-widget,  .rw-widget + .rw-widget': {
              marginTop: 15,
            },

            '.rw-listbox': {
              overflow: 'auto',
              maxHeight: 200,
            },
          },
        },
      }),
    },
  },
}
