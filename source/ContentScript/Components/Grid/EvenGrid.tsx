import styled from 'styled-components'

interface EvenGridProps {
  autoFill?: boolean
  direction?: 'column' | 'row'
  gap?: string
  minSize?: string
}

export const EvenGrid = styled.div<EvenGridProps>(
  ({ autoFill, direction = 'column', minSize = '200px', gap = '20px' }) => ({
    display: 'grid',
    gridGap: gap,
    [direction === 'column'
      ? 'gridTemplateColumns'
      : 'gridTemplateRows']: `repeat(${
      autoFill ? 'auto-fill' : 'auto-fit'
    }, minmax(calc(${minSize} - ${gap}), 1fr))`,
  }),
)
