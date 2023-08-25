import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useDebounce } from '../hooks/useDebounce'
import { type Transcription } from '../types'
import { CONNECTION_STATUS } from '../constants'

type useWhisperWebsocketProps = {
  wsAddress: string
  historySize: number
}

const useWhisperWebsocket = ({ wsAddress, historySize }: useWhisperWebsocketProps) => {
  const [messageHistory, setMessageHistory] = useState<Transcription[]>([])
  const debouncedWsAddress = useDebounce<string>(wsAddress, 1000)
  const { lastJsonMessage, readyState } = useWebSocket(`ws://${debouncedWsAddress}`, {
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: Infinity,
    reconnectInterval: 10000,
  })

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessageHistory((prev) => {
        const newHistory = prev.slice()
        newHistory.push(lastJsonMessage as Transcription)
        while (newHistory.length > historySize + 1) {
          newHistory.shift()
        }
        return newHistory
      })
    }
  }, [lastJsonMessage, historySize])

  const connectionStatus = {
    [ReadyState.CONNECTING]: CONNECTION_STATUS.CONNECTING,
    [ReadyState.OPEN]: CONNECTION_STATUS.CONNECTED,
    [ReadyState.CLOSING]: CONNECTION_STATUS.DISCONNECTED,
    [ReadyState.CLOSED]: CONNECTION_STATUS.ERROR,
    [ReadyState.UNINSTANTIATED]: CONNECTION_STATUS.ERROR,
  }[readyState]

  return { messageHistory, connectionStatus }
}

export default useWhisperWebsocket
