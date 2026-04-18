export default function Loading() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute w-70 h-70 rounded-full blur-3xl opacity-30 z-0" 
           style={{ backgroundColor: '#8b5cf6', top: '5%', right: '10%' }} />
      <div className="absolute w-90 h-90 rounded-full blur-3xl opacity-40 z-0" 
           style={{ backgroundColor: '#3b82f6', top: '30%', left: '5%' }} />
      <div className="absolute w-50 h-50 rounded-full blur-3xl opacity-50 z-0" 
           style={{ backgroundColor: '#6366f1', bottom: '20%', right: '15%' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header Skeleton */}
        <header className="space-y-6">
          <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse" />
          
          <div className="space-y-4">
            <div className="h-10 w-96 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-6 w-80 bg-white/10 rounded-lg animate-pulse" />
            <div className="flex gap-4">
              <div className="h-5 w-20 bg-white/10 rounded animate-pulse" />
              <div className="h-5 w-24 bg-white/10 rounded animate-pulse" />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse" />
          </div>
        </header>

        {/* Study Section Skeleton */}
        <section className="text-center py-8 space-y-6">
          <div className="space-y-4">
            <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse mx-auto" />
            <div className="h-6 w-64 bg-white/10 rounded-lg animate-pulse mx-auto" />
          </div>
          <div className="h-12 w-48 bg-white/10 rounded-lg animate-pulse mx-auto" />
        </section>

        {/* Cards Grid Skeleton */}
        <section className="space-y-4">
          <div className="h-8 w-32 bg-white/10 rounded-lg animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden bg-white/10 backdrop-blur-md border-white/20 rounded-xl p-6 space-y-4"
              >
                <div className="h-6 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                <div className="flex justify-end">
                  <div className="h-8 w-8 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}