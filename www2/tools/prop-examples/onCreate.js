const { stripIndent } = require('common-tags')
const { isValueArray } = require('../config')

module.exports = function(widgetName) {
  const isArray = isValueArray(widgetName)

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    class Create${widgetName} extends React.Component {
      constructor(...args) {
        super(...args)

        this.state = {
          value: ${isArray ? '[]' : 'null'},
          people: listOfPeople(),
        }
      }

      handleCreate(name) {
        let { people, value } = this.state;

        let newOption = {
          name,
          id: people.length + 1
        }

        this.setState({
          value: ${
            isArray ? '[...value, newOption]' : 'newOption'
          },  // select new option
          people: [...people, newOption] // add new option to our dataset
        })
      }

      render() {
        let { value, people } = this.state;

        return (
          <${widgetName} ${isArray ? '' : 'filter'}
            data={people}
            value={value}
            allowCreate="onFilter"
            onCreate={name => this.handleCreate(name)}
            onChange={value => this.setState({ value })}
            textField="name"
          />
        )
      }
    }

    render(<Create${widgetName}/>);
  `
}
