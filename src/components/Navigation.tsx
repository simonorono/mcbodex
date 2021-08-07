import React, { ReactNode } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { useAppSelector } from '../store/hooks'
import { types } from '../utils'

interface Props {
  onLinkClicked?: () => void
}

export default function Navigation({ onLinkClicked }: Props) {
  const location = useLocation()

  const games = useAppSelector(state => state.pokedex.allGames)

  const researchTasks = ['Galar', 'Kanto']

  interface LinkProps {
    name: string,
    href: string
  }

  function SingleLink({ name, href }: LinkProps) {
    const current = href === location.pathname

    return (
      <Link
        to={href}
        className={[
          current ? 'bg-blueGray-600 text-white' : 'text-white hover:bg-gray-50 hover:text-gray-900',
          'flex items-center px-3 py-2 text-sm font-medium rounded-md'
        ].join(' ')}
        onClick={onLinkClicked}
      >
        <span className="truncate">{name}</span>
      </Link>
    )
  }

  interface SeveralLinksProps {
    name: string,
    children?: ReactNode
  }

  function SeveralLinks({ name, children }: SeveralLinksProps) {
    return (
      <Disclosure as="div" className="space-y-1">
        {({ open }) => (
          <>
            <Disclosure.Button
              className={[
                'group w-full flex items-center pr-2 py-2 text-left text-sm',
                'text-white font-medium rounded-md focus:outline-none'
              ].join(' ')}
            >
              <svg
                className={[
                  open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                  'mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                ].join(' ')}
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
              </svg>
              {name}
            </Disclosure.Button>
            <Disclosure.Panel>
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      <SingleLink name='Home' href='/' />
      <SeveralLinks name='Pokédex'>
        {games && games.map(game => (
          <SingleLink
            key={game.code}
            name={game.name}
            href={`/pokedex/${game.code}`}
          />
        ))}
      </SeveralLinks>

      <SeveralLinks name={'Types'}>
        {types && types.all.map(type => (
          <SingleLink
            key={type.code}
            name={type.name}
            href={`/type/${type.code}`}
          />
        ))}
      </SeveralLinks>

      <SeveralLinks name={'Research Tasks'}>
        {researchTasks.map(researchTask => (
          <SingleLink
            key={researchTask.toLowerCase()}
            name={`${researchTask} Research Tasks`}
            href={`/research-task/${researchTask.toLowerCase()}`}
          />
        ))}
      </SeveralLinks>

      <SingleLink name="Search Pokémon By Type" href="/search-by-type" />

      <SingleLink name='About' href='/about' />
    </nav>
  )
}
