import { useEffect } from 'react'

/**
 * Lightweight toast notification. Used to surface the campaign-start error.
 *
 * @param {Object} props
 * @param {{ message: string, type?: 'error' | 'success' } | null} props.toast
 * @param {() => void} props.onClose
 * @param {number} [props.duration] - auto-dismiss in ms (default 5000).
 */
export default function Toast({ toast, onClose, duration = 5000 }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [toast, onClose, duration])

  if (!toast) return null

  const isError = toast.type !== 'success'
  const palette = isError
    ? 'border-red-200 bg-white text-red-800'
    : 'border-emerald-200 bg-white text-emerald-800'

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-xl border px-4 py-3 shadow-card-hover ${palette}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`mt-0.5 h-5 w-5 shrink-0 ${isError ? 'text-red-500' : 'text-emerald-500'}`}
          aria-hidden="true"
        >
          {isError ? (
            <path
              d="M12 9v3.75m0 3.75h.007M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
        <p className="flex-1 text-sm font-medium leading-5">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md p-0.5 text-slate-400 transition-colors hover:text-slate-600"
          aria-label="Dismiss notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
