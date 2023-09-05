import { type FC } from 'react'
import { type Message, type Settings, Size } from '../types'
import { Rnd, type Position } from 'react-rnd'
import useLocalStorage from '../hooks/useLocalStorage'
import { Caption } from './Caption'

const initialWidth = Math.floor(window.innerWidth * 0.5)
const initialHeight = Math.floor(window.innerHeight * 0.18)

type CaptionsProps = Settings & {
  messages: Message[]
}

const Captions: FC<CaptionsProps> = (props) => {
  const [position, setPosition] = useLocalStorage<Position>('captionsPosition', {
    x: Math.floor((window.innerWidth - initialWidth) * 0.5),
    y: Math.floor(window.innerHeight - initialHeight),
  })
  const [size, setSize] = useLocalStorage<Size>('captionsSize', {
    width: initialWidth,
    height: initialHeight,
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
