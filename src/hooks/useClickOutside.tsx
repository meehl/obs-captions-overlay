import { type RefObject, useEffect, useRef } from 'react'

const defaultEvents = ['mousedown', 'touchstart']

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClickOutside: (event: Event) => void,
  events: string[] = defaultEvents
): void => {
  const savedCallback = useRef(onClickOutside)

  useEffect(() => {
    savedCallback.current = onClickOutside
  }, [onClickOutside])

  useEffect(() => {
    const handler: EventListener = (event: Event) => {
      const { current: el } = ref
      ;(el != null) && !el.contains(event.target as Node) && savedCallback.current(event)
    }

    for (const eventName of events) {
      document.addEventListener(eventName, handler)
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler)
      }
    }
  }, [events, ref])
}

export default useClickOutside
