import { stripIndent } from 'common-tags';


export default
function(widgetName){
  return stripIndent`
    let { ${widgetName} } = ReactWidgets

    class CreateMultiselect extends React.Component {
      constructor(...args) {
        super(...args)

        this.state = {
          value: [],
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
          value: [...value, newTag],  // select new tag
          people: [...people, newTag] // add new tag to our dataset
        })
      }

      render() {
        let { value, people } = this.state;

        return (
          <Multiselect
            data={people}
            value={value}
            onCreate={name => this.handleCreate(name)}
            onChange={value => this.setState({ value })}
            textField="name"
          />
        )
      }
    }

    ReactDOM.render(<CreateMultiselect/>, mountNode);
  `
}
