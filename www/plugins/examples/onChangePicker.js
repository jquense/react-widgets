const { stripIndent } = require('common-tags')

module.exports = function(widgetName, values) {
  let isMany = values.length > 1
  let examples = isMany
    ? `<>
  ${values
    .map(value => `      <ChangeExample initialValue={${value}} />`)
    .join('\n  ')}
      </>`
    : `<ChangeExample initialValue={${values[0]}} />`

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    class ChangeExample extends React.Component {
      constructor(...args) {
        super(...args)
        this.state = { value: this.props.initialValue }
      }
      render() {
        return (
          <${widgetName}
            value={this.state.value}
            onChange={value => this.setState({ value })}
          />
        )
      }
    }

    render(
      ${examples}
    );
  `
}
