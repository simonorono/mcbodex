import React from 'react'
import { ClipLoader } from 'react-spinners'

interface Props {
  className?: string
}

export default function Loader({ className }: Props) {
  return (
    <div className={`flex justify-center align-middle ${className}`}>
      <ClipLoader size={70} color="#334155" />
    </div>
  )
}
