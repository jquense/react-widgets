import React, { useState } from 'react'
import { css } from 'astroturf'
import { ChromePicker } from 'react-color'
import usePopper from 'react-overlays/usePopper'

const elStyles = css`
  .picker {
    display: grid;
    grid-gap: 4px;
    grid-template: 1fr / 1fr 38px;
  }

  .swatch {
    border-radius: 3px;
  }
`

// function toColorProps(value) {
//   if (value.startsWith('#')) return { hex: value }
//   if (value.startsWith('rgb')) return { rgb: value }
//   if (value.startsWith('3')) return { hex: value }
// }

function getColor({ hex, rgb }) {
  if (rgb.a === 1) return hex
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
}
function ColorPicker({ value, onChange }) {
  const [show, setShow] = useState(false)

  const [popper, attachPopper] = useState(null)

  const [reference, attachReference] = useState(null)

  const { styles } = usePopper(reference, popper, {
    placement: 'bottom-start',
  })

  return (
    <>
      <div className={elStyles.picker}>
        <input value={value ?? ''} onChange={onChange} />
        <button
          ref={attachReference}
          onClick={() => setShow((p) => !p)}
          style={{ backgroundColor: value }}
          className={elStyles.swatch}
        />
      </div>
      {show && (
        <div style={styles} ref={attachPopper}>
          <ChromePicker
            color={value}
            onChangeComplete={(color) => onChange(getColor(color))}
          />
        </div>
      )}
    </>
  )
}

export default ColorPicker
