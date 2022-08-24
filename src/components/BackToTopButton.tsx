import React, { useEffect, useState } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import { scrollToTop } from '../utils'

export default function BackToTopButton() {
  const [shown, setIfShown] = useState(false)

  useEffect(() => {
    function onWindowScroll() {
      setIfShown(
        () =>
          document.body.scrollTop > 50 ||
          document.documentElement.scrollTop > 50
      )
    }

    window.addEventListener('scroll', onWindowScroll)

    return () => window.removeEventListener('scroll', onWindowScroll)
  }, [])

  return (
    <button
      type="button"
      className={[
        'inline-flex items-center rounded-full border border-transparent p-3',
        'fixed bg-primary-700 text-white shadow-sm hover:bg-primary-800',
        'bottom-6 transition-all duration-500',
        shown ? 'right-6' : '-right-20',
      ].join(' ')}
      onClick={scrollToTop}
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
    >
      <span className="sr-only">Back to top</span>
      <ArrowUpIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}
