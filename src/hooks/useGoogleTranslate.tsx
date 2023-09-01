import { useEffect, useState } from 'react'

type UseGoogleTranslateProps = {
  isEnabled: boolean
  apiKey?: string
  text: string
  sourceLang: string
  targetLang: string
}

const useGoogleTranslate = ({
  isEnabled,
  apiKey,
  text,
  sourceLang,
  targetLang,
}: UseGoogleTranslateProps) => {
  const [translation, setTranslation] = useState<string | null>(null)

  useEffect(() => {
    if (isEnabled && apiKey && text) {
      const transUrl = 'https://script.google.com/macros/s/' + apiKey + '/exec'
      const query = `${transUrl}?text=${text}&source=${sourceLang}&target=${targetLang}`
      fetch(query, { headers: { 'Content-Type': 'text/plain;charset=utf-8' } })
        .then((resp) => resp.text())
        .then((trans) => setTranslation(trans))
        .catch(() => setTranslation(null))
    } else {
      setTranslation(null)
    }
  }, [isEnabled, apiKey, text, sourceLang, targetLang])

  return [translation]
}

export default useGoogleTranslate
