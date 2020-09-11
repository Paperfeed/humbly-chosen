import styled from 'styled-components'

export interface FlexProps {
  alignRight?: boolean
  center?: boolean
  centerHorizontal?: boolean
  centerVertical?: boolean
  column?: boolean
  fullHeight?: boolean
  fullSize?: boolean
  fullWidth?: boolean
  gap?: string
  inline?: boolean
  reverse?: boolean
  spaceBetween?: boolean
  withMargins?: boolean | string
  wrap?: true | 'wrap-reverse' | 'wrap' | 'nowrap'
}

export const Flex = styled.div<FlexProps>(
  ({
    alignRight,
    center,
    centerHorizontal,
    centerVertical,
    column,
    fullSize,
    fullWidth,
    fullHeight,
    reverse,
    inline,
    spaceBetween,
    wrap,
    withMargins,
    gap,
  }) => ({
    ['> *']: gap
      ? {
          margin: `${gap} 0 0 ${gap}`,
        }
      : undefined,
    ['> *:not(:last-child)']: {
      [column ? 'marginBottom' : 'marginRight']: withMargins
        ? typeof withMargins === 'string'
          ? withMargins
          : '1.5em'
        : undefined,
    },
    alignItems: center || centerVertical ? 'center' : undefined,
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: column
      ? reverse
        ? 'column-reverse'
        : 'column'
      : reverse
      ? 'row-reverse'
      : 'row',
    flexWrap: wrap ? (wrap === true ? 'wrap' : wrap) : undefined,
    height: fullSize || fullHeight ? '100%' : 'auto',
    justifyContent: spaceBetween
      ? 'space-between'
      : center || centerHorizontal
      ? 'center'
      : alignRight
      ? 'flex-end'
      : undefined,
    margin: gap ? `-${gap} 0 0 -${gap}` : undefined,
    width: gap
      ? `calc(100% + ${gap})`
      : fullSize || fullWidth
      ? '100%'
      : 'auto',
  }),
)
