import React, { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import AbilityModal from './AbilityModal'
import { classNames } from '../../utils'

interface Props {
  abilitiesRel: AbilityRelationship[]
}

interface AbilityProps {
  ability: Ability
  hidden: boolean
}

function Ability({ ability, hidden }: AbilityProps) {
  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <>
      <AbilityModal
        ability={ability}
        isOpen={isModalOpened}
        setIsOpen={setIsModalOpened}
      />

      <div className="text-right">
        <p
          className={classNames(
            'inline-block cursor-pointer leading-4',
            'underline decoration-primary-500/75 decoration-2'
          )}
          onClick={() => setIsModalOpened(true)}
        >
          {`${ability.name}${hidden ? ' (hidden)' : ''}`}
        </p>
      </div>
    </>
  )
}

export default function Abilities({ abilitiesRel }: Props) {
  const abilityById = useAppSelector(state => state.abilities.byId)

  const abilities: Ability[] = []
  const hiddenAbilities: Ability[] = []

  abilitiesRel.forEach(_ =>
    (_.hidden ? hiddenAbilities : abilities).push(abilityById[_.id])
  )

  return (
    <>
      <div className="flex flex-col space-y-4 sm:space-y-1">
        {abilities.map(ability => (
          <Ability key={ability.id} ability={ability} hidden={false} />
        ))}

        {hiddenAbilities.map(ability => (
          <Ability key={ability.id} ability={ability} hidden={true} />
        ))}
      </div>
    </>
  )
}
