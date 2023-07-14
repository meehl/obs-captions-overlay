import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export function useLocalStorage<Type>(
  key: string,
  defaultValue: Type,
): [Type, Dispatch<SetStateAction<Type>>] {
  const storedValue = localStorage.getItem(key)

  const [value, setValue] = useState<Type>(
    storedValue !== null ? (JSON.parse(storedValue) as Type) : defaultValue,
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
