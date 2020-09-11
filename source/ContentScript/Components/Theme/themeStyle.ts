export const themeStyle = {
  color: {
    black: '#222',
    offwhite: '#e4f1fe',
    primary: '#494f5c',
    primaryBlue: '#454c5e',
    primaryBlueAccent: '#363c49',
    primaryDark: '#272930',
    red: '#ea0b0b',
    secondary: '#ef9841',
    secondaryAccent: '#b15f00',
    tertiary: '#169fe3',
    tertiaryDark: '#3c88be',
    white: '#fff',
  },
  fontSize: {
    body: undefined,
  },
} as const

export type Highlight = keyof typeof themeStyle['color']
