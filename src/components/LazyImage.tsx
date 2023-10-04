import React from 'react'

interface Props {
  alt: string
  src: string
  className?: string
  height: number
  width: number
  onError?: (event: React.SyntheticEvent) => void
  onLoad?: (event: React.SyntheticEvent) => void
}

export default function LazyImage(props: Props) {
  const { alt, src, className, height, width, onError, onLoad } = props

  return (
    <img
      loading="lazy"
      width={width}
      height={height}
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onLoad={event => onLoad && onLoad(event)}
      onError={event => onError && onError(event)}
    />
  )
}
