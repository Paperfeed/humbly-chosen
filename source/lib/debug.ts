import { browser } from 'webextension-polyfill-ts'

export enum Verbosity {
  DEBUG,
  LOG,
  INFO,
  WARN,
  ERROR,
}

export const LOG_VERBOSITY = process.env.LOG_VERBOSITY
  ? parseInt(process.env.LOG_VERBOSITY)
  : Verbosity.DEBUG
export const DEBUG_ENABLED = process.env.DEBUG_MODE || true

const verbosityLabel = ['Debug', 'Log', 'Info', 'Warning', 'Error']
export const extensionIsDev = async () =>
  browser.management
    .get(browser.runtime.id)
    .then(extensionInfo => extensionInfo.installType === 'development')

export class Debug {
  static log(verbosity: Verbosity, ...args: string[]) {
    if (DEBUG_ENABLED && LOG_VERBOSITY <= verbosity) {
      console.log(
        `%c[DEBUG LOG - ${verbosityLabel[verbosity]}]`,
        'background: #F0F0F0; font-weight: 600; width:100%',
        ...args,
      )
    }
  }
}
