import { ReactNode, useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'

import useMeasure from 'hooks/use-measure'

const HeightSlider = ({
  children,
  saveChildren,
  hidden,
}: {
  children: ReactNode
  saveChildren?: boolean
  hidden?: boolean
}) => {
  const {
    ref,
    bounds: { height },
  } = useMeasure<HTMLDivElement>()

  const [savedChildren, setSavedChildren] = useState<ReactNode>(children)

  useEffect(() => {
    if (!saveChildren || children) {
      setSavedChildren(children)
    }
  }, [children, saveChildren])

  const styles = useSpring({
    height: `${hidden || !children ? 0 : height}px`,
  })

  return (
    <animated.div className="overflow-hidden" style={styles}>
      <div ref={ref}>{savedChildren}</div>
    </animated.div>
  )
}

export default HeightSlider
