import { type FC, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { type SubtitleProps } from '../types'
import { useDebounce } from '../hooks/useDebounce'

const previewMessages = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut tellus elementum sagittis vitae et.',
  'Nunc id cursus metus aliquam eleifend mi in nulla posuere.',
  'Condimentum vitae sapien pellentesque habitant morbi. Proin sagittis nisl rhoncus mattis rhoncus.',
  'Facilisi nullam vehicula ipsum a arcu cursus vitae.',
  'Et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut.',
  'Integer malesuada nunc vel risus commodo viverra.',
  'In hendrerit gravida rutrum quisque non tellus orci ac auctor.',
  'Dictum at tempor commodo ullamcorper a.',
]

const getMultipleRandom = <T,>(arr: T[], num: number) => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, num)
}

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
      setMessageHistory((prev) => prev.concat(lastMessage).slice(-1 * (props.historySize + 1)))
    }
  }, [lastMessage, props.historySize])

  useEffect(() => {
    if (props.showPreview) {
      setMessageHistory(
        getMultipleRandom(previewMessages, (props.historySize + 1)).map(
          (msg) => new MessageEvent('message', { data: msg }),
        ),
      )
    } else {
      setMessageHistory([])
    }
  }, [props.showPreview, props.historySize])

  const style = {
    fontFamily: props.fontFamily + ', sans-serif',
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    lineHeight: props.lineHeight,
    WebkitTextStrokeWidth: props.outlineSize,
    WebkitTextStrokeColor: props.outlineColor,
    color: props.fontColor,
    backgroundColor: props.backgroundColor,
    maxWidth: String(props.maxWidth) + '%',
    textAlign: props.textAlign as CanvasTextAlign
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
        <div className={`rounded-xl m-1 py-2 px-6`} style={style}>
          {messageItems}
        </div>
      )}
    </div>
  )
}

export default Subtitles
