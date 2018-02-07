import { stripIndent } from 'common-tags';

export default function(widgetName){
 return stripIndent`
    let { ${widgetName} } = ReactWidgets;
    let values = [false, 'date', 'time'];

    class Example extends React.Component {
      render() {
        let { open } = this.state || {}
        let toggle = e => this.setState({ open: e.target.value });

        return (
          <div>
            {values.map((value, idx) =>
              <label key={idx} className='radio-inline'>
                <input
                  name='open-option'
                  type='radio'
                  value={value}
                  onChange={toggle}
                />
                {'' + value}
              </label>
            )}
            <${widgetName} open={open} />
          </div>
        )
      }
    };

    ReactDOM.render(<Example/>, mountNode);
  `
}
