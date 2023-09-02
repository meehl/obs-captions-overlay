import { ReactNode, type FC } from 'react'
import useHideOnMouseStop from '../hooks/useHideOnMouseStop'
import { Rnd, type Position } from 'react-rnd'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Settings } from '../types'
import { ColorPickerPopup } from './ColorPickerPopup'
import { HexAlphaColorPicker } from 'react-colorful'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { translationLanguages } from '../constants'

type SettingsPanelProps = Settings & {
  setFontFamily: React.Dispatch<React.SetStateAction<string>>
  setFontSize: React.Dispatch<React.SetStateAction<number>>
  setFontWeight: React.Dispatch<React.SetStateAction<number>>
  setLineHeight: React.Dispatch<React.SetStateAction<number>>
  setOutlineSize: React.Dispatch<React.SetStateAction<number>>
  setFontColor: React.Dispatch<React.SetStateAction<string>>
  setOutlineColor: React.Dispatch<React.SetStateAction<string>>
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>
  setTextAlign: React.Dispatch<React.SetStateAction<string>>
  setWsAddress: React.Dispatch<React.SetStateAction<string>>
  setHistorySize: React.Dispatch<React.SetStateAction<number>>
  setHideDelay: React.Dispatch<React.SetStateAction<number>>
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>
  setEnableTranslation: React.Dispatch<React.SetStateAction<boolean>>
  setApiKey: React.Dispatch<React.SetStateAction<string>>
  setSourceLang: React.Dispatch<React.SetStateAction<string>>
  setTargetLang: React.Dispatch<React.SetStateAction<string>>
  setSecFontSizeMult: React.Dispatch<React.SetStateAction<number>>
}

