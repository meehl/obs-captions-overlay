import { useEffect, useState } from 'react'

type UseHideOnTimeoutProps = {
  delay?: number
  initialHide?: boolean
}

const useHideOnTimeout = ({ delay = 2000, initialHide = false }: UseHideOnTimeoutProps) => {
  const [hide, setHide] = useState(initialHide);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, delay);
    return () => clearTimeout(timer)
  }, [delay]);

  return [hide]
}

export default useHideOnTimeout
