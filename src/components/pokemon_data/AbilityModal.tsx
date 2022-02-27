import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils'
import { XIcon } from '@heroicons/react/solid'

interface AbilityModalProps {
  ability: Ability
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function AbilityModal(props: AbilityModalProps) {
  const { ability, isOpen, setIsOpen } = props

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 flex items-center justify-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />

        <div className="relative">
          <div className="mx-2 max-w-lg rounded-lg bg-white p-4 sm:p-6">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-2 sm:flex sm:items-start sm:space-x-4 sm:space-y-0">
              <div
                className={classNames(
                  'mx-auto h-12 w-12 rounded-full bg-primary-100',
                  'flex shrink-0 items-center justify-center'
                )}
              >
                <InformationCircleIcon className="h-7 w-7 text-primary-600" />
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <Dialog.Title className="text-lg font-medium">
                  {ability.name}
                </Dialog.Title>

                <p className="text-sm">{ability.flavorText}</p>

                <hr />

                <p className="text-sm">
                  {ability.effect ||
                    '(Detailed effect text not yet available).'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
