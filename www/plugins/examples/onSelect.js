const { stripIndent } = require('common-tags')

module.exports = function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let alertWhenSelected = () => alert('selected!');
    let alertWhenChanged = () => alert('changed!');

    <${widgetName}
      onSelect={alertWhenSelected}
      onChange={alertWhenChanged}
      data={['Orange', 'Red', 'Blue', 'Purple']}
    />
  `
}
