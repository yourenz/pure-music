import i18n from 'i18next'
import { getDefaultStore } from 'jotai'
import { initReactI18next } from 'react-i18next'

import en_US from './lang/en_US.json'
import zh_CN from './lang/zh_CN.json'
import { langAtom } from '@/atoms/system'

const defaultStore = getDefaultStore()
const resources = {
  en_US,
  zh_CN,
} as const

const langValue = defaultStore.get(langAtom)

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: langValue,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
