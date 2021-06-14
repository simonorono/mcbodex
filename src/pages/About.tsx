/**
 * Copyright 2021 Simón Oroño
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import Template from './Template'
import { version } from '../../package.json'

const A = (props: { [key: string]: any }) => {
  const {
    children,
    ...anchorProps
  } = props

  return (
    <a {...anchorProps} className="underline hover:font-medium">
      {children}
    </a>
  )
}

const Subtitle = (props: { children: React.ReactChild }) => (
  <h2 className="text-3xl font-bold mb-10">{props.children}</h2>
)

const P = (props: { children: any }) => (
  <p className="mb-10">{props.children}</p>
)

export default function About() {
  const year = (new Date).getFullYear()

  return (
    <>
      <Helmet>
        <title>About — RDex — rdex.mcbodev.com</title>
      </Helmet>

      <Template
        h1={<>RDex <span className="text-sm font-normal">({version})</span></>}
      >
        <Subtitle>What is this?</Subtitle>

        <P>
          RDex is a Pokédex viewer. It was created with the purpose of improving my React and Redux skills.
        </P>

        <Subtitle>Who am I?</Subtitle>

        <P>
          I am <A href="https://mcbodev.com">Simón Oroño</A>. Computer scientist, software developer and Pokémon fan.
        </P>

        <Subtitle>How was it built?</Subtitle>

        <p>
          RDex is a SPA built thanks to:
        </p>

        <ul className="list-disc ml-6 mt-2 mb-10">
          <li><A href="https://pokeapi.co/">PokeAPI</A></li>
          <li><A href="https://vitejs.dev/">Vite</A></li>
          <li><A href="https://reactjs.org/">React</A></li>
          <li><A href="https://redux.js.org/">Redux</A></li>
          <li><A href="https://www.typescriptlang.org/">TypeScript</A></li>
          <li><A href="https://www.tailwindcss.com/">TailwindCSS</A></li>
          <li><A href="https://tailwindui.com/">TailwindUI</A></li>
          <li><A href="https://localforage.github.io/localForage/">localForage</A></li>
        </ul>

        <Subtitle>Legal information</Subtitle>

        <P>
          Pokémon images & names © 1995-{year} Nintendo/Game Freak
        </P>
      </Template>
    </>
  )
}
