import { type FC } from 'react'
import { type Transcription, type Settings } from '../types'

type SubtitlesProps = {
  settings: Settings
  messages: Transcription[]
}

const Subtitles: FC<SubtitlesProps> = ({ settings, messages }) => {
  const style = {
    fontFamily: settings.fontFamily + ', sans-serif',
    fontSize: settings.fontSize,
    fontWeight: settings.fontWeight,
    lineHeight: settings.lineHeight,
    WebkitTextStrokeWidth: settings.outlineSize,
    WebkitTextStrokeColor: settings.outlineColor,
    color: settings.fontColor,
    backgroundColor: settings.backgroundColor,
    maxWidth: String(settings.maxWidth) + '%',
    textAlign: settings.textAlign as CanvasTextAlign,
  }

  const messageItems = messages.map((msg) => (
    <span className="block opacity-60 last:opacity-100 before:content-['»_']" key={msg.key}>
      {msg.text}
    </span>
  ))

  const isHistoryEmpty = messages.length === 0

  return (
    <div className="fixed flex bottom-0 w-screen justify-center">
      {!isHistoryEmpty && (
        <div className={`rounded-xl m-1 py-2 px-6`} style={style}>
          {messageItems}
        </div>
      )}
    </div>
  )
}

export default Subtitles
