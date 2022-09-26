import React from 'react'
import { Link } from 'react-router-dom'

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
