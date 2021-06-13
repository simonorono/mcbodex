import React, { ReactNode } from 'react'

interface Props {
  h1: string|ReactNode,
  children?: ReactNode
}

export default function Template(props: Props) {
  const { h1, children } = props

  return (
    <div className='flex flex-col'>
      <h1 className='mb-10 text-3xl font-bold'>
        {h1}
      </h1>

      <main className='flex-grow'>
        {children}
      </main>
    </div>
  )
}
