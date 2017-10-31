import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import * as RW from 'react-widgets';

import Demo, { createSetter } from '../components/Demo';
import Layout from '../components/Layout';
import genData from '../components/generate-data';
import DisabledItemsInput from './DisabledItemsInput';

var list = genData(50);

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


class Multiselect extends React.Component {

  state = {
    data: list,
    value: [],
    allowCustom: true,
    placeholder: 'Type to filter items...'
  }
  handleChange = (value) => {
    this.setState({ value })
  }
  handleCreate = (tag) => {
    const { value, data } = this.state;
    const parts = tag.split(' ')
    const nextTag = {
      id: list.length + 1,
      name: tag,
      first: parts[0],
      last: parts[1] || ''
    }

    this.setState({
      data: [].concat(data, nextTag),
      value: value == null ? [nextTag]: value.concat(nextTag)
    })
  };

  render() {
    const { value, data, placeholder, groupBy, isRtl, busy, allowCustom, disabled, readOnly } = this.state;

    let setter = createSetter(this);

    let props = {
      value,
      data,
      textField: 'name',
      valueField: 'id',
      onChange: this.handleChange,
      onCreate: this.handleCreate,
      allowCreate: allowCustom ? 'onFilter' : false,
      placeholder, groupBy, isRtl, busy, disabled, readOnly,
    }


    return (
      <Demo shortcuts={this.props.shortcuts}>
        <Demo.Stage>
          <div className='form-group'>
            <RW.Multiselect {...props} />
          </div>
          <div className='form-group'>
            <label className='control-label'>Custom Rendering</label>
            <RW.Multiselect
              {...props}
              tagComponent={ItemComponent}
              itemComponent={ItemComponent}
            />
          </div>
        </Demo.Stage>
        <Demo.Controls>

          <Layout>
            <Checkbox
              checked={groupBy}
              onChange={setter('groupBy', !groupBy ? 'lastName' : null)}
            >
              group
            </Checkbox>
            <Demo.Control>
              <Checkbox
                checked={allowCustom}
                onChange={setter('allowCustom', !allowCustom)}
              >
                allow custom tags
              </Checkbox>
            </Demo.Control>
          </Layout>

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
                busy
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

          </Layout>
        </Demo.Controls>
      </Demo>
    )
  }
}


export default Multiselect;