const SettingsPanel: FC<SettingsPanelProps> = (props) => {
  const [hide] = useHideOnMouseStop({ delay: 15000, initialHide: true })
  const [position, setPosition] = useLocalStorage<Position>('settingsPanelPosition', {
    x: 1,
    y: 1,
  })

  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <Rnd
      position={position}
      onDragStop={(_, d) => {
        setPosition({ x: d.x, y: d.y })
      }}
      bounds={'window'}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      style={{ display: hide ? 'none' : 'flex' }}
      className="flex flex-col m-5 z-10"
      dragHandleClassName="dragger"
    >
      <Dragger />
      <Tabs className="rounded-b-xl rounded-r-xl bg-zinc-900">
        <TabList>
          <Tab>Font</Tab>
          <Tab>Translation</Tab>
          <Tab>Misc</Tab>
        </TabList>
        <TabPanel>
          <SettingsPage>
            <SettingsSelect
              name={'Font Family'}
              value={props.fontFamily}
              setValue={props.setFontFamily}
            >
              <option value="Roboto">Roboto</option>
              <option value="Poppins">Poppins</option>
              <option value="Open Sans">Open Sans</option>
            </SettingsSelect>
            <SettingsSlider
              name={'Font Size'}
              value={props.fontSize}
              setValue={props.setFontSize}
              min={6}
              max={72}
            />
            <SettingsSlider
              name={'Font Weight'}
              value={props.fontWeight}
              setValue={props.setFontWeight}
              min={100}
              max={950}
              step={50}
            />
            <SettingsSlider
              name={'Line Height'}
              value={props.lineHeight}
              setValue={props.setLineHeight}
              min={0}
              max={2}
              step={0.1}
            />
            <SettingsSlider
              name={'Font Outline Size'}
              value={props.outlineSize}
              setValue={props.setOutlineSize}
              min={0}
              max={4}
              step={0.05}
            />
            <SettingsSelect
              name={'Text Align'}
              value={props.textAlign}
              setValue={props.setTextAlign}
            >
              <option value="start">Left</option>
              <option value="center">Center</option>
              <option value="end">Right</option>
            </SettingsSelect>
            <SettingsColor
              name={'Font Color'}
              value={props.fontColor}
              setValue={props.setFontColor}
            />
            <SettingsColor
              name={'Font Outline Color'}
              value={props.outlineColor}
              setValue={props.setOutlineColor}
            />
            <SettingsColor
              name={'Background Color'}
              value={props.backgroundColor}
              setValue={props.setBackgroundColor}
            />
          </SettingsPage>
        </TabPanel>
        <TabPanel>
          <SettingsPage>
            <SettingsCheckbox
              name={'Enable Translation'}
              value={props.enableTranslation}
              setValue={props.setEnableTranslation}
            />
            <SettingsText
              name={'Google Script Api Key'}
              value={props.apiKey}
              setValue={props.setApiKey}
              type={'password'}
            />
            <SettingsSelect
              name={'Source Language'}
              value={props.sourceLang}
              setValue={props.setSourceLang}
            >
              {Object.entries(translationLanguages).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </SettingsSelect>
            <SettingsSelect
              name={'Target Language'}
              value={props.targetLang}
              setValue={props.setTargetLang}
            >
              {Object.entries(translationLanguages).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </SettingsSelect>
            <SettingsSlider
              name={'Font Size Multiplier'}
              value={props.secFontSizeMult}
              setValue={props.setSecFontSizeMult}
              min={0.1}
              max={2}
              step={0.05}
            />
          </SettingsPage>
        </TabPanel>
        <TabPanel>
          <SettingsPage>
            <SettingsSlider
              name={'Hide Delay'}
              value={props.hideDelay}
              setValue={props.setHideDelay}
              min={0}
              max={20000}
              step={500}
            />
            <SettingsSlider
              name={'Message History Size'}
              value={props.historySize}
              setValue={props.setHistorySize}
              min={0}
              max={7}
            />
            <SettingsText
              name={'Websocket Address'}
              value={props.wsAddress}
              setValue={props.setWsAddress}
            />
            <SettingsCheckbox
              name={'Show Preview?'}
              value={props.showPreview}
              setValue={props.setShowPreview}
            />
            <button className='rounded-lg bg-blue-700' onClick={() => handleReset()}>Reset to Defaults</button>
          </SettingsPage>
        </TabPanel>
      </Tabs>
    </Rnd>
  )
}

export default SettingsPanel

type SettingsPageProps = {
  children: ReactNode
}

const SettingsPage: FC<SettingsPageProps> = ({ children }) => {
  return <div className="flex flex-col p-5 space-y-3">{children}</div>
}

type SettingsTextProps = {
  name: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  type?: string
}

const SettingsText: FC<SettingsTextProps> = (props) => {
  return (
    <div className="flex flex-col">
      <span>{props.name}</span>
      <input
        className="rounded-sm p-1 w-48"
        type={props.type}
        value={props.value}
        onChange={(e) => {
          props.setValue(e.target.value)
        }}
      />
    </div>
  )
}

type SettingsSliderProps = {
  name: string
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  min?: number
  max?: number
  step?: number
}

const SettingsSlider: FC<SettingsSliderProps> = (props) => {
  return (
    <div className="flex flex-col">
      <span>
        {props.name} ({props.value})
      </span>
      <input
        type="range"
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(e) => {
          props.setValue(Number(e.target.value))
        }}
      />
    </div>
  )
}

type SettingsColorProps = {
  name: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const SettingsColor: FC<SettingsColorProps> = (props) => {
  return (
    <div className="flex flex-col">
      <span>{props.name}</span>
      <ColorPickerPopup color={props.value}>
        <HexAlphaColorPicker
          color={props.value}
          onChange={(c) => {
            props.setValue(c)
          }}
        />
      </ColorPickerPopup>
    </div>
  )
}

type SettingsSelectProps = {
  name: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  children: ReactNode
}

const SettingsSelect: FC<SettingsSelectProps> = (props) => {
  return (
    <div className="flex flex-col">
      <span>{props.name}</span>
      <select
        className="rounded-sm p-1 w-48"
        value={props.value}
        onChange={(e) => {
          props.setValue(e.target.value)
        }}
      >
        {props.children}
      </select>
    </div>
  )
}

type SettingsCheckboxProps = {
  name: string
  value: boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsCheckbox: FC<SettingsCheckboxProps> = (props) => {
  return (
    <div className="flex flex-row gap-x-4">
      <span>{props.name}</span>
      <input
        type="checkbox"
        checked={props.value}
        onChange={(e) => {
          props.setValue(e.target.checked)
        }}
      />
    </div>
  )
}

const Dragger: FC = () => {
  return (
    <div className="flex">
      <div className="dragger rounded-t-xl px-3 bg-zinc-900 cursor-move">: : : : :</div>
    </div>
  )
}
