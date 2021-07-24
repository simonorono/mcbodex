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

import React from 'react'
import { typeClasses } from "../utils";

interface Props {
  type: Type,
  className?: string,
}

export default function TypeBadge(props: Props) {
  const { type, className } = props

  const classes = typeClasses[type.code]

  return (
    <span
      className={[
        'py-0.5 rounded-full border text-center',
        classes.border, classes.background, classes.color, className
      ].join(' ')}
    >
      {type.name}
    </span>
  )
}
