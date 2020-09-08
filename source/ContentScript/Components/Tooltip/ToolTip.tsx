import Tippy from '@tippyjs/react/headless'
import React, { ReactElement } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

interface ToolTipProps {
  content: ReactElement
}

const Box = styled(animated.div)`
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
`

export const ToolTip: React.FC<ToolTipProps> = ({ content, children }) => {
  const config = { friction: 15, tension: 300 }
  const initialStyles = { opacity: 0, transform: 'scale(0.5)' }
  const [props, setSpring] = useSpring(() => initialStyles)

  return (
    <Tippy
      render={attrs => (
        <Box style={props} {...attrs}>
          {content}
        </Box>
      )}
      animation={true}
      onMount={() => {
        setSpring({
          config,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onRest: () => {},
          opacity: 1,
          transform: 'scale(1)',
        })
      }}
      onHide={({ unmount }) => {
        setSpring({
          ...initialStyles,
          config: { ...config, clamp: true },
          onRest: unmount,
        })
      }}
    >
      {(children as unknown) as JSX.Element}
    </Tippy>
  )
}
