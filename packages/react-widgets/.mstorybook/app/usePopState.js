import React, { useState, useEffect, useMemo, createContext } from 'react'
import { render } from 'react-dom'

export const RouterContext = createContext(null)

export default function usePopState() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    query: new URLSearchParams(window.location.search),
    state: history.state,
  }))

  useEffect(() => {
    const listener = (e) => {
      debugger
      setLocation({
        pathname: window.location.pathname,
        query: new URLSearchParams(window.location.search),
        state: e.state,
      })
    }
    window.addEventListener('popstate', listener)
    return () => window.removeEventListener('popstate', listener)
  }, [])

  return [
    location,
    useMemo(
      () => ({
        push({ pathname, query, state }) {
          setLocation({ pathname, query, state })
          window.history.pushState(state, '', pathname)
        },
        replace({ pathname, query, state }) {
          setLocation({ pathname, query, state })
          window.history.replaceState(state, '', pathname)
        },
      }),
      [setLocation],
    ),
  ]
}
