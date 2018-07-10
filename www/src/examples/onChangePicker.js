import { stripIndent } from 'common-tags'

export default function(widgetName, values) {
  let isMany = values.length > 1
  let examples = isMany
    ? `<>
  ${values
    .map(value => `      <ChangeExample initialValue={${value}} />`)
    .join('\n  ')}
      </>`
    : `<ChangeExample initialValue={${values[0]}} />`

  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

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
