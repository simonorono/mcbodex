import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { useAppSelector } from '../store/hooks'
import { types } from '../utils'
import researchTasksGroupsData from 'rdex-data/handcrafted/research_tasks.json'

interface Props {
  onLinkClicked?: () => void
}

interface LinkProps {
  name: string
  href: string
}

interface SeveralLinksProps {
  name: string
  children?: ReactNode
}

export default function Navigation({ onLinkClicked }: Props) {
  const location = useLocation()

  const games = useAppSelector(state => state.pokedex.allGames)

  function SingleLink({ name, href }: LinkProps) {
    const current = href === location.pathname

    return (
      <Link
        to={href}
        className={[
          current
            ? 'bg-primary-600 text-white'
            : 'text-white hover:bg-gray-50 hover:text-gray-900',
          'flex items-center rounded-md px-3 py-2 text-sm font-medium',
        ].join(' ')}
        onClick={onLinkClicked}
      >
        <span className="truncate">{name}</span>
      </Link>
    )
  }

  function SeveralLinks({ name, children }: SeveralLinksProps) {
    return (
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={[
                'group flex w-full items-center py-2 pr-2 text-left text-sm',
                'rounded-md font-medium text-white focus:outline-none',
              ].join(' ')}
            >
              <ChevronRightIcon
                className={[
                  open ? 'rotate-90 text-gray-400' : 'text-gray-300',
                  'mr-2 h-5 w-5 flex-shrink-0 transform transition-all duration-150 ease-in-out group-hover:text-white',
                ].join(' ')}
              />
              {name}
            </Disclosure.Button>
            <Disclosure.Panel className="ml-4">{children}</Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      <SingleLink name="Home" href="/" />
      <SeveralLinks name="Pokédex">
        {games &&
          games.map(game => (
            <SingleLink
              key={game.code}
              name={game.name}
              href={`/pokedex/${game.code}`}
            />
          ))}
      </SeveralLinks>

      <SeveralLinks name={'Types'}>
        {types &&
          types.all.map(type => (
            <SingleLink
              key={type.code}
              name={type.name}
              href={`/type/${type.code}`}
            />
          ))}
      </SeveralLinks>

      <SeveralLinks name={'Research Tasks'}>
        {researchTasksGroupsData.map(researchTaskGroup => (
          <SingleLink
            key={researchTaskGroup.name.toLowerCase()}
            name={`${researchTaskGroup.name} Research Tasks`}
            href={`/research-task/${researchTaskGroup.code}`}
          />
        ))}
      </SeveralLinks>

      <SingleLink name="Search Pokémon By Type" href="/search-by-type" />

      <SingleLink
        name="Search Pokémon By EV Yield"
        href="/search-by-ev-yield"
      />

      <SingleLink name={"Who's that Pokémon?"} href="/whos-that-pokemon" />

      <SingleLink name="About" href="/about" />

      {import.meta.env.MODE === 'development' && (
        <SingleLink name="Debug" href="/debug" />
      )}
    </nav>
  )
}
