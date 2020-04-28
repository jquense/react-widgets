import addons from '@storybook/addons'
import themeDefaults from './theme-defaults'

function setThemeVars(vars) {
  Object.entries(vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}

export default function initialize() {
  const channel = addons.getChannel()

  channel.on('rw-theme-update', setThemeVars)

  setThemeVars(themeDefaults)
}
