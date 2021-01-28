const findCacheDir = require('find-cache-dir')
const fs = require('fs')
const VirtualModulePlugin = require('astroturf/VirtualModulePlugin').default
const cacheDir = findCacheDir({ name: 'astroturf-loader' })

class CacheVirtualModulePlugin extends VirtualModulePlugin {
  constructor() {
    super()

    this.cache = Object.create(null)

    try {
      fs.mkdirSync(cacheDir, { recursive: true })
    } catch {
      /* ignore */
    }

    try {
      this.files = JSON.parse(fs.readFileSync(`${cacheDir}/styles.json`))

      // console.log('HYDRATE!', this.files)
    } catch {
      this.files = null
    }
  }

  writeAndCache(filePath, contents) {
    // console.log('CACHE!', filePath)
    if (!this.cache[filePath] || this.cache[filePath] !== contents) {
      this.dirty = true
    }

    this.cache[filePath] = contents
    return this.writeModule(filePath, contents)
  }

  apply(compiler) {
    super.apply(compiler)
    let first = true
    compiler.hooks.afterEnvironment.tap('CacheVirtualModulePlugin', () => {
      VirtualModulePlugin.augmentFileSystem(compiler)
    })

    compiler.hooks.compilation.tap(
      'CacheVirtualModulePlugin',
      (compilation) => {
        compilation.hooks.normalModuleLoader.tap(
          'LoaderPlugin',
          (loaderContext) => {
            loaderContext.emitVirtualFile = this.writeAndCache.bind(this)
          },
        )
      },
    )

    compiler.hooks.watchRun.tap('CacheVirtualModulePlugin', () => {
      // console.log('watch start')

      if (first) {
        first = false
        this.cache = Object.create(null)
      }
    })

    compiler.hooks.afterResolvers.tap('CacheVirtualModulePlugin', () => {
      if (this.files) {
        console.log('ADD FILES')
        for (const [filePath, contents] of Object.entries(this.files)) {
          this.writeModule(filePath, contents)
        }
        this.files = null
      }
    })

    compiler.hooks.done.tap('CacheVirtualModulePlugin', () => {
      // console.log('writing out file', cacheDir)

      try {
        if (this.dirty) {
          // console.log(
          //   'writing out file',
          //   `${cacheDir}/styles.json`,
          //   JSON.stringify(this.cache),
          // )

          fs.writeFileSync(
            `${cacheDir}/styles.json`,
            JSON.stringify(this.cache),
          )
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.dirty = false
      }
    })
  }
}

module.exports = (ctx, options = {}) => {
  return {
    name: 'astroturf-plugin',
    configureWebpack() {
      console.log('HERE')
      return {
        plugins: [new CacheVirtualModulePlugin()],
        module: {
          rules: [
            {
              test: /\.(j|t)sx?$/,
              exclude: /node_modules/,
              use: {
                loader: 'astroturf/loader',
                options: { extension: '.module.css', ...options },
              },
            },
          ],
        },
      }
    },
  }
}
