import { atomWithStorage } from 'jotai/utils'

const loginValue = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login') || '') : false
export const loginAtom = atomWithStorage('login', loginValue)
