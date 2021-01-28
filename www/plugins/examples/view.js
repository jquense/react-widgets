const { stripIndent } = require('common-tags')

module.exports = function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

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
