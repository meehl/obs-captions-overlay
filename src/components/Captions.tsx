import { type FC } from 'react'
import { type Message, type Settings, Size } from '../types'
import { Rnd, type Position } from 'react-rnd'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Caption } from './Caption'

type CaptionsProps = Settings & {
  messages: Message[]
}

const Captions: FC<CaptionsProps> = (props) => {
  const [position, setPosition] = useLocalStorage<Position>('subtitlesPosition', {
    x: 560,
    y: 875,
  })
  const [size, setSize] = useLocalStorage<Size>('subtitlesSize', {
    width: '50%',
    height: 200,
  })

  const messageItems = props.messages.map((msg) => (
    <Caption text={msg.text} key={msg.id} {...props} />
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

export default Captions
