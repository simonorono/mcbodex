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

import React, { ReactNode } from 'react'

interface Props {
  h1: string|ReactNode,
  children?: ReactNode
}

export default function Template(props: Props) {
  const { h1, children } = props

  return (
    <div className='flex flex-col'>
      <h1 className='mb-10 text-4xl font-bold'>
        {h1}
      </h1>

      <main className='flex-grow'>
        {children}
      </main>

      {/* Turn this into a footer */}
      <div className="pb-20" />
    </div>
  )
}
