import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import * as RW from 'react-widgets';

import Demo, { createSetter } from '../components/Demo';
import Layout from '../components/Layout';

const cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']

const formats = [
  {
    value: { minimumFractionDigits: 2 },
    text: '2 minimum digits' },
  {
    value: { minimumFractionDigits: 5 },
    text: '5 minimum digits' },
  {
    value: { style: 'percent' },
    text: 'percentage' },
  {
    value: { currency: 'EUR', minimumFractionDigits: 2 },
    text: 'Currency (euro), 2 digits' },
]

export default class extends React.Component {
  state = {
    defaultValue: 15,
    format: formats[0],
    step: 1
  };

  render() {
    let { format, culture, step, min, max, isRtl, disabled, readOnly } = this.state;

    let setter = createSetter(this);

    return (
      <Demo shortcuts={this.props.shortcuts}>
        <Demo.Stage>
          <RW.NumberPicker
            {...this.state}
            format={format.value}
          />
        </Demo.Stage>
        <Demo.Controls>
          <Layout justify="space-between">
            <Demo.Control>
              <Checkbox
                checked={!!isRtl}
                onChange={setter('isRtl', !isRtl)}
              >
                right-to-left
              </Checkbox>
            </Demo.Control>
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
          </Layout>

          <Layout>
            <Demo.Control label='culture' flex>
              <RW.DropdownList
                filter={false}
                value={culture || cultures[0]}
                data={cultures}
                onChange={setter('culture')}
              />
            </Demo.Control>
            <Demo.Control flex={2} label="format">
              <RW.DropdownList
                filter={false}
                value={format}
                data={formats}
                textField="text"
                onChange={setter('format')}
              />
            </Demo.Control>
          </Layout>

          <Layout>
            <Demo.Control flex label='step'>
              <RW.NumberPicker
                value={step}
                onChange={setter('step')}
              />
            </Demo.Control>
            <Demo.Control flex label='min'>
              <RW.NumberPicker
                value={min}
                onChange={setter('min')}
              />
            </Demo.Control>
            <Demo.Control flex label='max'>
              <RW.NumberPicker
                value={max}
                onChange={setter('max')}
              />
            </Demo.Control>
          </Layout>
        </Demo.Controls>
      </Demo>
    )
  }
}
