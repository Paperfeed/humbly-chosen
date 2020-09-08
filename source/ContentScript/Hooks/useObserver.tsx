import { ResizeObserver } from '@juggle/resize-observer'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'

interface UseObserverArgs {
  onResize?: (newValues: { height: number; width: number }) => void
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: MutableRefObject<any>
}

interface ObservedValues {
  height: number | undefined
  width: number | undefined
}

export interface UseObserverReturnObject extends ObservedValues {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: MutableRefObject<any>
}

export function useObserver({
  ref,
  onResize,
}: UseObserverArgs = {}): UseObserverReturnObject {
  ref = ref ? ref : useRef(null)

  const [size, setSize] = useState<ObservedValues>({
    height: undefined,
    width: undefined,
  })

  const previous = useRef<ObservedValues>({
    height: undefined,
    width: undefined,
  })

  useEffect(() => {
    if (!ref || !(typeof ref === 'object' && ref.current instanceof Element))
      return

    const element = ref.current
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries) || !entries.length) {
        return
      }

      const entry = entries[0]
      // Can use borderBoxSize, contentBoxSize or (legacy) contentRect
      const newWidth = entry.borderBoxSize[0].inlineSize
      const newHeight = entry.borderBoxSize[0].blockSize

      if (
        previous.current.width !== newWidth ||
        previous.current.height !== newHeight
      ) {
        const newSize = { height: newHeight, width: newWidth }
        if (onResize) {
          onResize(newSize)
        } else {
          previous.current.width = newWidth
          previous.current.height = newHeight
          setSize(newSize)
        }
      }
    })

    resizeObserver.observe(element)

    return () => resizeObserver.unobserve(element)
  }, [ref, onResize])

  return useMemo(() => ({ ref, ...size }), [
    ref,
    size ? size.width : null,
    size ? size.height : null,
  ])
}
