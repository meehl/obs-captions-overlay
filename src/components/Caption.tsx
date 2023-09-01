import { type FC } from 'react'
import { type Settings } from '../types'
import useHideOnTimeout from '../hooks/useHideOnTimeout'
import useGoogleTranslate from '../hooks/useGoogleTranslate'

type CaptionProps = Settings & {
  text: string
}

export const Caption: FC<CaptionProps> = (props) => {
  const [hide] = useHideOnTimeout({ delay: 10000 })
  const [translation] = useGoogleTranslate({
    isEnabled: props.enableTranslation,
    text: props.text,
    apiKey: props.apiKey,
    sourceLang: props.sourceLang,
    targetLang: props.targetLang,
  })

  const primaryStyle = {
    fontFamily: props.fontFamily + ', sans-serif',
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    lineHeight: props.lineHeight,
    WebkitTextStrokeWidth: props.outlineSize,
    WebkitTextStrokeColor: props.outlineColor,
    color: props.fontColor,
    backgroundColor: props.backgroundColor,
  } as const

  const secondaryStyle = {
    fontSize: props.fontSize * 0.8,
  } as const

  if (!hide) {
    return (
      <span
        className="flex flex-col opacity-70 last-of-type:opacity-100"
        style={{
          textAlign: props.textAlign as CanvasTextAlign,
          alignItems: props.textAlign,
        }}
      >
        <span className="flex flex-col rounded-lg py-1 px-3 mt-0.5" style={primaryStyle}>
          {translation && <span style={secondaryStyle}>{translation}</span>}
          <span className="before:content-['»_']">{props.text}</span>
        </span>
      </span>
    )
  } else {
    return null
  }
}
