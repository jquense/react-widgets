const mono1 = 'hsl(230, 8%, 24%)'
const mono3 = 'hsl(230, 4%, 64%)'

const hue1 = 'hsl(198, 99%, 37%)'
const hue2 = 'hsl(221, 87%, 60%)'
const hue3 = 'hsl(301, 63%, 40%)'
const hue4 = 'hsl(119, 34%, 47%)'

// const hue5 = 'hsl(5, 74%, 59%)'
const hue52 = 'hsl(344, 84%, 43%)'

const hue6 = 'hsl(41, 99%, 30%)'
const hue62 = 'hsl(41, 99%, 38%)'

const syntaxFg = mono1
const syntaxBg = 'hsl(230, 1%, 98%)'

const theme = {
  plain: {
    fontSize: '0.9rem',
    backgroundColor: 'transparent',
    color: syntaxFg,
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: mono3,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: syntaxFg,
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['operator', 'boolean', 'number'],
      style: {
        color: hue62,
      },
    },
    {
      types: ['property'],
      style: {
        color: hue2,
      },
    },
    {
      types: ['tag'],
      style: {
        color: hue52,
      },
      styles: [
        {
          types: ['script'],
          style: {
            color: hue4,
          },
        },
      ],
    },
    {
      types: ['string', 'attr-value', 'identifier'],
      style: {
        color: hue4,
      },
    },
    {
      types: ['function'],
      style: {
        color: hue1,
      },
    },
    {
      types: ['selector'],
      style: {
        color: '#6679cc',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: hue6,
      },
    },
    {
      types: ['entity', 'url', 'statement', 'regex', 'atrule'],
      style: {
        color: hue1,
      },
    },
    {
      types: ['keyword', 'control', 'directive', 'unit'],
      style: {
        color: hue3,
      },
    },
    {
      types: ['placeholder', 'variable'],
      style: {
        color: hue2,
      },
    },
  ],
}

export default theme
