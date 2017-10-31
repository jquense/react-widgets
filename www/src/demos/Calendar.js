import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import * as RW from 'react-widgets';

import Demo, { createSetter } from '../components/Demo';
import Layout from '../components/Layout';

export const VIEWS = ['month', 'year', 'decade', 'century'];
export const CULTURES = ['en', 'en-GB', 'es', 'fr', 'ar-AE']


export default class CalendarDemo extends React.Component {
  state =  {
    format: '',
    footer: true,
    views: VIEWS,
  }

  render() {
    const { views, min, max, footer, culture, isRtl, disabled, readOnly } = this.state;

    let setter = createSetter(this)

    return (
      <Demo shortcuts={this.props.shortcuts}>
        <Demo.Stage>
          <RW.Calendar {...this.state} />
        </Demo.Stage>
        <Demo.Controls >
          <Layout justify="space-between">
            <Demo.Control label='culture' flex>
              <RW.DropdownList
                value={culture || CULTURES[0]}
                data={CULTURES}
                onChange={setter('culture')}
              />
            </Demo.Control>

            <Demo.Control flex>
              <ButtonGroup>
                <Button
                  active={disabled}
                  onClick={setter('disabled', !disabled)}
                >
                  Disable
                </Button>
                <Button
                  active={readOnly}
                  onClick={setter('readOnly', !readOnly)}
                >
                  Readonly
                </Button>
              </ButtonGroup>
            </Demo.Control>
          </Layout>

          <Demo.Control label="views" flex>
            <RW.Multiselect
              value={views.length ? views : ['month']}
              data={VIEWS}
              onChange={(views) => setter('views')(
                VIEWS.filter(v => ~views.indexOf(v) // correct order
              ))}
            />
          </Demo.Control>
          <Demo.Control label="min" >
            <RW.DateTimePicker
              time={false}
              format={{ date: 'medium' }}
              value={min}
              onChange={setter('min')}
            />
          </Demo.Control>
          <Demo.Control label="max">
            <RW.DateTimePicker
              time={false}
              value={max}
              format={{ date: 'medium' }}
              onChange={setter('max')}
            />
          </Demo.Control>
          <Layout justify="flex-start">
            <Demo.Control>
              <Checkbox
                inline
                checked={!!isRtl}
                onChange={setter('isRtl', !isRtl)}
              >
                right-to-left
              </Checkbox>
            </Demo.Control>
            <Demo.Control>
              <Checkbox
                inline
                checked={footer}
                onChange={setter('footer', !footer)}
              >
                footer
              </Checkbox>
            </Demo.Control>
          </Layout>
        </Demo.Controls>
      </Demo>
    )
  }
}
