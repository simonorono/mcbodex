/**
 * Copyright 2021 Simón Oroño
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
        'shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 fixed',
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
