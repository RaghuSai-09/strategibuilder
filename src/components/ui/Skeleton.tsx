import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-navy-100/60',
        className
      )}
    />
  );
}

export function SkeletonLine({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-4 w-full', className)} />;
}

export function SkeletonCircle({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-10 w-10 rounded-full', className)} />;
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn('bg-white rounded-2xl border border-navy-100 p-5', className)}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-8 w-12 rounded-lg" />
      </div>
      <SkeletonLine className="w-2/3 mb-2" />
      <SkeletonLine className="w-1/2 h-3" />
    </div>
  );
}

/**
 * Full dashboard skeleton shown while auth is loading
 */
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Skeleton */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-navy-100">
        <div className="p-6 border-b border-navy-100">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div className="space-y-2 flex-1">
              <SkeletonLine className="w-24" />
              <SkeletonLine className="w-16 h-3" />
            </div>
          </div>
        </div>

        <div className="p-4 mx-4 mt-4">
          <div className="flex items-center gap-3 mb-4">
            <SkeletonCircle />
            <div className="space-y-2 flex-1">
              <SkeletonLine className="w-28" />
              <SkeletonLine className="w-36 h-3" />
            </div>
          </div>
        </div>

        <div className="px-4 mt-4">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        <div className="px-4 mt-6 space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-navy-100 px-6 py-4 flex items-center justify-between">
          <Skeleton className="h-10 w-64 rounded-lg" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>

          {/* Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-2xl" />
              <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
