import { Settings } from './types'

export const defaultSettings: Settings = {
  fontFamily: 'Roboto',
  fontSize: 18,
  fontWeight: 500,
  lineHeight: 1.2,
  outlineSize: 0,
  fontColor: '#ffffffff',
  outlineColor: '#000000ff',
  backgroundColor: '#00000044',
  textAlign: 'center',
  wsAddress: 'localhost:12422',
  historySize: 1,
  showPreview: false,
  sourceLang: 'en',
  targetLang: 'zh-TW',
}

export const previewMessages = [
  {
    id: 1,
    key: 1,
    text: 'A frog completely sheds its skin about once a week.',
  },
  { id: 2, key: 2, text: 'Most frogs have teeth, although usually only on their upper jaw.' },
  {
    id: 3,
    key: 3,
    text: 'The teeth are used to hold prey in place until the frog can swallow it.',
  },
  {
    id: 4,
    key: 4,
    text: 'The biggest frog in the world is the Goliath frog.',
  },
  {
    id: 5,
    key: 5,
    text: 'It lives in West Africa and can measure more than a foot in length and weigh more than 7 pounds.',
  },
  {
    id: 6,
    key: 6,
    text: 'One gram of the toxin produced by the skin of the golden poison dart frog could kill 100,000 people.',
  },
  {
    id: 7,
    key: 7,
    text: 'There is a frog in Indonesia that has no lungs – it breathes entirely through its skin.',
  },
  {
    id: 8,
    key: 8,
    text: 'The waxy monkey frog secretes a wax from its neck and uses its legs to rub that wax all over its body. The wax prevents the skin of the frog from drying out in sunlight.',
  },
]

export enum CONNECTION_STATUS {
  UNKNOWN = 'UNKNOWN',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  DISCONNECTED = 'DISCONNECTED',
  ERROR = 'ERROR',
}
