export type Settings = {
  fontFamily: string
  fontSize: number
  fontWeight: number
  lineHeight: number
  outlineSize: number
  fontColor: string
  outlineColor: string
  backgroundColor: string
  textAlign: string
  wsAddress: string
  historySize: number
  hideDelay: number
  showPreview: boolean
  enableTranslation: boolean
  apiKey: string
  sourceLang: string
  targetLang: string
  secFontSizeMult: number
}

export type Message = {
  id: number
  text: string
}

export type TimeoutType = ReturnType<typeof setTimeout>

export type Size = {
  width: number
  height: number
}

export type RelativePosition = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}
