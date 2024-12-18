import React from 'react'
import { Link } from 'react-router'
import { types } from '../utils/index'

interface Props {
  type: Type
  className?: string
}

export default function TypeBadge(props: Props) {
  const { type, className } = props

  const classes = types.classesForType(type)

  return (
    <Link
      to={`/type/${type.code}`}
      className={[
        'rounded-full border py-0.5 text-center hover:underline',
        classes.border,
        classes.background,
        classes.color,
        className,
      ].join(' ')}
    >
      {type.name}
    </Link>
  )
}
