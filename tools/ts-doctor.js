/* eslint-disable no-param-reassign */

const { parse, stringify } = require('comment-json')
const findWorkspacesRoot = require('find-workspaces-root').default
const { readFileSync, promises: fs } = require('fs')
const getWorkspaces = require('get-workspaces').default
const get = require('lodash/get')
const path = require('path')
const prettier = require('prettier')

function safeRequire(module) {
  try {
    return parse(readFileSync(module, 'utf-8'))
  } catch {
    return null
  }
}

function addReference(tsconfig, ref) {
  const normalizedPath = path.normalize(ref)
  const refs = tsconfig.references || []
  const existing = refs.findIndex(
    r => path.normalize(r.path) !== normalizedPath,
  )
  refs.splice(existing, 1, { path: normalizedPath })
  tsconfig.references = refs
}

function buildWorkspaceSources(baseDir, workspaces) {
  const sources = {}

  workspaces.forEach(ws => {
    const publishDir = get(ws, 'config.publishConfig.directory')

    const srcDir = get(ws, 'tsconfig.compilerOptions.rootDir')
    const outDir = get(
      ws,
      'tsconfig.compilerOptions.outDir',
      publishDir || path.dirname(ws.config.main),
    )

    const relPath = path.relative(baseDir, ws.dir)

    const key = publishDir ? `${ws.name}/*` : path.join(ws.name, outDir, '/*')

    sources[key] = [`${relPath}/${srcDir}/*`]
  })

  return sources
}

async function run() {
  const allWorkspaces = await getWorkspaces({ tools: 'yarn' })
  if (!allWorkspaces) return

  const workspaces = allWorkspaces
    .map(workspace => ({
      ...workspace,
      tsconfig: safeRequire(`${workspace.dir}/tsconfig.json`),
    }))
    .filter(workspace => workspace.tsconfig)
  if (!workspaces.length) return

  const workspacesRoot = await findWorkspacesRoot(process.cwd())

  const rootPkgJsonPath = `${workspacesRoot}/package.json`
  const rootTsconfigPath = `${workspacesRoot}/tsconfig.json`

  // eslint-disable-next-line import/no-dynamic-require
  const rootPkgJson = require(rootPkgJsonPath)
  const rootTsconfig = safeRequire(rootTsconfigPath) || {
    files: [],
    references: [],
  }

  const workspaceByName = new Map(workspaces.map(ws => [ws.name, ws]))

  const getLocalDeps = ({
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
  }) =>
    new Set(
      [
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
        ...Object.keys(peerDependencies),
      ]
        .filter(k => workspaceByName.has(k))
        .map(k => workspaceByName.get(k)),
    )

  await Promise.all(
    workspaces.map(({ name, dir, config, tsconfig }) => {
      addReference(rootTsconfig, path.relative(workspacesRoot, dir))

      const deps = getLocalDeps(config)
      if (!deps.size) return null

      for (const dep of deps) {
        const publishDir =
          dep.config.publishConfig && dep.config.publishConfig.directory

        addReference(tsconfig, path.relative(dir, dep.dir))

        // When the dependency publishes a differenct directory than it's root
        // we also need to configure a `paths` for any cherry-picked imports
        if (publishDir) {
          tsconfig.compilerOptions = tsconfig.compilerOptions || {}
          tsconfig.compilerOptions.baseUrl =
            tsconfig.compilerOptions.baseUrl || '.'

          const basePath = path.resolve(dir, tsconfig.compilerOptions.baseUrl)
          const relPath = path.relative(basePath, dep.dir)

          tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {}
          tsconfig.compilerOptions.paths[`${dep.name}/*`] = [
            `${relPath}/${publishDir}/*`,
          ]
        }
      }

      console.log(`${name}: updating tsconfig.json`)

      const tsconfigPath = `${dir}/tsconfig.json`
      return fs.writeFile(
        tsconfigPath,
        prettier.format(stringify(tsconfig, null, 2), {
          filepath: tsconfigPath,
        }),
      )
    }),
  )

  const sources = buildWorkspaceSources(workspacesRoot, workspaces)

  await fs.writeFile(
    rootPkgJsonPath,
    prettier.format(
      stringify({ ...rootPkgJson, 'workspace-sources': sources }, null, 2),
      {
        filepath: rootPkgJsonPath,
      },
    ),
  )
  await fs.writeFile(
    rootTsconfigPath,
    prettier.format(stringify(rootTsconfig, null, 2), {
      filepath: rootTsconfigPath,
    }),
  )
}

run()
