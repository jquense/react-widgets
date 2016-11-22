
export default {
  ios: typeof navigator !== 'undefined'
    && window.navigator.userAgent.match(/(iPod|iPhone|iPad)/)
    && window.navigator.userAgent.match(/AppleWebKit/)
}
