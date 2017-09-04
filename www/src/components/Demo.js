import partial from 'lodash/partial';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';

import Layout from './Layout';

class Demo extends React.Component {
  render() {
    const { children, shortcuts } = this.props
    const { show } = this.state || {};
    let toggle = () => this.setState({ show: !show });

    return (
      <section className='demo' role='application'>
        <div className='demo-content'>
          {children}
        </div>
        {shortcuts && (
          <div className='demo-keyboard'>
            <Button bsStyle="link" onClick={toggle}>
              <i className="fa fa-keyboard-o" aria-hidden="true" />
              Keyboard shortcuts
            </Button>
            <Collapse in={!!show}>
              <div>
                <ul>
                  {shortcuts.map(({ key, label }) => (
                    <li key={key}><kbd>{key}</kbd> {label} </li>
                  ))}
                </ul>
              </div>
            </Collapse>
          </div>
        )}
      </section>
    );
  }
}

Demo.Stage = ({children}) => <div className='demo-stage'>{children}</div>;

Demo.Controls = props =>
  <Layout {...props} direction="column"  className='demo-controls' />;

Demo.Control = props => (
  <Layout {...props} pad={false} justify="flex-end" direction="column">
    {props.label && <label className='control-label'>{props.label}</label>}
    {props.children}
  </Layout>
);

export function createSetter(instance) {
  let setter = (field, value) => {
    instance.setState({ [field]: value })
  }

  return partial(partial, setter)
}


export default Demo;
