import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import RW from 'react-widgets';

import Demo, { createSetter } from '../Demo';
import Layout from '../Layout';

const cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']

module.exports = React.createClass({
  getInitialState() {
    return {
      defaultValue: 15,
      format: 'd',
      step: 1
    }
  },


  render() {
    const { format, culture, step, min, max, isRtl, disabled, readOnly } = this.state;

    let setter = createSetter(this);

    return (
      <Demo shortcuts={this.props.shortcuts}>
        <Demo.Stage>
          <RW.NumberPicker {...this.state}  />
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
                value={culture || cultures[0]}
                data={cultures}
                onChange={setter('culture')}
              />
            </Demo.Control>
            <Demo.Control flex={0.75} label="format">
              <RW.Combobox
                value={format}
                data={[
                  'd',
                  'd4',
                  'c2',
                  'p0'
                ]}
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
  },
})
