import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { title } from '../../utils'

interface DebugLinkProps {
  href: string
  text: string
}

function DebugLink(props: DebugLinkProps) {
  const { href, text } = props

  return (
    <Link to={href} className="underline sm:no-underline sm:hover:underline">
      {text}
    </Link>
  )
}

export default function DebugIndex() {
  useEffect(() => {
    document.title = title('Debug pages')
  }, [])

  return (
    <ul className="list-disc">
      <li>
        <DebugLink href="/debug/pokemon" text="Pokémon list" />
      </li>
      <li>
        <DebugLink href="/debug/repeated" text="Repeated names" />
      </li>
    </ul>
  )
}
