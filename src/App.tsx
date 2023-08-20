import { type FC } from 'react'
import PropertyPanel from './components/PropertyPanel'
import Subtitles from './components/Subtitles'
import type { Settings } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import useWhisperWebsocket from './hooks/useWhisperWebsocket'
import {previewMessages} from './constants'

const App: FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('properties', {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.2,
    outlineSize: 0,
    fontColor: '#ffffffff',
    outlineColor: '#000000ff',
    backgroundColor: '#00000033',
    maxWidth: 50,
    textAlign: 'center',
    wsAddress: 'localhost:12422',
    historySize: 1,
    showPreview: false,
  })

  const { messageHistory } = useWhisperWebsocket({
    wsAddress: settings.wsAddress,
    historySize: settings.historySize,
  })

  const messages = settings.showPreview
    ? previewMessages.slice(0, settings.historySize)
    : messageHistory

  return (
    <div className="App">
      <PropertyPanel data={settings} setData={setSettings} />
      <Subtitles settings={settings} messages={messages} />
    </div>
  )
}

export default App
