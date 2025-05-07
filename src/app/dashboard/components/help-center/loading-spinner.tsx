export function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
          aria-label="Loading"
        ></div>
      </div>
    )
  }
  