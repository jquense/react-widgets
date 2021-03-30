const { stripIndent } = require('common-tags')

module.exports = function (widgetName, values) {
  let isMany = values.length > 1
  let examples = isMany
    ? `<>
  ${values
    .map((value) => `    <ChangeExample initialValue={${value}} />`)
    .join('\n  ')}
    </>`
    : `<ChangeExample initialValue={${values[0]}} />`

  return stripIndent`
    import ${widgetName} from 'react-widgets/${widgetName}';

    function ChangeExample({ initialValue }) {
      const [value, setValue] = useState(initialValue)

      return (
        <${widgetName}
          value={value}
          onChange={value => setValue(value)}
        />
      )
    }

    ${examples}
  `
}
