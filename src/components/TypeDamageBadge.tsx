import React from 'react'
import { classNames } from '../utils'
import types from '../utils/types'

interface Props {
  effect: number,
  type: Type,
  className?: string
}

export default function TypeDamageBadge({ effect, type, className }: Props) {
  const typeClasses = types.classesForType(type)

  const effectText = (effect: number) => {
    if (effect === 0.25) {
      return '¼'
    }

    if (effect === 0.5) {
      return '½'
    }

    return effect
  }

  return (
    <div className={classNames(
      "inline-block overflow-hidden border rounded-full", 
      className || '', ...Object.values(typeClasses)
    )}>
      <span className={`inline-block w-[80px] h-full text-center px-2 border-r ${typeClasses.border}`}>
        {type.name}
      </span>
      <span className="inline-block h-full text-center bg-white text-black w-[32px]">
        ×{effectText(effect)}
      </span>
    </div>
  )
}
