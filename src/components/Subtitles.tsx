import { type FC } from 'react'
import { type Transcription, type Settings } from '../types'
import useHideOnTimeout from '../hooks/useHideOnTimeout'
import { Rnd, type Position } from 'react-rnd'
import { useLocalStorage } from '../hooks/useLocalStorage'

type MessageProps = {
  text: string
  settings: Settings
}

const Message: FC<MessageProps> = ({ text, settings }) => {
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
        className="flex opacity-60 last-of-type:opacity-100"
        style={{ justifyContent: settings.textAlign }}
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

type Size = {
  width: string | number
  height: string | number
}

type SubtitlesProps = {
  settings: Settings
  messages: Transcription[]
}

const Subtitles: FC<SubtitlesProps> = ({ settings, messages }) => {
  const [position, setPosition] = useLocalStorage<Position>('position', {
    x: 560,
    y: 875,
  })
  const [size, setSize] = useLocalStorage<Size>('size', {
    width: '50%',
    height: 200,
  })

  const messageItems = messages.map((msg) => (
    <Message text={msg.text} key={msg.key} settings={settings} />
  ))

  const containerStyle = {
    display: 'flex',
    justifyContent: position.y <= (window.innerHeight / 2) ? 'start' : 'end'
  }

  return (
    <Rnd
      position={position}
      size={size}
      onDragStop={(_, d) => {
        setPosition({ x: d.x, y: d.y })
      }}
      onResizeStop={(_e, _direction, ref) => {
        setSize({ width: ref.style.width, height: ref.style.height })
      }}
      bounds={'window'}
      className="flex-col hover:border-2 border-red-600"
      style={containerStyle}
    >
      {messageItems}
    </Rnd>
  )
}

export default Subtitles
