import { RefObject, useEffect } from 'react'

export default function useAutoFocus(
  autoFocus: boolean,
  ref: RefObject<HTMLElement>,
) {
  useEffect(() => {
    if (autoFocus && ref.current) ref.current.focus()
  }, [])
}
