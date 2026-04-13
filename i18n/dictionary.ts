import type { Locale } from './types'
import { DEFAULT_LOCALE } from './types'
import type { MessageTree } from './messages/en'
import { enMessages } from './messages/en'
import { viMessages } from './messages/vi'
import { deMessages } from './messages/de'
import { esMessages } from './messages/es'
import { frMessages } from './messages/fr'
import { jaMessages } from './messages/ja'
import { koMessages } from './messages/ko'
import { ptMessages } from './messages/pt'
import { thMessages } from './messages/th'
import { idMessages } from './messages/id'
import { zhMessages } from './messages/zh'
import { msMessages } from './messages/ms'

export const messages: Record<Locale, MessageTree> = {
  en: enMessages,
  vi: viMessages,
  de: deMessages,
  es: esMessages,
  fr: frMessages,
  ja: jaMessages,
  ko: koMessages,
  pt: ptMessages,
  th: thMessages,
  id: idMessages,
  zh: zhMessages,
  ms: msMessages,
}

export function getMessages(locale: Locale): MessageTree {
  return messages[locale] ?? messages[DEFAULT_LOCALE]
}
