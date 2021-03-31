const { stripIndent } = require('common-tags')
const { isValueArray } = require('../config')

module.exports = function(widgetName) {
  let value = !isValueArray(widgetName) ? "'orange'" : "['orange', 'red']"

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let colors = ['Orange', 'Red', 'Blue', 'Purple'];

    function Example() {
      const [value, setValue] = useState(${value})

      return (
        <${widgetName}
          data={colors}
          value={value}
          onChange={value => setValue(value)}
        />
      )
    }

    <Example/>;
  `
}
