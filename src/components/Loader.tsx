import React from 'react'
import { SpinnerDotted } from 'spinners-react'

interface Props {
  className?: string
}

export default function Loader(props: Props) {
  const { className } = props

  return (
    <div className={`flex justify-center align-middle ${className}`}>
      <SpinnerDotted size={70} thickness={140} speed={100} color="#334155" />
    </div>
  )
}
