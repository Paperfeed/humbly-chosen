import { browser } from 'webextension-polyfill-ts'

import { ENABLE_DEBUG } from './enums'

/**
 * DEBUG - For spammy operations that would otherwise clog the console
 * LOG   - Flow of the application (eg. 'Initializing database')
 * INFO  - Information that includes variables (eg. 'API returned ${count} results')
 * WARN  - Warnings when something is wrong or missing but not critical
 * ERROR - Operations that completely failed and probably break the functionality
 */
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
export const DEBUG_ENABLED = process.env.DEBUG_MODE || ENABLE_DEBUG

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
