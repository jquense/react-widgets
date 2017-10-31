import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import * as RW from 'react-widgets';

import Demo, { createSetter } from '../components/Demo';
import Layout from '../components/Layout';
import DisabledItemsInput from './DisabledItemsInput';

var list = [
        { label: 'orange', id: 1 },
        { label: 'blue',   id: 2 },
        { label: 'red',    id: 3 },
        { label: 'maroon', id: 4 },
        { label: 'purple', id: 5 },
        { label: 'mauve',  id: 6 }
      ];

class SelectListApi extends React.Component {
  state = {
    defaultValue: list[0]
  };

  render() {
    const { multiple, busy, isRtl, disabled, readOnly } = this.state;

    let setter = createSetter(this);

    return (
      <Demo shortcuts={this.props.shortcuts}>
        <Demo.Stage>
          <div className='form-group'>
            <RW.SelectList
              data={list}
              valueField='id'
              textField='label'
              {...this.state}
            />
          </div>
        </Demo.Stage>
        <Demo.Controls>
          <Layout>
            <Demo.Control>
              <ButtonGroup>
                <Button
                  active={disabled === true}
                  onClick={() => this.setState({
                    disabled: disabled === true ? false : true,
                    readOnly: false,
                  })}
                >
                  Disable
                </Button>
                <Button
                  active={readOnly}
                  onClick={() => this.setState({
                    readOnly: !readOnly,
                    disabled: false,
                  })}
                >
                  Readonly
                </Button>
              </ButtonGroup>
            </Demo.Control>
            <Demo.Control>
              <Checkbox
                checked={busy}
                onClick={setter('busy', !busy)}
              >
                Busy
              </Checkbox>
            </Demo.Control>
          </Layout>

          <Demo.Control label='disable individual items'>
            <DisabledItemsInput
              value={disabled}
              data={list}
              valueField="id"
              textField="label"
              onChange={disabled => this.setState({
                disabled,
                readOnly: false,
              })}
            />
          </Demo.Control>

          <Layout>
            <Demo.Control>
              <Checkbox
                checked={!!isRtl}
                onChange={setter('isRtl', !isRtl)}
              >
                right-to-left
              </Checkbox>
            </Demo.Control>
            <Demo.Control>
              <Checkbox
                checked={multiple}
                onChange={setter('multiple', !multiple)}
              >
                multiple
              </Checkbox>
            </Demo.Control>
          </Layout>
        </Demo.Controls>
      </Demo>
    );
  }
}

export default SelectListApi;
