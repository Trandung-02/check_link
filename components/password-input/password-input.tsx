'use client'

import { useState, forwardRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { fieldInput, fieldShell } from '@/components/privacy-flow/ui-styles'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ className, invalid, ...props }, ref) => {
  const [show, setShow] = useState(false)

  return (
    <div className={`${fieldShell(!!invalid)} ${className ?? ''}`.trim()}>
      <input
        type={show ? 'text' : 'password'}
        ref={ref}
        className={`${fieldInput} hide-password-toggle min-w-0 flex-1 px-3`}
        {...props}
        autoComplete="new-password"
        autoSave="off"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="flex shrink-0 items-center border-l border-slate-100 bg-slate-50/80 px-3 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        tabIndex={-1}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>

      <style>
        {`
                        .hide-password-toggle::-ms-reveal,
                        .hide-password-toggle::-ms-clear {
                            display: none;
                        }
                    `}
      </style>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'
export default PasswordInput
