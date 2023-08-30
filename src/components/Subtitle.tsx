import { type FC } from 'react'
import { type Settings } from '../types'
import useHideOnTimeout from '../hooks/useHideOnTimeout'

interface SubtitleProps {
  text: string
  settings: Settings
}

export const Subtitle: FC<SubtitleProps> = ({text, settings}) => {
  const [hide] = useHideOnTimeout({ delay: 10000 })

  const style = {
    fontFamily: settings.fontFamily + ', sans-serif',
    fontSize: settings.fontSize,
    fontWeight: settings.fontWeight,
    lineHeight: settings.lineHeight,
    WebkitTextStrokeWidth: settings.outlineSize,
    WebkitTextStrokeColor: settings.outlineColor,
    color: settings.fontColor,
    backgroundColor: settings.backgroundColor,
  } as const

  if (!hide) {
    return (
      <span
        className="flex opacity-70 last-of-type:opacity-100"
        style={{
          justifyContent: settings.textAlign,
          textAlign: settings.textAlign as CanvasTextAlign,
        }}
      >
        <span className="rounded-xl py-1 px-4 before:content-['»_']" style={style}>
          {text}
        </span>
      </span>
    )
  } else {
    return null
  }
}
