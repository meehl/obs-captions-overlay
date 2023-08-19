import { type FC, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { type Transcription, type SubtitleProps } from '../types'
import { useDebounce } from '../hooks/useDebounce'

const previewMessages = [
  {id: 1, key: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
  {id: 2, key: 2, text: 'Ut tellus elementum sagittis vitae et.'},
  {id: 3, key: 3, text: 'Nunc id cursus metus aliquam eleifend mi in nulla posuere.'},
  {id: 4, key: 4, text: 'Condimentum vitae sapien pellentesque habitant morbi. Proin sagittis nisl rhoncus mattis rhoncus.'},
  {id: 5, key: 5, text: 'Facilisi nullam vehicula ipsum a arcu cursus vitae.'},
  {id: 6, key: 6, text: 'Et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut.'},
  {id: 7, key: 7, text: 'Integer malesuada nunc vel risus commodo viverra.'},
  {id: 8, key: 8, text: 'In hendrerit gravida rutrum quisque non tellus orci ac auctor.'},
  {id: 9, key: 9, text: 'Dictum at tempor commodo ullamcorper a.'},
]

const getMultipleRandom = <T,>(arr: T[], num: number) => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, num)
}

let nextKey = 0

const Subtitles: FC<SubtitleProps> = (props) => {
  const [messageHistory, setMessageHistory] = useState<Transcription[]>([])
  const debouncedWsAddress = useDebounce<string>(props.wsAddress, 1000)
  const { lastJsonMessage } = useWebSocket(`ws://${debouncedWsAddress}`, {
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: Infinity,
    reconnectInterval: 10000,
  })

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessageHistory((prev) => {
        const lastMsg = lastJsonMessage as Transcription
        lastMsg.key = nextKey++
        if (prev.length > 0 && prev[prev.length - 1].id == lastMsg.id) {
          // replace last (partial) message
          const newHistory = prev.slice() // create copy
          newHistory.splice(-1, Infinity, lastMsg)
          return newHistory
        } else {
          // append new message at end and remove oldest message from front
          return prev.concat(lastMsg).slice(-1 * (props.historySize + 1));
        }
      })
    }
  }, [lastJsonMessage, props.historySize])

  useEffect(() => {
    if (props.showPreview) {
      setMessageHistory(
        getMultipleRandom(previewMessages, (props.historySize + 1))
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
    <span className="block opacity-60 last:opacity-100" key={msg.key}>
      {msg.text}
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
