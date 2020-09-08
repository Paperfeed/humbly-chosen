import { Ref, useEffect, useRef } from 'react'

/**
 * This hook will return a ref you can use within the component and forward using React.forwardRef at the same time
 * (pass it the forwarded ref)
 *
 * @param forwardedRef - the ref object from React.forwardRef
 */
export function useSharedForwardedRef<T>(forwardedRef: Ref<T>) {
  // final ref that will share value with forward ref. this is the one we will attach to components
  const innerRef = useRef<T>(null)

  useEffect(() => {
    if (!forwardedRef) return

    if (typeof forwardedRef === 'function') {
      forwardedRef(innerRef.current)
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      forwardedRef.current = innerRef.current
    }
  })

  return innerRef
}
