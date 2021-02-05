const { stripIndent } = require('common-tags')
const { isValueArray } = require('../config')

module.exports = function (widgetName) {
  const isArray = isValueArray(widgetName)

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    const initialList = listOfPeople();

    function ${widgetName}WithCreate() {
      const [value, setValue] = useState(${isArray ? '[]' : 'null'});
      const [people, setPeople] = useState(initialList);

      function handleCreate(name) {
        let newOption = { name, id: people.length + 1 }

        // select new option
        setValue(${isArray ? '[...value, newOption]' : 'newOption'});

        // add new option to our dataset
        setPeople(data => [newOption, ...data])
      }

      return (
        <${widgetName}
          ${isArray ? '' : 'filter'}
          data={people}
          value={value}
          textField="fullName"
          allowCreate="onFilter"
          onCreate={handleCreate}
          onChange={setValue}
        />
      )
    }
  `
}
