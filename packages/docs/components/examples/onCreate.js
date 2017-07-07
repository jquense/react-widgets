import { stripIndent } from 'common-tags';


export default function(widgetName, isArray = true) {

  return stripIndent`
    let { ${widgetName} } = ReactWidgets

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

        let newTag = {
          name,
          id: people.length + 1
        }

        this.setState({
          value: ${isArray ? '[...value, newTag]' : 'newTag'},  // select new tag
          people: [...people, newTag] // add new tag to our dataset
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

    ReactDOM.render(<Create${widgetName}/>, mountNode);
  `
}
