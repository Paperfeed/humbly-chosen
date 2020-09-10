import { useCallback, useLayoutEffect, useState } from 'react'

export interface DimensionObject {
  bottom: number
  height: number
  left: number
  offsetHeight: number
  right: number
  scrollHeight: number
  top: number
  width: number
  x: number
  y: number
}

type UseDimensionsHook = [
  (node: HTMLElement | null) => void,
  DimensionObject,
  HTMLElement | null,
]

interface UseDimensionsArgs {
  enableSSR?: boolean
  liveMeasure?: boolean
}

function getDimensionObject(node: HTMLElement): DimensionObject {
  const rect = node.getBoundingClientRect()
  const left = rect.x ? rect.x : rect.left
  const top = rect.y ? rect.y : rect.top

  return {
    bottom: rect.bottom,
    height: rect.height,
    left,
    offsetHeight: node.offsetHeight,
    right: rect.right,
    scrollHeight: node.scrollHeight,
    top,
    width: rect.width,
    x: left,
    y: top,
  }
}

export function useDimensions({
  liveMeasure = false,
}: UseDimensionsArgs = {}): UseDimensionsHook {
  const [dimensions, setDimensions] = useState({})
  const [node, setNode] = useState<HTMLElement | null>(null)

  const ref = useCallback(node => {
    setNode(node)
  }, [])

  useLayoutEffect(() => {
    if (!node) return

    const measure = () =>
      window.requestAnimationFrame(() =>
        setDimensions(getDimensionObject(node)),
      )
    measure()

    if (liveMeasure) {
      window.addEventListener('resize', measure)
      window.addEventListener('scroll', measure)

      return () => {
        window.removeEventListener('resize', measure)
        window.removeEventListener('scroll', measure)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [liveMeasure, node])

  return [ref, dimensions as DimensionObject, node]
}
