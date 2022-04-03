import React from 'react'
import { classNames } from '../utils'
import types from '../utils/types'

interface Props {
  effect: number
  type: Type
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
    <div
      className={classNames(
        'inline-block flex overflow-hidden whitespace-nowrap rounded-full border',
        className || '',
        ...Object.values(typeClasses)
      )}
    >
      <span
        className={`inline-block h-full grow border-r px-2 py-1 text-center ${typeClasses.border}`}
      >
        {type.name}
      </span>
      <span className="inline-block h-full min-w-[2rem] bg-white py-1 text-center text-black">
        ×{effectText(effect)}
      </span>
    </div>
  )
}
