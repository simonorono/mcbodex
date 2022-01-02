import React, { useEffect } from 'react'
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
  alt: string,
  src: string,
  className?: string,
  height: number,
  width: number,
}

export default function LazyImage({ alt, src, className, height, width }: Props) {
  useEffect(() => {
    document.lazyLoadInstance.update()
  }, [])

  const BLANK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3C/svg%3E`

  return (
    <img
      width={width}
      height={height}
      src={BLANK_SVG}
      data-src={src}
      alt={alt}
      className={`opacity-0 transition-opacity ${className || ''}`}
    />
  )
}
