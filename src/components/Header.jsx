export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-white"
              aria-hidden="true"
            >
              <path
                d="M6 8.5l6 4 6-4M6 8.5v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7M6 8.5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              AI Outreach Automation
            </h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Generate personalized podcast outreach emails and automate follow-ups.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
