import tinygradient from 'tinygradient'

import { themeStyle } from './themeStyle'

export const ScoreGradient = tinygradient([
  { color: '#f72400', pos: 0 },
  { color: '#f8fc0c', pos: 0.7 },
  { color: '#24ff00', pos: 1 },
])

export const BackgroundGradient = tinygradient([
  { color: '#0000004d', pos: 0 },
  { color: 'transparent', pos: 0.2 },
])

export const ToastGradient = tinygradient([
  { color: themeStyle.color.secondary, pos: 0 },
  { color: themeStyle.color.secondaryAccent, pos: 1 },
])
