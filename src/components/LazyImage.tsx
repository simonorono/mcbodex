import React, { useEffect, useRef, useState } from 'react'
import LazyLoad from 'vanilla-lazyload'

if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    callback_loaded: el => el.classList.remove('opacity-0'),
    elements_selector: '[data-src]',
    unobserve_completed: true,
    use_native: true,
    threshold: 100,
  })
}

interface Props {
  alt: string
  src: string
  className?: string
  height: number
  width: number
  overwriteClasses?: boolean
  onError?: (event: React.SyntheticEvent) => void
  onLoad?: (event: React.SyntheticEvent) => void
}

export default function LazyImage(props: Props) {
  const imgRef = useRef(null)

  const {
    alt,
    src,
    className,
    height,
    width,
    overwriteClasses,
    onError,
    onLoad,
  } = props

  const [firstRender, setIfFirstRender] = useState(true)

  useEffect(() => {
    if (firstRender) {
      document.lazyLoadInstance.update()
      setIfFirstRender(false)
      return
    }

    if (imgRef.current !== null) {
      LazyLoad.resetStatus(imgRef.current)
      document.lazyLoadInstance.update()
    }
  }, [src])

  const BLANK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3C/svg%3E`

  const classes = overwriteClasses
    ? className || ''
    : `opacity-0 transition-opacity ${className || ''}`

  return (
    <img
      ref={imgRef}
      width={width}
      height={height}
      src={BLANK_SVG}
      data-src={src}
      alt={alt}
      className={classes}
      onLoad={event => onLoad && onLoad(event)}
      onError={event => onError && onError(event)}
    />
  )
}
