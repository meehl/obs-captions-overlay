import { useCallback, useEffect, useRef, useState } from 'react'
import { TimeoutType } from '../types'

type UseHideOnMouseStopProps = {
  delay?: number
  initialHide?: boolean
}

const useHideOnMouseStop = ({ delay = 10000, initialHide = false }: UseHideOnMouseStopProps) => {
  const [hide, setHide] = useState(initialHide)
  const timeoutRef = useRef<TimeoutType | null>(null)

  const onMouseMove = useCallback(() => {
    clearTimeout(timeoutRef.current as TimeoutType)

    if (hide) {
      setHide(false)
    }

    timeoutRef.current = setTimeout(() => {
      setHide(true)
    }, delay)
  }, [hide, delay])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  return [hide]
}

export default useHideOnMouseStop
