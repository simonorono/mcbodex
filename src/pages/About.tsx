import React, { useEffect } from 'react'
import Layout from './Layout'
import { APP_NAME, title } from '../utils'

const A = (props: { [key: string]: any }) => {
  const { children, ...anchorProps } = props

  return (
    <a {...anchorProps} className="underline hover:font-medium">
      {children}
    </a>
  )
}

const Subtitle = (props: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold">{props.children}</h2>
)

export default function About() {
  useEffect(() => {
    document.title = title('About')
  }, [])

  const year = new Date().getFullYear()

  return (
    <Layout className="space-y-10" title={APP_NAME}>
      <div className="space-y-6">
        <Subtitle>What is this?</Subtitle>

        <p>
          {APP_NAME} is a Pokédex viewer. It was created with the purpose of
          improving my React and Redux skills.
        </p>
      </div>

      <div className="space-y-6">
        <Subtitle>Who am I?</Subtitle>

        <p>
          I am <A href="https://simonorono.com">Simón Oroño</A>. Computer
          scientist, software developer and Pokémon fan.
        </p>
      </div>

      <div className="space-y-6">
        <Subtitle>How was it built?</Subtitle>

        <p>Made with ❤️ in the city of Maracaibo, Venezuela.</p>

        <p>{APP_NAME} is possible thanks to the following dependencies:</p>

        <ul className="mt-2 ml-6 list-disc">
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
      </div>

      <div className="space-y-6">
        <Subtitle>Legal information</Subtitle>

        <p>
          Pokémon © 2002-{year} Pokémon. © 1995-{year} Nintendo/Creatures
          Inc./GAME FREAK inc. TM, ® and Pokémon character names are trademarks
          of Nintendo.
        </p>

        <p>
          No copyright or trademark infringement is intended in using Pokémon
          content.
        </p>
      </div>
    </Layout>
  )
}
