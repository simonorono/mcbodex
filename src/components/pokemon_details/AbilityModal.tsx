import React from 'react'
import { Dialog } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils'
import { XIcon } from '@heroicons/react/solid'

interface AbilityModalOpen {
  ability: Ability,
  isOpen: boolean,
  setIsOpen: (open: boolean) => void
}

export default function AbilityModal({ ability, isOpen, setIsOpen }: AbilityModalOpen) {
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />

      <div className="relative">
        <div className="bg-white mx-2 p-4 sm:p-6 rounded-lg max-w-lg">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="sm:flex sm:items-start space-y-2 sm:space-x-4 sm:space-y-0">
            <div className={classNames(
              "h-12 w-12 mx-auto rounded-full bg-primary-100",
              "flex justify-center items-center shrink-0"
            )}>
              <InformationCircleIcon className="h-7 w-7 text-primary-600" />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <Dialog.Title className="text-lg font-medium">
                {ability.name}
              </Dialog.Title>

              <p className="text-sm">{ability.effect}</p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
