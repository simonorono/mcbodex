import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import TypeBadge from './TypeBadge'
import Loader from './Loader'

export default function TypeList() {
  const types = useAppSelector(state => state.types)

  return (
    <div className="p-10 border rounded-md">
      <h2 className="text-2xl">Pokémon by type</h2>

      {!types.loaded && (
        <Loader />
      )}

      {types.loaded && (
        <div
          className={[
            'flex flex-wrap justify-center space-x-2 space-y-4',
            'text-2xl'
          ].join(' ')}
        >
          {types.all.map((type, i) => (
            <Link
              key={type.id}
              to={`/type/${type.code}`}
              className={`hover:underline ${i === 0 ? 'mt-4' : ''}`}
            >
              <TypeBadge
                type={type}
                className='py-0.5 px-4'
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
