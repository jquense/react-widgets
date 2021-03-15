import './styles.css'
import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from 'react'
import { render } from 'react-dom'
import usePopState, { RouterContext } from './usePopState'
import '../setup'

const storyRequire = require.context('../../stories', false, /\.(j|t)sx?$/)

const stories = []
storyRequire.keys().forEach((filePath) => {
  const module = storyRequire(filePath)
  const dflt = module.default
  stories.push({
    title:
      dflt?.title ||
      filePath.slice(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.')),
    items: Object.entries(module)
      .filter(
        ([ident, story]) =>
          !name.startsWith('_') && typeof story === 'function',
      )
      .map(([ident, story]) => [story.storyName || ident, story]),
  })
})

const Link = ({ href, ...props }) => {
  const router = useContext(RouterContext)
  return (
    <a
      href={href}
      {...props}
      className="font-medium text-gray-700 hover:text-opacity-70"
      onClick={(e) => {
        props.onClick?.(e)

        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.altKey ||
          e.ctrlKey ||
          e.shiftKey
        )
          return

        e.preventDefault()
        router.push({ pathname: href })
      }}
    />
  )
}

function App({ stories, children }) {
  const [location, router] = usePopState()
  const CurrentStory = useMemo(() => {
    for (const s of stories) {
      for (const [name, story] of s.items) {
        if (location.pathname === `/${s.title}/${name}`) return story
      }
    }
    return null
  }, [location, stories])

  return (
    <RouterContext.Provider value={router}>
      <div className="container-md vh-100 w-full min-h-full grid grid-cols-12 overflow-y-auto">
        <div className="col-span-3 px-4 py-6 bg-blue-100 border-r border-blue-200">
          <ul>
            {stories.map(({ title, items }) => (
              <li key={title}>
                <details>
                  <summary className="mb-2 font-bold">{title}</summary>
                  <ul className="pl-4">
                    {items.map(([name, story]) => (
                      <li key={name}>
                        <Link href={`/${title}/${name}`}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </div>
        <main className="col-span-9 flex flex-col items-center mt-40">
          <div className="max-w-sm">
            {CurrentStory ? <CurrentStory /> : null}
          </div>
        </main>
      </div>
    </RouterContext.Provider>
  )
}

render(<App stories={stories} />, document.getElementById('app'))
