import { stripIndent } from 'common-tags';


export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    let formats = [
      'MMM d yyyy',
      'MMM d yy',
      'd'
    ];

    let widgets = (
      <div>
        <${widgetName} parse={formats}/>

        {/* the naive approach: just use the Date constructor */}
        <${widgetName} parse={str => new Date(str)}/>
        <span>Try typing a date using the specified formats</span>
      </div>
    )

    ReactDOM.render(widgets, mountNode);
  `
}
