import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import * as RW from 'react-widgets';

import Demo, { createSetter } from '../components/Demo';
import Layout from '../components/Layout';
import DisabledItemsInput from './DisabledItemsInput';

let i = 0
let list = [
  { id: i++, name: 'Jacinda' },
  { id: i++, name: 'Jane' },
  { id: i++, name: 'Jase' },
  { id: i++, name: 'Jackie' },
  { id: i++, name: 'Jason' },
  { id: i++, name: 'Jimmy' },
  { id: i++, name: 'Jimmy Smith' },
  { id: i++, name: 'John' },
  { id: i++, name: 'Joanne' }
];

const ICONS = ['bicycle', 'area-chart', 'anchor'];

const GroupBy = item => item.name.substr(0, 2);

const ItemComponent = (itemProps) => {
  const { item } = itemProps;
  return (
    <div>
      <i className={'fa fa-' + ICONS[list.indexOf(item) % 3]} />
      {'  ' + item.name}
    </div>
  );
}

export default class extends React.Component {
  state = {
    suggest: true
  };

  render() {
    const { filter, suggest, groupBy, busy, isRtl, disabled, readOnly } = this.state;

    let setter = createSetter(this);

    var props = {
      data: list,
      defaultValue: 1,
      textField: 'name',
      valueField: 'id',
      ...this.state,
    }

    return (
      <Demo shortcuts={this.props.shortcuts}>
        <Demo.Stage>
          <div className='form-group'>
            <RW.Combobox {...props}/>
          </div>
          <div className='form-group'>
            <label className='control-label'>Custom list Rendering</label>
            <RW.Combobox
              {...props}
              itemComponent={ItemComponent}
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

          <Layout>
            <Demo.Control label="filter" flex>
              <RW.DropdownList
                filter={false}
                value={filter || false}
                data={[false, 'startsWith', 'endsWith', 'contains']}
                onChange={setter('filter')}
              />
            </Demo.Control>
            <Demo.Control flex>
              <Checkbox
                checked={suggest}
                onChange={setter('suggest', !suggest)}
              >
                Suggestions
              </Checkbox>
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
                onChange={setter('groupBy', !groupBy ? GroupBy : null)}
              >
                group
              </Checkbox>
            </Demo.Control>
          </Layout>
        </Demo.Controls>
      </Demo>
    )
  }
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
