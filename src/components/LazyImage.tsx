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
  className: string,
  height: number,
  width: number,
}

export default function LazyImage(props: Props) {
  const { alt, src, className, height, width } = props

  useEffect(() => {
    document.lazyLoadInstance.update()
  }, [])

  return (
    <img
      width={width}
      height={height}
      data-src={src}
      alt={alt}
      className={`opacity-0 transition-opacity ${className}`}
    />
  )
}
