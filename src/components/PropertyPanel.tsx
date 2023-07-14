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
    <div className='fixed flex flex-col rounded-xl bg-zinc-900 p-8 space-y-1.5'>
      <label>
        <span className='block'>Font Family</span>
        <input
          className='block rounded-sm p-1'
          value={data.fontFamily}
          onChange={(e) => {
            handleChange('fontFamily', Number(e.target.value))
          }}
        />
      </label>
      <label>
        <span className='block'>Font Size ({data.fontSize}px)</span>
        <input
          className='block'
          value={data.fontSize}
          type="range"
          min="6"
          max="300"
          onChange={(e) => {
            handleChange('fontSize', Number(e.target.value))
          }}
        />
      </label>
      <label>
        <span className='block'>Font Weight ({data.fontWeight})</span>
        <input
          className='block'
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
      <label>
        <span className='block'>Line Height ({data.lineHeight})</span>
        <input
          className='block'
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
      <label>
        <span className='block'>Font Outline Size ({data.outlineSize}px)</span>
        <input
          className='block'
          value={data.outlineSize}
          type="range"
          min="0"
          max="10"
          onChange={(e) => {
            handleChange('outlineSize', Number(e.target.value))
          }}
        />
      </label>
      <label>
        <span className='block'>Font Color</span>
        <ColorPickerPopup color={data.fontColor}>
          <HexAlphaColorPicker
            color={data.fontColor}
            onChange={(c) => {
              handleChange('fontColor', c)
            }}
          />
        </ColorPickerPopup>
      </label>
      <label>
        <span className='block'>Font Outline Color</span>
        <ColorPickerPopup color={data.outlineColor}>
          <HexAlphaColorPicker
            color={data.outlineColor}
            onChange={(c) => {
              handleChange('outlineColor', c)
            }}
          />
        </ColorPickerPopup>
      </label>
      <label>
        <span className='block'>Background Color</span>
        <ColorPickerPopup color={data.backgroundColor}>
          <HexAlphaColorPicker
            color={data.backgroundColor}
            onChange={(c) => {
              handleChange('backgroundColor', c)
            }}
          />
        </ColorPickerPopup>
      </label>
      <label>
        <span className='block'>Websocket Address</span>
        <input
          className='block rounded-sm p-1'
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
