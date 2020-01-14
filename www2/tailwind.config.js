module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#028fcc',
        accent: '#0273a3',
        purple: '#913d88',
        divider: '#ddd',
      },
      height: {
        navbar: 50,
      },
      fontFamily: {
        default: 'Raleway',
        brand: 'Lobster',
      },
      LiveCode: {
        '@screen lg': {
          '& .content': {
            '@apply flex flex-row-reverse': true,
          },
          '& .preview': {
            flex: '0 0 40%',

            '& :global': {
              '.rw-widget-container': {
                maxWidth: 400,
              },

              '.rw-widget + input, .rw-widget + button,  input + .rw-widget, button + .rw-widget,  .rw-widget + .rw-widget': {
                marginTop: 15,
              },

              '.rw-listbox': {
                overflow: 'auto',
                maxHeight: 200,
              },
            },
          },
          '& .editor': {
            flex: '1',
          },
        },
      },
    },
  },
}
