import dayjs from 'dayjs'
import type { State, StateCreator, StoreMutatorIdentifier } from 'zustand'

type Logger = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T extends State>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...a)
    console.log('logger', ...(name ? [`${name}:`] : []), get(), dayjs().format('YYYY-MM-DD HH:mm:ss'))
  }
  store.setState = loggedSet

  return f(loggedSet, get, store)
}

const logger = loggerImpl as unknown as Logger

export default logger
