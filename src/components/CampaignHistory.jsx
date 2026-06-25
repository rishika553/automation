const STATUS_STYLES = {
  Running: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Completed: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  Paused: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Failed: 'bg-red-50 text-red-700 ring-red-600/20',
}

/**
 * @param {Object} props
 * @param {Array<{ id: string|number, campaignName: string, podcastName: string, status: string, createdDate: string }>} props.campaigns
 */
export default function CampaignHistory({ campaigns = [] }) {
  const hasData = campaigns.length > 0

  return (
    <section aria-label="Campaign history" className="card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Campaign History
          </h2>
          <p className="text-sm text-slate-500">
            Recent campaigns triggered from this dashboard.
          </p>
        </div>
      </div>

      {hasData ? (
        <>
          {/* Desktop + tablet table */}
          <div className="hidden overflow-hidden rounded-lg border border-slate-200 sm:block">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <Th>Campaign Name</Th>
                  <Th>Podcast Name</Th>
                  <Th>Leads</Th>
                  <Th>Status</Th>
                  <Th>Created Date</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {campaigns.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-slate-50">
                    <Td className="font-medium text-slate-900">
                      {row.campaignName}
                    </Td>
                    <Td>{row.podcastName}</Td>
                    <Td>
                      <span className="text-sm font-medium text-slate-700">
                        {row.leadsProcessed != null ? row.leadsProcessed : '—'}
                      </span>
                    </Td>
                    <Td>
                      <StatusBadge status={row.status} />
                    </Td>
                    <Td className="text-slate-500">{row.createdDate}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <ul className="space-y-3 sm:hidden">
            {campaigns.map((row) => (
              <li
                key={row.id}
                className="rounded-lg border border-slate-200 p-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {row.campaignName}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {row.podcastName}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {row.leadsProcessed != null && (
                      <span className="text-xs text-slate-500">
                        {row.leadsProcessed} leads
                      </span>
                    )}
                    <StatusBadge status={row.status} />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-400">{row.createdDate}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <EmptyState />
      )}
    </section>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50 px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            d="M9 17v-2m3 2v-4m3 4v-6m2 7H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="mt-3 text-sm font-medium text-slate-900">No campaigns yet</p>
      <p className="mt-1 text-sm text-slate-500">
        Campaigns you start will appear here.
      </p>
    </div>
  )
}

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Completed
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {status === 'Running' && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      )}
      {status}
    </span>
  )
}

function Th({ children }) {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
    >
      {children}
    </th>
  )
}

function Td({ children, className = '' }) {
  return (
    <td className={`px-4 py-3.5 text-sm text-slate-700 ${className}`}>
      {children}
    </td>
  )
}
