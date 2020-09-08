import styled from 'styled-components'

/**
 * Use this resource if you're not familiar with grids yet
 * https://css-tricks.com/snippets/css/complete-guide-grid/
 */
export interface GridProps {
  direction?: 'column' | 'row'
  fillHorizontal?: boolean
  fullHeight?: boolean
  fullSize?: boolean
  fullWidth?: boolean
  gap?: string
  gridAutoColumns?: string
  gridAutoRows?: string
  inline?: boolean
  minChildSize?: string
  rows?: 'auto-fill' | string
  templateColumns?: string
  templateRows?: string
}

export const Grid = styled.div<GridProps>(
  ({
    direction = 'column',
    fullHeight,
    fullSize,
    fullWidth,
    gap,
    gridAutoColumns,
    gridAutoRows,
    inline,
    minChildSize,
    rows = 'auto-fill',
    templateColumns,
    templateRows,
  }: Partial<GridProps>) => ({
    display: inline ? 'inline-grid' : 'grid',
    gridAutoColumns,
    gridAutoFlow: direction === 'row' ? 'column' : 'row',
    gridAutoRows,
    gridGap: gap ? gap : undefined,
    gridTemplateColumns: templateColumns
      ? templateColumns
      : direction === 'column'
      ? `repeat(${rows}, ${
          minChildSize ? `minmax(${minChildSize}, 1fr)` : '1fr'
        })`
      : '1fr',
    gridTemplateRows: templateRows
      ? templateRows
      : direction === 'row'
      ? `repeat(${rows}, ${
          minChildSize ? `minmax(${minChildSize}, 1fr)` : '1fr'
        })`
      : '1fr',
    height: fullSize || fullHeight ? '100%' : 'auto',
    width: fullSize || fullWidth ? '100%' : 'auto',
  }),
)
