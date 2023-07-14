import { type FC, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { type SubtitleProps } from '../types'
import { useDebounce } from '../hooks/useDebounce'

const Subtitles: FC<SubtitleProps> = (props) => {
  const [, setMessageHistory] = useState<MessageEvent[]>([])
  const debouncedWsAddress = useDebounce<string>(props.wsAddress, 1000)
  const { lastMessage, readyState } = useWebSocket(`ws://${debouncedWsAddress}`, {
    retryOnError: true,
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: Infinity,
    reconnectInterval: 10000,
  })

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage))
    }
  }, [lastMessage])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  const style = {
    fontFamily: props.fontFamily,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    lineHeight: props.lineHeight,
    WebkitTextStrokeWidth: props.outlineSize,
    WebkitTextStrokeColor: props.outlineColor,
    color: props.fontColor,
    backgroundColor: props.backgroundColor,
  }

  return (
    <div className='fixed flex bottom-0 p-2 w-screen justify-center'>
      <div className='rounded-xl text-center p-2 w-[50%]' style={style}>
        {connectionStatus}: {lastMessage !== null ? String(lastMessage.data) : 'Sed maiores quos voluptas corrupti nobis fugit. Ratione tempore nisi cum accusamus. Explicabo debitis ea id est consequuntur soluta'}
        
      </div>
    </div>
  )
}

export default Subtitles
