import { type FC, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { type SubtitleProps } from '../types'
import { useDebounce } from '../hooks/useDebounce'

const Subtitles: FC<SubtitleProps> = (props) => {
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([])
  const debouncedWsAddress = useDebounce<string>(props.wsAddress, 1000)
  const { lastMessage } = useWebSocket(`ws://${debouncedWsAddress}`, {
    retryOnError: true,
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: Infinity,
    reconnectInterval: 10000,
  })

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage).slice(-1 * props.historySize))
    }
  }, [lastMessage, props.historySize])

  const style = {
    fontFamily: props.fontFamily + ', sans-serif',
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    lineHeight: props.lineHeight,
    WebkitTextStrokeWidth: props.outlineSize,
    WebkitTextStrokeColor: props.outlineColor,
    color: props.fontColor,
    backgroundColor: props.backgroundColor,
  }

  const messageItems = messageHistory.map((msg) => (
    <span className="block opacity-60 last:opacity-100" key={msg.lastEventId}>
      {msg.data}
    </span>
  ))

  const isHistoryEmpty = messageHistory.length === 0

  return (
    <div className="fixed flex bottom-0 w-screen justify-center">
      {!isHistoryEmpty && (
        <div className="rounded-xl text-center m-1 py-2 px-6" style={style}>
          {messageItems}
        </div>
      )}
    </div>
  )
}

export default Subtitles
