import React, { Fragment } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../utils'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
  ability: Ability | null
  close: () => void
  open: boolean
}

export default function AbilityModal(props: Props) {
  const { ability, close, open } = props

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        onClose={() => close()}
        className="fixed inset-0 z-10 flex items-center justify-center"
      >
        <TransitionChild
          as={Fragment}
          enter="transition duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter="transition duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel>
            <div className="relative">
              <div className="mx-2 max-w-lg rounded-lg bg-white p-4 sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-hidden"
                    onClick={() => close()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-2 sm:flex sm:items-start sm:space-y-0 sm:space-x-4">
                  <div
                    className={classNames(
                      'bg-primary-100 mx-auto h-12 w-12 rounded-full',
                      'flex shrink-0 items-center justify-center'
                    )}
                  >
                    <InformationCircleIcon className="text-primary-600 h-7 w-7" />
                  </div>

                  {ability && (
                    <div className="space-y-2 text-center sm:text-left">
                      <DialogTitle className="text-lg font-medium">
                        {ability.name}
                      </DialogTitle>

                      <p className="text-sm">{ability.flavorText}</p>

                      <hr />

                      <p className="text-sm">
                        {ability.effect ||
                          '(Detailed effect text not yet available).'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  )
}
