export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 animate-pulse"></div>
        </div>

        {/* Quick Stats Loading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="ml-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse mb-2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-8 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse mb-4"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}