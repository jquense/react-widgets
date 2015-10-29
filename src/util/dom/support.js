
export default {
  ios: typeof navigator !== 'undefined'
    && navigator.userAgent.match(/(iPod|iPhone|iPad)/)
    && navigator.userAgent.match(/AppleWebKit/)
}
