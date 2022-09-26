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
  onClick: () => void
}

function Ability({ ability, hidden, onClick }: AbilityProps) {
  return (
    <div className="text-right">
      <p
        className={classNames(
          'inline-block cursor-pointer leading-4',
          'underline decoration-primary-500/75 decoration-2'
        )}
        onClick={onClick}
      >
        {`${ability.name}${hidden ? ' (hidden)' : ''}`}
      </p>
    </div>
  )
}

export default function Abilities({ abilitiesRel }: Props) {
  const abilityById = useAppSelector(state => state.abilities.byId)
  const [abilityInModal, setAbilityInModal] = useState(null as Ability | null)

  const abilities: Ability[] = []
  const hiddenAbilities: Ability[] = []

  abilitiesRel.forEach(_ =>
    (_.hidden ? hiddenAbilities : abilities).push(abilityById[_.id])
  )

  return (
    <>
      <AbilityModal
        ability={abilityInModal}
        close={() => setAbilityInModal(null)}
      />

      <div className="flex flex-col space-y-4 sm:space-y-1">
        {abilities.map(ability => (
          <Ability
            key={ability.id}
            ability={ability}
            hidden={false}
            onClick={() => setAbilityInModal(ability)}
          />
        ))}

        {hiddenAbilities.map(ability => (
          <Ability
            key={ability.id}
            ability={ability}
            hidden={true}
            onClick={() => setAbilityInModal(ability)}
          />
        ))}
      </div>
    </>
  )
}
