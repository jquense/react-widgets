import { stripIndent } from 'common-tags';


export default function(widgetName){
  return stripIndent`
    let { ${widgetName} } = ReactWidgets
    let colors = ['orange', 'red', 'blue', 'purple'];

    class Example extends React.Component {
      render() {
        let { open } = this.state || {};
        let toggleWidget = () => this.setState({ open: !open });

        return (
          <div>
            <button onClick={toggleWidget}>
              {open ? 'close' : 'open'}
            </button>
            <${widgetName}
              open={open}
              data={colors}
              onToggle={()=>{}}
            />
          </div>
        )
      }
    };

    ReactDOM.render(<Example/>, mountNode);
  `
}
