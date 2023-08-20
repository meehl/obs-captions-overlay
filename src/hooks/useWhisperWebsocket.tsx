import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { useDebounce } from '../hooks/useDebounce'
import { type Transcription } from '../types'

type useWhisperWebsocketProps = {
  wsAddress: string
  historySize: number
}

let nextKey = 0

const useWhisperWebsocket = ({ wsAddress, historySize }: useWhisperWebsocketProps) => {
  const [messageHistory, setMessageHistory] = useState<Transcription[]>([])
  const debouncedWsAddress = useDebounce<string>(wsAddress, 1000)
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
        const newHistory = prev.slice()

        if (prev.length > 0 && prev[prev.length - 1].id == lastMsg.id) {
          // replace last (partial) message
          newHistory.splice(-1, Infinity, lastMsg)
          return newHistory
        } else {
          // append new message at end and remove oldest message from front
          newHistory.push(lastMsg)
          while (newHistory.length > historySize) {
            newHistory.shift()
          }
          return newHistory
        }
      })
    }
  }, [lastJsonMessage, historySize])

  return { messageHistory }
}

export default useWhisperWebsocket
