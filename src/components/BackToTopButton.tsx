import React, { useEffect, useState } from 'react'
import { ArrowUpIcon } from '@heroicons/react/solid'
import { scrollToTop } from '../utils'

export default function BackToTopButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onWindowScroll() {
      setShow(() => document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
    }

    window.addEventListener('scroll', onWindowScroll)

    return () => window.removeEventListener('scroll', onWindowScroll)
  }, [])

  return (
    <button
      type="button"
      className={[
        'inline-flex items-center p-3 border border-transparent rounded-full',
        'shadow-sm text-white bg-primary-600 hover:bg-primary-700 fixed',
        'transition-all duration-500 bottom-6',
        show ? 'right-6' : '-right-20',
      ].join(' ')}
      onClick={scrollToTop}
      aria-hidden={!show}
    >
      <span className="sr-only">Back to top</span>
      <ArrowUpIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}
