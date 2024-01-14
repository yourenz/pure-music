import { create } from 'zustand'
import { devtools, logger, persist } from './middlewares'

interface LangState {
  lang: string
  setLang: (lang: string) => void
}

export const useLangStore = create<LangState>()(
  devtools(
    logger(
      persist(
        set => ({
          lang: 'en_US',
          setLang: lang => set(() => ({ lang })),
        }),
        { name: 'langStore' },
      ),
      'system',
    ),
  ),
)

interface LoginState {
  login: boolean
  setLogin: (login: boolean) => void
}

export const useLoginStore = create<LoginState>()(
  devtools(
    logger(
      persist(
        set => ({
          login: false,
          setLogin: login => set(() => ({ login })),
        }),
        { name: 'loginStore' },
      ),
      'system',
    ),
  ),
)
