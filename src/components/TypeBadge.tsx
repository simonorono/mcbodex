import React from 'react'

interface Props {
  type: Type,
  className?: string,
}

interface TypeClasses {
  border: string,
  background: string,
  color: string
}

type TypeClassesMap = {
  [key: string]: TypeClasses
}

const typeClasses: TypeClassesMap = {
  normal: {
    border: 'border-warmGray-400',
    background: 'bg-warmGray-200',
    color: 'text-black'
  },

  fighting: {
    border: 'border-red-900',
    background: 'bg-red-700',
    color: 'text-white'
  },

  flying: {
    border: 'border-violet-300',
    background: 'bg-violet-200',
    color: 'text-black'
  },

  poison: {
    border: 'border-fuchsia-900',
    background: 'bg-fuchsia-700',
    color: 'text-white'
  },

  ground: {
    border: 'border-yellow-600',
    background: 'bg-yellow-500',
    color: 'text-black'
  },

  rock: {
    border: 'border-yellow-900',
    background: 'bg-yellow-800',
    color: 'text-white'
  },

  bug: {
    border: 'border-lime-400',
    background: 'bg-lime-200',
    color: 'text-black'
  },

  ghost: {
    border: 'border-black',
    background: 'bg-purple-900',
    color: 'text-white'
  },

  steel: {
    border: 'border-blueGray-400',
    background: 'bg-blueGray-300',
    color: 'text-black'
  },

  fire: {
    border: 'border-orange-500',
    background: 'bg-orange-400',
    color: 'text-black'
  },

  water: {
    border: 'border-blue-800',
    background: 'bg-blue-600',
    color: 'text-white'
  },

  grass: {
    border: 'border-green-800',
    background: 'bg-green-700',
    color: 'text-white'
  },

  electric: {
    border: 'border-yellow-400',
    background: 'bg-yellow-200',
    color: 'text-black'
  },

  psychic: {
    border: 'border-pink-700',
    background: 'bg-pink-600',
    color: 'text-white'
  },

  ice: {
    border: 'border-cyan-400',
    background: 'bg-cyan-200',
    color: 'text-black'
  },

  dragon: {
    border: 'border-violet-900',
    background: 'bg-violet-700',
    color: 'text-white'
  },

  dark: {
    border: 'border-black',
    background: 'bg-warmGray-700',
    color: 'text-white'
  },

  fairy: {
    border: 'border-rose-300',
    background: 'bg-rose-200',
    color: 'text-black'
  }
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
