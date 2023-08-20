import { type FC, type Dispatch, type SetStateAction } from 'react'
import { HexAlphaColorPicker } from 'react-colorful'
import { type Settings } from '../types'
import { ColorPickerPopup } from './ColorPickerPopup'
import { CONNECTION_STATUS, defaultSettings } from '../constants'

type PropertyPanelProps = {
  data: Settings
  setData: Dispatch<SetStateAction<Settings>>
  connectionStatus: CONNECTION_STATUS
}

const PropertyPanel: FC<PropertyPanelProps> = ({ data, setData, connectionStatus }) => {
  const handleChange = (key: string, value: string | number | boolean): void => {
    setData((s: Settings) => ({ ...s, [key]: value }))
  }

  const handleReset = (): void => {
    setData(defaultSettings)
  }

  let status = ''
  switch (connectionStatus) {
    case CONNECTION_STATUS.CONNECTED:
      status = '🟢'
      break
    case CONNECTION_STATUS.CONNECTING:
      status = '🟠'
      break
    case CONNECTION_STATUS.NOT_AUTHENTICATED:
    case CONNECTION_STATUS.ERROR:
      status = '🔴'
      break
    case CONNECTION_STATUS.DISCONNECTED:
    case CONNECTION_STATUS.UNKNOWN:
      status = '⚫'
      break
  }

  return (
    <div className="fixed flex flex-col rounded-xl bg-zinc-900 p-4 m-1 space-y-1.5">
      <div>
        <span className="block">Font Family</span>
        <select
          className="block rounded-sm p-1"
          value={data.fontFamily}
          onChange={(e) => {
            handleChange('fontFamily', e.target.value)
          }}
        >
          <option value="Roboto">Roboto</option>
          <option value="Poppins">Poppins</option>
          <option value="Open Sans">Open Sans</option>
        </select>
      </div>
      <div>
        <span className="block">Font Size ({data.fontSize}px)</span>
        <input
          className="block"
          value={data.fontSize}
          type="range"
          min="6"
          max="100"
          onChange={(e) => {
            handleChange('fontSize', Number(e.target.value))
          }}
        />
      </div>
      <div>
        <span className="block">Font Weight ({data.fontWeight})</span>
        <input
          className="block"
          value={data.fontWeight}
          type="range"
          min="100"
          max="950"
          step="50"
          onChange={(e) => {
            handleChange('fontWeight', Number(e.target.value))
          }}
        />
      </div>
      <div>
        <span className="block">Line Height ({data.lineHeight})</span>
        <input
          className="block"
          value={data.lineHeight}
          type="range"
          min="0"
          max="2"
          step="0.1"
          onChange={(e) => {
            handleChange('lineHeight', Number(e.target.value))
          }}
        />
      </div>
      <div>
        <span className="block">Font Outline Size ({data.outlineSize}px)</span>
        <input
          className="block"
          value={data.outlineSize}
          type="range"
          min="0"
          max="10"
          onChange={(e) => {
            handleChange('outlineSize', Number(e.target.value))
          }}
        />
      </div>
      <div className="flex flex-row justify-between">
        <span>Font Color</span>
        <ColorPickerPopup color={data.fontColor}>
          <HexAlphaColorPicker
            color={data.fontColor}
            onChange={(c) => {
              handleChange('fontColor', c)
            }}
          />
        </ColorPickerPopup>
      </div>
      <div className="flex flex-row justify-between">
        <span>Font Outline Color</span>
        <ColorPickerPopup color={data.outlineColor}>
          <HexAlphaColorPicker
            color={data.outlineColor}
            onChange={(c) => {
              handleChange('outlineColor', c)
            }}
          />
        </ColorPickerPopup>
      </div>
      <div className="flex flex-row justify-between">
        <span>Background Color</span>
        <ColorPickerPopup color={data.backgroundColor}>
          <HexAlphaColorPicker
            color={data.backgroundColor}
            onChange={(c) => {
              handleChange('backgroundColor', c)
            }}
          />
        </ColorPickerPopup>
      </div>
      <div>
        <span className="block">Max Width ({data.maxWidth}%)</span>
        <input
          className="block"
          value={data.maxWidth}
          type="range"
          min="10"
          max="100"
          onChange={(e) => {
            handleChange('maxWidth', Number(e.target.value))
          }}
        />
      </div>
      <div className="flex flex-row justify-between">
        <span>Text Align</span>
        <select
          className="rounded-sm p-1 w-28"
          value={data.textAlign}
          onChange={(e) => {
            handleChange('textAlign', e.target.value)
          }}
        >
          <option value="Left">Left</option>
          <option value="Center">Center</option>
          <option value="Right">Right</option>
        </select>
      </div>
      <div>
        <span className="block">Message History Size ({data.historySize})</span>
        <input
          className="block"
          value={data.historySize}
          type="range"
          min="0"
          max="7"
          onChange={(e) => {
            handleChange('historySize', Number(e.target.value))
          }}
        />
      </div>
      <div>
        <span className="block">Websocket Address</span>
        <input
          className="block rounded-sm p-1 w-48"
          value={data.wsAddress}
          onChange={(e) => {
            handleChange('wsAddress', e.target.value)
          }}
        />
      </div>
      <div>
        <span className="block">WS Connection Status: {status}</span>
      </div>
      <div>
        <span>Show Preview?</span>
        <input
          className="m-1"
          type="checkbox"
          checked={data.showPreview}
          onChange={(e) => {
            handleChange('showPreview', e.target.checked)
          }}
        />
      </div>
      <div>
        <button
          className="mt-1 px-2 rounded bg-blue-500"
          onClick={() => handleReset()}
        >Reset To Defaults</button>
      </div>
    </div>
  )
}

export default PropertyPanel
