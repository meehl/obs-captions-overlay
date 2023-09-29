import { type FC } from 'react'
import { type Message, type Settings, type Size, type RelativePosition } from '../types'
import { Rnd } from 'react-rnd'
import useLocalStorage from '../hooks/useLocalStorage'
import useWindowSize from '../hooks/useWindowSize'
import { Caption } from './Caption'
import { absToRelWindowPosition, relToAbsWindowPosition } from '../utils'

type CaptionsProps = Settings & {
  messages: Message[]
}

const Captions: FC<CaptionsProps> = (props) => {
  const [windowSize] = useWindowSize()
  const [relPosition, setRelPosition] = useLocalStorage<RelativePosition>('captionsRelPosition', {
    bottom: 0.0,
    left: 0.25,
  })
  const [size, setSize] = useLocalStorage<Size>('captionsSize', {
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.2,
  })

  const absPosition = relToAbsWindowPosition(relPosition, windowSize, size)

  const messageItems = props.messages.map((msg) => (
    <Caption text={msg.text} key={msg.id} {...props} />
  ))

  const containerStyle = {
    display: 'flex',
    justifyContent: typeof relPosition.top !== 'undefined' ? 'start' : 'end',
  }

  return (
    <Rnd
      position={absPosition}
      size={size}
      onDragStop={(_, d) => {
        setRelPosition(absToRelWindowPosition({ x: d.x, y: d.y }, windowSize, size))
      }}
      onResizeStop={(_e, _direction, ref) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight })
      }}
      bounds={'window'}
      className="flex-col hover:border-2 border-red-600 p-2"
      style={containerStyle}
    >
      {messageItems}
    </Rnd>
  )
}

export default Captions
