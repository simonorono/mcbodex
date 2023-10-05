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
  const { alt, src, className, height, width, onError } = props

  const classes = `opacity-0 transition-opacity ${className}`

  return (
    <img
      loading="lazy"
      width={width}
      height={height}
      src={src}
      alt={alt}
      className={classes}
      referrerPolicy="no-referrer"
      onLoad={event => event.currentTarget.classList.remove('opacity-0')}
      onError={event => onError && onError(event)}
    />
  )
}
