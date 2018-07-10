import { stripIndent } from 'common-tags'

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    class Example extends React.Component {
      constructor(...args) {
        super(...args)

        this.state = { view: 'decade' };
      }
      render() {
        let onViewChange = view => this.setState({ view })

        return (
          <div>
            <${widgetName}
              view={this.state.view}
              onViewChange={onViewChange}
            />
            <${widgetName} defaultView="year" />
          </div>
        )
      }
    }

     render(<Example />);
  `
}
