import { useEffect, useRef, useState } from 'react'

export default function useMeasure<E extends HTMLElement>() {
  const ref = useRef<E>(null!)

  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })

  const ro = useRef<ResizeObserver>()

  useEffect(() => {
    ro.current = new ResizeObserver(([entry]) => set(entry.contentRect))
    ro.current.observe(ref.current)
    return () => ro.current?.disconnect()
  }, [])

  return { ref, bounds }
}
