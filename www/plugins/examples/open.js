const { stripIndent } = require('common-tags')

module.exports = function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let colors = ['Orange', 'Red', 'Blue', 'Purple'];

    function Example() {
      const [open, setOpen] = useState(false)

      return (
        <div>
          <button onClick={() => setOpen(prev => !prev)}>
            {open ? 'close' : 'open'}
          </button>
          <${widgetName}
            open={open}
            data={colors}
          />
        </div>
      )
    };

    <Example/>
  `
}
