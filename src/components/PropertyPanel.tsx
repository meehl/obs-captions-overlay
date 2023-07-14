import { type FC, type Dispatch, type SetStateAction } from 'react'
import { HexAlphaColorPicker } from 'react-colorful'
import { type SubtitleProps } from '../types'
import { ColorPickerPopup } from './ColorPickerPopup'

interface PropertyPanelProps {
  data: SubtitleProps
  setData: Dispatch<SetStateAction<SubtitleProps>>
}

const PropertyPanel: FC<PropertyPanelProps> = ({ data, setData }) => {
  const handleChange = (key: string, value: string | number): void => {
    setData((s: SubtitleProps) => ({ ...s, [key]: value }))
  }

  return (
    <div>
      <label>
        Font Family:
        <input
          value={data.fontFamily}
          onChange={(e) => {
            handleChange('fontFamily', Number(e.target.value))
          }}
        />
      </label>
      <br />
      <label>
        Font Size ({data.fontSize}px):
        <input
          value={data.fontSize}
          type="range"
          min="6"
          max="300"
          onChange={(e) => {
            handleChange('fontSize', Number(e.target.value))
          }}
        />
      </label>
      <br />
      <label>
        Font Weight ({data.fontWeight}):
        <input
          value={data.fontWeight}
          type="range"
          min="100"
          max="950"
          step="50"
          onChange={(e) => {
            handleChange('fontWeight', Number(e.target.value))
          }}
        />
      </label>
      <br />
      <label>
        Line Height ({data.lineHeight}):
        <input
          value={data.lineHeight}
          type="range"
          min="0"
          max="2"
          step="0.1"
          onChange={(e) => {
            handleChange('lineHeight', Number(e.target.value))
          }}
        />
      </label>
      <br />
      <label>
        Outline Size ({data.outlineSize}px):
        <input
          value={data.outlineSize}
          type="range"
          min="0"
          max="10"
          onChange={(e) => {
            handleChange('outlineSize', Number(e.target.value))
          }}
        />
      </label>
      <br />
      <label>
        Font Color:
        <ColorPickerPopup color={data.fontColor}>
          <HexAlphaColorPicker
            color={data.fontColor}
            onChange={(c) => {
              handleChange('fontColor', c)
            }}
          />
        </ColorPickerPopup>
      </label>
      <br />
      <label>
        Outline Color:
        <ColorPickerPopup color={data.outlineColor}>
          <HexAlphaColorPicker
            color={data.outlineColor}
            onChange={(c) => {
              handleChange('outlineColor', c)
            }}
          />
        </ColorPickerPopup>
      </label>
      <br />
      <label>
        Background Color:
        <ColorPickerPopup color={data.backgroundColor}>
          <HexAlphaColorPicker
            color={data.backgroundColor}
            onChange={(c) => {
              handleChange('backgroundColor', c)
            }}
          />
        </ColorPickerPopup>
      </label>
      <br />
      <label>
        Websocket Address:
        <input
          value={data.wsAddress}
          onChange={(e) => {
            handleChange('wsAddress', e.target.value)
          }}
        />
      </label>
    </div>
  )
}

export default PropertyPanel
