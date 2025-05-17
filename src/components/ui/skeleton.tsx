import { cn } from '@/utils/style-utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
      role='skeleton'
    />
  )
}

export { Skeleton }
