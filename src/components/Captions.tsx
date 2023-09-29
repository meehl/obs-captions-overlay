import { type FC } from 'react'
import { type Message, type Settings, type RelativePosition, RelativeSize } from '../types'
import { Rnd } from 'react-rnd'
import useLocalStorage from '../hooks/useLocalStorage'
import useWindowSize from '../hooks/useWindowSize'
import { Caption } from './Caption'
import {
  absToRelSize,
  absToRelWindowPosition,
  relToAbsSize,
  relToAbsWindowPosition,
} from '../utils'

type CaptionsProps = Settings & {
  messages: Message[]
}

const Captions: FC<CaptionsProps> = (props) => {
  const [windowSize] = useWindowSize()
  const [relSize, setRelSize] = useLocalStorage<RelativeSize>('captionsRelSize', {
    width: 0.5,
    height: 0.2,
  })
  const [relPosition, setRelPosition] = useLocalStorage<RelativePosition>('captionsRelPosition', {
    bottom: 0.0,
    left: 0.25,
  })
  const absSize = relToAbsSize(relSize, windowSize)
  const absPosition = relToAbsWindowPosition(relPosition, windowSize, absSize)

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
      size={absSize}
      onDragStop={(_, d) => {
        setRelPosition(absToRelWindowPosition({ x: d.x, y: d.y }, windowSize, absSize))
      }}
      onResizeStop={(_e, _direction, ref) => {
        setRelSize(absToRelSize({ width: ref.offsetWidth, height: ref.offsetHeight }, windowSize))
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
