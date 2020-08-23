const DEBUG_ENABLED = true
import { browser } from 'webextension-polyfill-ts'

export const extensionIsDev = async () =>
  browser.management
    .get(browser.runtime.id)
    .then(extensionInfo => extensionInfo.installType === 'development')

export class Debug {
  static log(...args: string[]) {
    if (process.env.DEBUG_MODE || DEBUG_ENABLED) {
      console.log(
        '%c[DEBUG LOG]',
        'background: #F0F0F0; font-weight: 600; width:100%',
        ...args,
      )
    }
  }
}
