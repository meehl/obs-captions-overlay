import { type FC } from 'react'
import { type Settings } from '../types'
import useHideOnTimeout from '../hooks/useHideOnTimeout'
import useGoogleTranslate from '../hooks/useGoogleTranslate'

interface SubtitleProps {
  text: string
  settings: Settings
}

export const Subtitle: FC<SubtitleProps> = ({ text, settings }) => {
  const [hide] = useHideOnTimeout({ delay: 10000 })
  const [translation] = useGoogleTranslate({
    text,
    apiKey: settings.apiKey,
    sourceLang: settings.sourceLang,
    targetLang: settings.targetLang,
  })

  const primaryStyle = {
    fontFamily: settings.fontFamily + ', sans-serif',
    fontSize: settings.fontSize,
    fontWeight: settings.fontWeight,
    lineHeight: settings.lineHeight,
    WebkitTextStrokeWidth: settings.outlineSize,
    WebkitTextStrokeColor: settings.outlineColor,
    color: settings.fontColor,
    backgroundColor: settings.backgroundColor,
  } as const

  const secondaryStyle = {
    fontSize: settings.fontSize * 0.8,
  } as const

  if (!hide) {
    return (
      <span
        className="flex flex-col opacity-70 last-of-type:opacity-100"
        style={{
          textAlign: settings.textAlign as CanvasTextAlign,
          alignItems: settings.textAlign,
        }}
      >
        <span className="flex flex-col rounded-lg py-1 px-3 mt-0.5" style={primaryStyle}>
          {translation && <span style={secondaryStyle}>{translation}</span>}
          <span className="before:content-['»_']">{text}</span>
        </span>
      </span>
    )
  } else {
    return null
  }
}
