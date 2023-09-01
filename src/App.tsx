import { type FC } from 'react'
import Captions from './components/Captions'
import { useLocalStorage } from './hooks/useLocalStorage'
import useWhisperWebsocket from './hooks/useWhisperWebsocket'
import { previewMessages } from './constants'
import { defaults } from './config'
import SettingsPanel from './components/SettingsPanel'

const App: FC = () => {
  const [fontFamily, setFontFamily] = useLocalStorage<string>('fontFamily', defaults.fontFamily)
  const [fontSize, setFontSize] = useLocalStorage<number>('fontSize', defaults.fontSize)
  const [fontWeight, setFontWeight] = useLocalStorage<number>('fontWeight', defaults.fontWeight)
  const [lineHeight, setLineHeight] = useLocalStorage<number>('lineHeight', defaults.lineHeight)
  const [outlineSize, setOutlineSize] = useLocalStorage<number>('outlineSize', defaults.outlineSize)
  const [fontColor, setFontColor] = useLocalStorage<string>('fontColor', defaults.fontColor)
  const [outlineColor, setOutlineColor] = useLocalStorage<string>(
    'outlineColor',
    defaults.outlineColor,
  )
  const [backgroundColor, setBackgroundColor] = useLocalStorage<string>(
    'backgroundColor',
    defaults.backgroundColor,
  )
  const [textAlign, setTextAlign] = useLocalStorage<string>('textAlign', defaults.textAlign)
  const [wsAddress, setWsAddress] = useLocalStorage<string>('wsAddress', defaults.wsAddress)
  const [historySize, setHistorySize] = useLocalStorage<number>('historySize', defaults.historySize)
  const [showPreview, setShowPreview] = useLocalStorage<boolean>(
    'showPreview',
    defaults.showPreview,
  )
  const [apiKey, setApiKey] = useLocalStorage<string>('apiKey', defaults.apiKey)
  const [sourceLang, setSourceLang] = useLocalStorage<string>('sourceLang', defaults.sourceLang)
  const [targetLang, setTargetLang] = useLocalStorage<string>('targetLang', defaults.targetLang)

  const settings = {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    outlineSize,
    fontColor,
    outlineColor,
    backgroundColor,
    textAlign,
    wsAddress,
    historySize,
    showPreview,
    apiKey,
    sourceLang,
    targetLang,
  }

  const { messageHistory } = useWhisperWebsocket({
    wsAddress: wsAddress,
    historySize: historySize,
  })

  const messages = showPreview ? previewMessages.slice(0, historySize + 1) : messageHistory

  return (
    <div className="App">
      <SettingsPanel
        {...settings}
        setFontFamily={setFontFamily}
        setFontSize={setFontSize}
        setFontWeight={setFontWeight}
        setLineHeight={setLineHeight}
        setOutlineSize={setOutlineSize}
        setFontColor={setFontColor}
        setOutlineColor={setOutlineColor}
        setBackgroundColor={setBackgroundColor}
        setTextAlign={setTextAlign}
        setWsAddress={setWsAddress}
        setHistorySize={setHistorySize}
        setShowPreview={setShowPreview}
        setApiKey={setApiKey}
        setSourceLang={setSourceLang}
        setTargetLang={setTargetLang}
      />
      <Captions
        messages={messages}
        {...settings}
      />
    </div>
  )
}

export default App
