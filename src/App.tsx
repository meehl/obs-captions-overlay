import { type FC } from 'react'
import PropertyPanel from './components/PropertyPanel'
import Subtitles from './components/Subtitles'
import type { SubtitleProps } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'

const App: FC = () => {
  const [properties, setProperties] = useLocalStorage<SubtitleProps>('properties', {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.2,
    outlineSize: 0,
    fontColor: '#ffffffff',
    outlineColor: '#000000ff',
    backgroundColor: '#00000033',
    wsAddress: 'localhost:12422',
    historySize: 1,
    showPreview: false
  })

  return (
    <div className="App">
      <PropertyPanel data={properties} setData={setProperties} />
      <Subtitles {...properties} />
    </div>
  )
}

export default App
