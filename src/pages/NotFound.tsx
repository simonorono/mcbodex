import React, { useEffect } from 'react'
import { title } from '../utils'

export default function NotFound() {
  useEffect(() => {
    document.title = title('Not Found')
  }, [])

  return (
    <div>
      <p>Page not found</p>
    </div>
  )
}
