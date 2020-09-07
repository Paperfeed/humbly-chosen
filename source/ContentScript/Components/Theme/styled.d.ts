import 'styled-components'

import { themeStyle } from './themeStyle'

type ThemeInterface = typeof themeStyle

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ThemeInterface {}
}
