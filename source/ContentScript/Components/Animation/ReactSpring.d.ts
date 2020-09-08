/**
 * @param mass - Spring mass - Default: 1
 * @param tension - Spring energetic load - Default: 170
 * @param friction - Spring resistance - Default: 26
 * @param clamp - When true, stops the spring once it overshoots its boundaries - Default: false
 * @param precision - Physics precision - Default: 0.01
 * @param velocity - Initial velocity - Default: 0
 * @param duration - If more than 0 it will switch to a duration based animation instead of physics. Value in ms. - Default: undefined
 * @param easing - Easing function, linear by default. You can use any easing you want, for example d3-ease
 */
export interface SpringConfig {
  clamp?: boolean
  duration?: number
  easing?: <T>(easedValue: T) => T
  friction?: number
  mass?: number
  precision?: number
  tension?: number
  velocity?: number
}

// See https://www.react-spring.io/docs/hooks/api
// https://www.react-spring.io/docs/hooks/use-transition
export interface SpringProps {
  config?: SpringConfig
  enter?: () => {} | object
  from?: () => {} | object
  initial?: () => {} | object
  leave?: () => {} | object
  onDestroyed?: () => void
  reset?: boolean
  trail?: number
  unique?: boolean
  update?: () => {} | object
}

export interface ChildWithKey {
  key: string
}
