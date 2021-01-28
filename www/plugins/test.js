module.exports = () => {
  return {
    name: 'test-plugin',
    contentLoaded({ allContent }) {
      console.log(
        'HERE',
        allContent['docusaurus-plugin-content-docs'].default.loadedVersions[0],
      )
      return
    },
    configureWebpack() {},
  }
}
