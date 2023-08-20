import { type FC } from 'react'
import PropertyPanel from './components/PropertyPanel'
import Subtitles from './components/Subtitles'
import type { Settings } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import useWhisperWebsocket from './hooks/useWhisperWebsocket'
import { previewMessages, defaultSettings } from './constants'

const App: FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('properties', defaultSettings)

  const { messageHistory, connectionStatus } = useWhisperWebsocket({
    wsAddress: settings.wsAddress,
    historySize: settings.historySize,
  })

  const messages = settings.showPreview
    ? previewMessages.slice(0, settings.historySize + 1)
    : messageHistory

  return (
    <div className="App">
      <PropertyPanel data={settings} setData={setSettings} connectionStatus={connectionStatus} />
      <Subtitles settings={settings} messages={messages} />
    </div>
  )
}

export default App
