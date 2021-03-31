import { css } from 'astroturf'
import pickBy from 'lodash/pickBy'

export default pickBy(
  css`
    @use "sass:meta" as meta;
    @use '~react-widgets/src/scss/variables.scss' as rw;

    :export {
      @each $name, $value in meta.module-variables('rw') {
        --rw-#{$name}: #{$value};
      }
    }
  `,
  (v, k) => k.startsWith('--'),
)
