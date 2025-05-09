import React from 'react'

interface Props {
  helpText?: string
  id: string
  initialValue: boolean
  label: string
  onChange: (value: boolean) => void
}

export default function Checkbox(props: Props) {
  const { helpText, id, initialValue, label, onChange } = props

  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          id={id}
          name="comments"
          type="checkbox"
          checked={initialValue}
          onChange={ev => onChange(ev.currentTarget.checked)}
          className="text-primary-600 focus:ring-primary-700 h-4 w-4 rounded-xs border-gray-300"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-700">
          {label}
        </label>

        {helpText && <span className="ml-3 text-gray-500">{helpText}</span>}
      </div>
    </div>
  )
}
