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
}

export type Transcription = {
  id: number
  text: string
}

export type TimeoutType = ReturnType<typeof setTimeout>
