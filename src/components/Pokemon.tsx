import React from 'react'
import { useParams } from 'react-router'
import { useAppSelector } from '../store/hooks'

export default function Pokemon() {
  const params = useParams<{ id: string }>()

  const id = parseInt(params.id)

  const pokemon = useAppSelector(state => state.pokemon.all.find(spcy => spcy.id === id))!

  return (
    <>
      <p>{pokemon.name}</p>
    </>
  )
}
