import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg max-w-2xl w-full">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500 mr-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-red-700">Access Denied</h1>
        </div>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page. This area is
          restricted to administrative users only.
        </p>
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
