import React, { useEffect } from 'react'
import { APP_NAME, title } from '../utils'

const A = (props: { [key: string]: any }) => {
  const { children, ...anchorProps } = props

  return (
    <a {...anchorProps} className="underline hover:font-medium">
      {children}
    </a>
  )
}

const Subtitle = (props: { children: React.ReactChild }) => (
  <h2 className="mb-10 text-3xl font-bold">{props.children}</h2>
)

const P = (props: { children: any }) => (
  <p className="mb-10">{props.children}</p>
)

export default function About() {
  useEffect(() => {
    document.title = title('About')
  }, [])

  return (
    <>
      <h1 className="page-title">{APP_NAME}</h1>
      <Subtitle>What is this?</Subtitle>

      <P>
        {APP_NAME} is a Pokédex viewer. It was created with the purpose of improving
        my React and Redux skills.
      </P>

      <Subtitle>Who am I?</Subtitle>

      <P>
        I am <A href="https://simonorono.com">Simón Oroño</A>. Computer
        scientist, software developer and Pokémon fan.
      </P>

      <Subtitle>How was it built?</Subtitle>

      <p>{APP_NAME} is a SPA built thanks to:</p>

      <ul className="mb-10 ml-6 mt-2 list-disc">
        <li>
          <A href="https://pokeapi.co/">PokeAPI</A>
        </li>
        <li>
          <A href="https://vitejs.dev/">Vite</A>
        </li>
        <li>
          <A href="https://reactjs.org/">React</A>
        </li>
        <li>
          <A href="https://redux.js.org/">Redux</A>
        </li>
        <li>
          <A href="https://www.typescriptlang.org/">TypeScript</A>
        </li>
        <li>
          <A href="https://www.tailwindcss.com/">TailwindCSS</A>
        </li>
        <li>
          <A href="https://tailwindui.com/">TailwindUI</A>
        </li>
        <li>
          <A href="https://localforage.github.io/localForage/">localForage</A>
        </li>
        <li>
          <A href="https://fontsource.org/">Fontsource</A>
        </li>
        <li>
          <A href="https://rsms.me/inter/">Inter typeface</A>
        </li>
      </ul>

      <Subtitle>Legal information</Subtitle>

      <P>
        Pokémon images & names © 1995-{new Date().getFullYear()} Nintendo/Game
        Freak
      </P>
    </>
  )
}
