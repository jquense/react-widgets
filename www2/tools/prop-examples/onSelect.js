const { stripIndent } = require('common-tags')

module.exports = function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let alertWhenSelected = () => alert('selected!');
    let alertWhenChanged = () => alert('changed!');

    let widget = (
      <${widgetName}
        onSelect={alertWhenSelected}
        onChange={alertWhenChanged}
        data={['orange', 'red', 'blue', 'purple']}
      />
    )

    render(widget);
  `
}
