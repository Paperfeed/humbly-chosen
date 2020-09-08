import React from 'react'
import { animated, useTransition } from 'react-spring'

import { Grid, GridProps } from '../Grid/Grid'
import { ChildWithKey, SpringProps } from './ReactSpring'

// See https://www.react-spring.io/docs/hooks/api
// https://www.react-spring.io/docs/hooks/use-transition
export const AnimatedGrid: React.FC<GridProps & SpringProps> = ({
  initial,
  from = { opacity: 0, transform: 'scale(0.3)' },
  leave = { opacity: 0, transform: 'scale(0.3)' },
  enter = { opacity: 1, transform: 'scale(1)' },
  config = { friction: 18 },
  trail = 100,
  children,
  ...props
}) => {
  const transitions = useTransition(
    children as ChildWithKey[],
    child => child.key,
    {
      config,
      enter,
      from,
      initial,
      leave,
      trail,
    },
  )

  return (
    <Grid {...props}>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={{ ...props }}>
          {item}
        </animated.div>
      ))}
    </Grid>
  )
}
