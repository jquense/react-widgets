import React from 'react'
import { addons, types } from '@storybook/addons'
import { AddonPanel } from '@storybook/components'
import Form from 'react-formal'
import lowerCase from 'lodash/lowerCase'
import upperFirst from 'lodash/upperFirst'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import themeDefaults from './theme-defaults'
import ColorPicker from './ColorPicker'

const ADDON_ID = 'theming'
const PARAM_KEY = 'theming'
const PANEL_ID = `${ADDON_ID}/panel`

const normalizeHex = (c) => (c.length === 4 ? `${c}${c.slice(1, 4)}` : c)

const variables = mapValues(themeDefaults, (v) =>
  v.startsWith('#') ? normalizeHex(v) : v,
)

const isColor = (k, v) =>
  k.includes('color') || v.startsWith('#') || v.startsWith('rgb')

const MyPanel = ({ channel }) => {
  // console.log(variables)

  const handleChange = (value) => {
    channel.emit('rw-theme-update', value)
  }
  const groups = groupBy(Object.entries(variables), ([key]) =>
    key.match(/gray|white|black/) ? 'colors' : lowerCase(key).split(' ')[1],
  )

  return (
    <Form
      defaultValue={variables}
      style={{ padding: '2rem' }}
      onChange={handleChange}
    >
      {Object.entries(groups).map(([group, items]) => (
        <fieldset key={group}>
          <legend>{upperFirst(lowerCase(group))}</legend>
          {items.map(([key, value]) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label>
                <strong style={{ display: 'block', marginBottom: '.25rem' }}>
                  {upperFirst(
                    lowerCase(
                      group === 'colors'
                        ? key.replace(/^--rw-/, '')
                        : key.replace(/^--rw-\w+-/, ''),
                    ),
                  )}
                </strong>

                <Form.Field
                  name={key}
                  as={isColor(key, value) ? ColorPicker : 'input'}
                  // style={{ width: '100%', height: '1.6rem' }}
                />
              </label>
            </div>
          ))}
        </fieldset>
      ))}
    </Form>
  )
}

addons.register(ADDON_ID, (api) => {
  const channel = addons.getChannel()

  const render = ({ active, key }) => (
    <AddonPanel active={active} key={key}>
      <MyPanel channel={channel} />
    </AddonPanel>
  )

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Theming',
    render,
    paramKey: PARAM_KEY,
  })
})
