import { stripIndent } from 'common-tags'
import { isValueArray } from '../config'

export default function(widgetName) {
  let value = !isValueArray(widgetName) ? "'orange'" : "['orange', 'red']"

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';
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

    render(<Example/>);
  `
}
