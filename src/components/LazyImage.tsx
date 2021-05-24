import React, { useEffect } from 'react'
import LazyLoad from 'vanilla-lazyload'
import loader from '../../media/loader.svg?raw'

if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    elements_selector: '[data-src]',
    unobserve_completed: true,
    threshold: 100,
  })
}

const LOADER_SVG_BASE_64 = btoa(loader)

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
      src={`data:image/svg+xml;base64,${LOADER_SVG_BASE_64}`}
      data-src={src}
      alt={alt}
      className={className}
    />
  )
}
