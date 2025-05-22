import * as React from 'react'
import type { InputHTMLAttributes } from 'react'

import { Label } from '@/components/ui/label'
import { cn } from '@/utils/style-utils'

export interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon: React.ReactNode
  rightIcon?: React.ReactNode
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, type, label, id, error, icon, rightIcon, ...props }, ref) => {
    return (
      <div className='space-y-2'>
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className='relative'>
          <div className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'>
            {icon}
          </div>
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              error ? 'border-destructive focus-visible:ring-destructive' : '',
              'pl-10',
              rightIcon ? 'pr-10' : '',
              className,
            )}
            ref={ref}
            id={id}
            {...props}
          />
          {rightIcon && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className='text-sm font-medium text-destructive'>{error}</p>
        )}
      </div>
    )
  },
)
IconInput.displayName = 'IconInput'

export { IconInput }
