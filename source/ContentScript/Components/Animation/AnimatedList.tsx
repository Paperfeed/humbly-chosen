import React, { useState } from 'react'
import { animated, useTransition } from 'react-spring'
import styled, { FlattenSimpleInterpolation } from 'styled-components'

import { ChildWithKey, SpringProps } from './ReactSpring'

interface AnimatedListProps {
  children: React.ReactNode
  customStyle?: FlattenSimpleInterpolation
}

const StyledAnimatedList = styled.div<AnimatedListProps>(
  ({ customStyle }) => customStyle,
)

const getTrueHeight = (el: Element) => {
  const style = window.getComputedStyle(el)

  return [
    'height',
    'padding-top',
    'padding-bottom',
    'margin-top',
    'margin-bottom',
  ]
    .map(key => parseInt(style.getPropertyValue(key), 10))
    .reduce((prev, cur) => prev + cur)
}

export type Ref = HTMLDivElement

export const AnimatedList = React.forwardRef<
  Ref,
  AnimatedListProps & SpringProps
>(({ children, customStyle, ...rest }, ref) => {
  const [refMap] = useState(() => new Map())

  const updateItem = (item: React.ReactElement) => async (
    next: (obj: {}) => void,
  ) => {
    await next({
      maxHeight: getTrueHeight(refMap.get(item)?.childNodes[0]),
      opacity: 1,
      transform: 'translate3d(0, 0%, 0)',
    })
  }

  const animationProps = Object.assign(
    {
      enter: updateItem,
      from: { opacity: 0, transform: 'translate3d(0, 50%, 0)' },
      initial: { opacity: 0, transform: 'translate3d(0, 50%, 0)' },
      leave: () => async (next: (obj: {}) => void) => {
        await next({ maxHeight: 0, opacity: 0 })
      },
      trail: 15,
      update: updateItem,
    },
    rest,
  )

  const transitions = useTransition(
    children as ChildWithKey[],
    item => item?.key,
    animationProps,
  )

  return (
    <StyledAnimatedList ref={ref} customStyle={customStyle}>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          ref={ref => ref && refMap.set(item, ref)}
          key={key}
          style={props}
        >
          {item}
        </animated.div>
      ))}
    </StyledAnimatedList>
  )
})
