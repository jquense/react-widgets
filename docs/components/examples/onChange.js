import { stripIndent } from 'common-tags';

export default function(widgetName, isArray){
  let value = !isArray ? "'orange'" : "['orange', 'red']"

  return stripIndent`
    let { ${widgetName} } = ReactWidgets
    let colors = ['orange', 'red', 'blue', 'purple'];

    class Example extends React.Component {
      constructor(...args) {
        super(...args)
        this.state = { value: ${value} }
      }

      render() {
        return (
          <${widgetName}
            data={colors}
            value={this.state.value}
            onChange={value => this.setState({ value })}
          />
        )
      }
    }

    ReactDOM.render(<Example/>, mountNode);
  `
}
