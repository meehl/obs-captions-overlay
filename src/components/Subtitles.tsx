import { type FC } from 'react'
import { type Transcription, type Settings } from '../types'
import { Rnd, type Position } from 'react-rnd'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {Subtitle} from './Subtitle'

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
    <Subtitle text={msg.text} key={msg.id} settings={settings} />
  ))

  const containerStyle = {
    display: 'flex',
    justifyContent: position.y <= window.innerHeight / 2 ? 'start' : 'end',
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
