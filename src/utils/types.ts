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

import types from '../../data/raw/types.json'

const ALL_TYPES: Type[] = types

interface TypeClasses {
  border: string,
  background: string,
  color: string
}

type ById = { [id: number]: Type }
type ByCode = { [code: string]: Type }
type TypeClassesMap = { [key: string]: TypeClasses }

const typeClasses: TypeClassesMap = {
  normal: {
    border: 'border-warmGray-400',
    background: 'bg-warmGray-200',
    color: 'text-black'
  },

  fighting: {
    border: 'border-red-900',
    background: 'bg-red-700',
    color: 'text-white'
  },

  flying: {
    border: 'border-violet-300',
    background: 'bg-violet-200',
    color: 'text-black'
  },

  poison: {
    border: 'border-fuchsia-900',
    background: 'bg-fuchsia-700',
    color: 'text-white'
  },

  ground: {
    border: 'border-yellow-600',
    background: 'bg-yellow-500',
    color: 'text-black'
  },

  rock: {
    border: 'border-yellow-900',
    background: 'bg-yellow-800',
    color: 'text-white'
  },

  bug: {
    border: 'border-lime-400',
    background: 'bg-lime-200',
    color: 'text-black'
  },

  ghost: {
    border: 'border-black',
    background: 'bg-purple-900',
    color: 'text-white'
  },

  steel: {
    border: 'border-blueGray-400',
    background: 'bg-blueGray-300',
    color: 'text-black'
  },

  fire: {
    border: 'border-orange-500',
    background: 'bg-orange-400',
    color: 'text-black'
  },

  water: {
    border: 'border-blue-800',
    background: 'bg-blue-600',
    color: 'text-white'
  },

  grass: {
    border: 'border-green-800',
    background: 'bg-green-700',
    color: 'text-white'
  },

  electric: {
    border: 'border-yellow-400',
    background: 'bg-yellow-200',
    color: 'text-black'
  },

  psychic: {
    border: 'border-pink-700',
    background: 'bg-pink-600',
    color: 'text-white'
  },

  ice: {
    border: 'border-cyan-400',
    background: 'bg-cyan-200',
    color: 'text-black'
  },

  dragon: {
    border: 'border-violet-900',
    background: 'bg-violet-700',
    color: 'text-white'
  },

  dark: {
    border: 'border-black',
    background: 'bg-warmGray-700',
    color: 'text-white'
  },

  fairy: {
    border: 'border-rose-300',
    background: 'bg-rose-200',
    color: 'text-black'
  }
}

class Types {
  byId: ById
  byCode: ByCode

  constructor() {
    this.byId = ALL_TYPES.reduce(
      (byId, type: Type) => {
        byId[type.id] = type
        return byId
      },
      {} as ById
    )

    this.byCode = ALL_TYPES.reduce(
      (byCode, type: Type) => {
        byCode[type.code] = type
        return byCode
      },
      {} as ByCode
    )
  }

  classesForType(type: Type): TypeClasses {
    return typeClasses[type.code]
  }

  superEffectiveAgainst(type: Type): Type[] {
    return type.damageRelationships.filter(rel => rel.factor > 1)
      .map(rel => this.byId[rel.typeId])
  }

  notVeryEffectiveAgainst(type: Type): Type[] {
    return type.damageRelationships.filter(rel => rel.factor < 1 && rel.factor > 0)
      .map(rel => this.byId[rel.typeId])
  }

  noEffectAgainst(type: Type): Type[] {
    return type.damageRelationships.filter(rel => rel.factor === 0)
      .map(rel => this.byId[rel.typeId])
  }
}

export default (new Types())
