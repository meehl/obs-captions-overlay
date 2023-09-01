import { useEffect, useState } from 'react'
import { TimeoutType } from '../types'

type UseHideOnTimeoutProps = {
  delay?: number
  initialHide?: boolean
}

const useHideOnTimeout = ({ delay = 2000, initialHide = false }: UseHideOnTimeoutProps) => {
  const [hide, setHide] = useState(initialHide)

  useEffect(() => {
    let timer = null as TimeoutType | null
    if (delay > 0) {
      timer = setTimeout(() => setHide(true), delay)
    } else {
      setHide(false)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [delay])

  return [hide]
}

export default useHideOnTimeout
