import React, { useLayoutEffect, useState } from 'react'
import { animated, SpringConfig, useSpring } from 'react-spring'

import { useObserver } from '../../Hooks/useObserver'
import { usePrevious } from '../../Hooks/usePrevious'

export interface AnimatedSlideInProps {
  config?: SpringConfig
  fadeInAnim?: {}
  fadeOutAnim?: {}
  show: boolean
}

/**
 * This component will measure the height of any children before rendering
 * after which it animates the height and fades in the children
 *
 * @param show - Display children or not
 * @param config - React Spring configuration - See React Spring common API
 * @param fadeInAnim - Fade in animation
 * @param fadeOutAnim - Fade in animation
 * @param children
 */
export const AnimatedHeight: React.FC<AnimatedSlideInProps> = React.memo(
  ({
    show,
    config = { clamp: true, tension: 300 },
    fadeInAnim = { opacity: 1 },
    fadeOutAnim = { opacity: 0 },
    children,
  }) => {
    const { ref, height = 0 } = useObserver()
    const [originalHeight, setHeight] = useState(0)

    const prevHeight = usePrevious(height)
    const prevShow = usePrevious(show)
    const fadeInOrOut = show !== prevShow

    useLayoutEffect(() => {
      if (height !== prevHeight) {
        setHeight(height ? height : 0)
      }
    }, [height, prevHeight])

    const props = useSpring({
      from: {
        ...fadeInAnim,
        maxHeight: prevHeight ? prevHeight : 0,
        overflow: 'hidden',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to: async (next: any) => {
        if (prevHeight !== height && !fadeInOrOut && show) {
          // Update to new height
          await next({
            config,
            height: Math.ceil(height),
            maxHeight: 'none',
            opacity: 1,
            overflow: 'initial',
          })
        } else if (fadeInOrOut && !show) {
          // Fade out and collapse
          await next({ maxHeight: originalHeight })
          await next({ config, ...fadeOutAnim })
          await next({ config, maxHeight: 0, overflow: 'hidden' })
        } else if (fadeInOrOut && show) {
          // Expand and fade in
          await next({ config, maxHeight: originalHeight })
          await next({ ...fadeInAnim, config })
          await next({ maxHeight: 'none', overflow: 'initial' }) // Unset max height
        }
      },
    })

    return (
      <animated.div style={{ ...props }}>
        <div className="animatedHeightContainer" ref={ref}>
          {children}
        </div>
      </animated.div>
    )
  },
)
