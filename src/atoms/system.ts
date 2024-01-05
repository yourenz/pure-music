import { atomWithStorage } from 'jotai/utils'

const langValue = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang') || '') : 'en_US'
export const langAtom = atomWithStorage('lang', langValue)
const loginValue = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login') || '') : false
export const loginAtom = atomWithStorage('login', loginValue)
