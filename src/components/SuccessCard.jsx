/**
 * Success state shown after the n8n webhook accepts the campaign.
 *
 * @param {Object} props
 * @param {{ campaignName: string, podcastName: string }} props.campaign
 * @param {() => void} props.onReset
 * @param {string} [props.weeklyLimit] - Current weekly limit text
 * @param {string} [props.monthlyLimit] - Current monthly limit text
 */
export default function SuccessCard({
  campaign,
  onReset,
  weeklyLimit = '50 Emails',
  monthlyLimit = '200 Emails',
}) {
  return (
    <div className="card mx-auto max-w-2xl border-emerald-100">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-7 w-7 text-emerald-600"
            aria-hidden="true"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">
          Campaign Started Successfully
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Your outreach workflow has been triggered. n8n is now generating and
          sending emails.
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Campaign Name
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-900">
            {campaign.campaignName}
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Podcast Name
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-900">
            {campaign.podcastName}
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Status
          </dt>
          <dd className="mt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Running
            </span>
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Current Weekly Limit
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-900">
            {weeklyLimit}
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-4 py-3 sm:col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Current Monthly Limit
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-900">
            {monthlyLimit}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex justify-center">
        <button type="button" onClick={onReset} className="btn-primary">
          Start Another Campaign
        </button>
      </div>
    </div>
  )
}
