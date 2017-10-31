import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import * as RW from 'react-widgets';

import Demo, { createSetter } from '../components/Demo';
import Layout from '../components/Layout';
import DisabledItemsInput from './DisabledItemsInput';
import genData from '../components/generate-data';

const list = genData(25);
const ICONS = ['bicycle', 'area-chart', 'anchor'];


const ItemComponent = (itemProps) => {
  const { item } = itemProps;
  return (
    <div>
      <i className={'fa fa-' + ICONS[list.indexOf(item) % 3]} />
      {'  ' + item.name}
    </div>
  );
}


class DropdownApi extends React.Component {
  state = {
    filter: 'startsWith',
  };

  render() {
    const { filter, groupBy, busy, isRtl, disabled, readOnly } = this.state;

    let setter = createSetter(this);

    var props = {
      defaultValue: 1,
      data: list,
      valueField: 'id',
      textField: 'name',
      filter, groupBy, busy, isRtl, disabled, readOnly,
    }

    return (
      <Demo shortcuts={this.props.shortcuts}>
        <Demo.Stage>
          <div className='form-group'>
            <RW.DropdownList {...props }/>
          </div>
          <div className='form-group'>
            <label className="control-label">
              Custom Rendering
            </label>

            <RW.DropdownList {...props }
              valueComponent={ItemComponent}
              itemComponent={ItemComponent}
            />
          </div>
        </Demo.Stage>
        <Demo.Controls>
          <Layout>
            <Demo.Control flex>
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
            <Demo.Control label="filter" flex>
              <RW.DropdownList
                filter={false}
                value={filter}
                data={[false, 'startsWith', 'endsWith', 'contains']}
                onChange={setter('filter')}
              />
            </Demo.Control>
          </Layout>

          <Demo.Control label='disable individual items'>
            <DisabledItemsInput
              value={disabled}
              data={list}
              valueField="id"
              textField="name"
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
                checked={groupBy}
                onChange={setter('groupBy', !groupBy ? 'lastName' : null)}
              >
                group
              </Checkbox>
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
        </Demo.Controls>
      </Demo>
    );
  }
}

export default DropdownApi;
