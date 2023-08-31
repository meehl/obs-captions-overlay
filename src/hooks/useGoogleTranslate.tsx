import { useEffect, useState } from 'react'

type UseGoogleTranslateProps = {
  apiKey?: string
  text: string
  sourceLang: string
  targetLang: string
}

const useGoogleTranslate = ({ apiKey, text, sourceLang, targetLang }: UseGoogleTranslateProps) => {
  const [translation, setTranslation] = useState<string | null>(null)

  useEffect(() => {
    if (apiKey) {
      const transUrl = 'https://script.google.com/macros/s/' + apiKey + '/exec'
      const query = `${transUrl}?text=${text}&source=${sourceLang}&target=${targetLang}`
      console.log(query)
      fetch(query, { headers: { 'Content-Type': 'text/plain;charset=utf-8' } })
        .then((resp) => resp.text())
        .then((trans) => setTranslation(trans))
        .catch(() => setTranslation(null))
    }
  }, [apiKey, text, sourceLang, targetLang])

  if (!apiKey) {
    return [null]
  }
  return [translation]
}

export default useGoogleTranslate
