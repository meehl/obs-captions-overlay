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
  showPreview: boolean
  apiKey: string
  sourceLang: string
  targetLang: string
}

export type Message = {
  id: number
  text: string
}

export type TimeoutType = ReturnType<typeof setTimeout>

export type Size = {
  width: string | number
  height: string | number
}
