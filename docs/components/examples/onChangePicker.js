import { stripIndent } from 'common-tags';

export default function(widgetName, values) {
  let isMany = values.length > 1
  let open = isMany ? '<div>' : ''
  let close = isMany ? '</div>' : ''

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

    let example${isMany ? 's' : ''} = (
      ${open}${values.map(value => `
        <ChangeExample initialValue={${value}} />`).join('')}
      ${close}
    )

    ReactDOM.render(example${isMany ? 's' : ''}, mountNode);
  `
}
