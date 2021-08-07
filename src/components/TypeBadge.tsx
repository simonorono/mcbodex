import React from 'react'
import { Link } from 'react-router-dom'
import { types } from "../utils/index"

interface Props {
  type: Type,
  className?: string,
}

export default function TypeBadge(props: Props) {
  const { type, className } = props

  const classes = types.classesForType(type)

  return (
    <Link
      to={`/type/${type.code}`}
      className={[
        'py-0.5 rounded-full border text-center hover:underline',
        classes.border, classes.background, classes.color, className
      ].join(' ')}
    >
      {type.name}
    </Link>
  )
}
