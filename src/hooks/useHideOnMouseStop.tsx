import { useCallback, useEffect, useState } from 'react'

type UseHideOnMouseStopProps = {
  delay?: number
  initialHide?: boolean
}

let timerId: ReturnType<typeof setTimeout>

const useHideOnMouseStop = ({ delay = 2000, initialHide = false }: UseHideOnMouseStopProps) => {
  const [hide, setHide] = useState(initialHide)

  const onMouseMove = useCallback(() => {
    clearTimeout(timerId)

    if (hide) {
      setHide(false)
    }

    timerId = setTimeout(() => {
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
