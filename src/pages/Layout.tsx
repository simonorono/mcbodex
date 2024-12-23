import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  className?: string
  title: string
}

export default function Layout(props: LayoutProps) {
  const { children, className, title } = props

  return (
    <div className={className}>
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>

      {children}
    </div>
  )
}
