import React from 'react'

interface Props {
  helpText?: string,
  id: string,
  initialValue: boolean,
  label: string,
  onChange: (value: boolean) => void,
}

export default function Checkbox({ helpText, id, initialValue, label, onChange }: Props) {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          name="comments"
          type="checkbox"
          checked={initialValue}
          onChange={ev => onChange(ev.currentTarget.checked)}
          className="focus:ring-blueGray-700 h-4 w-4 text-blueGray-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-700">
          {label}
        </label>

        {helpText && (
          <span className="ml-3 text-gray-500">
            {helpText}
          </span>
        )}
      </div>
    </div>
  )
}
