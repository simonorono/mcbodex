import React from 'react'
import { useLocation, Link } from 'react-router-dom'

interface Props {
  onLinkClicked?: () => void
}

export default function Navigation(props: Props) {
  const { onLinkClicked } = props

  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ]

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => {
        const current = item.href === location.pathname

        return (
          <Link
            key={item.name}
            to={item.href}
            className={[
              current ? 'bg-blueGray-600 text-white' : 'text-white hover:bg-gray-50 hover:text-gray-900',
              'flex items-center px-3 py-2 text-sm font-medium rounded-md'
            ].join(' ')}
            aria-current={current ? 'page' : undefined}
            onClick={() => onLinkClicked && onLinkClicked()}
          >
            <span className="truncate">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
