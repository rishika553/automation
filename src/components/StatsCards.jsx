/**
 * @param {Object} props
 * @param {number} props.emailsSentMonth - Emails sent this month (from campaign data)
 * @param {number} props.emailsSentWeek - Emails sent this week (from campaign data)
 * @param {string} props.campaignStatus - Current status: "Ready" | "Running" | "Completed"
 * @param {string} [props.monthlyLimit] - Monthly limit text (default "200 Emails")
 * @param {string} [props.weeklyLimit] - Weekly limit text (default "50 Emails")
 */
export default function StatsCards({
  emailsSentMonth = 0,
  emailsSentWeek = 0,
  campaignStatus = 'Ready',
  monthlyLimit = '200 Emails',
  weeklyLimit = '50 Emails',
}) {
  const stats = [
    {
      key: 'monthly',
      label: 'Monthly Limit',
      value: monthlyLimit,
      icon: (
        <path
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
      accent: 'bg-brand-50 text-brand-600',
    },
    {
      key: 'weekly',
      label: 'Weekly Limit',
      value: weeklyLimit,
      icon: (
        <path
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
      accent: 'bg-sky-50 text-sky-600',
    },
    {
      key: 'sentMonth',
      label: 'Emails Sent This Month',
      value: emailsSentMonth,
      icon: (
        <path
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
      accent: 'bg-emerald-50 text-emerald-600',
    },
    {
      key: 'sentWeek',
      label: 'Emails Sent This Week',
      value: emailsSentWeek,
      icon: (
        <path
          d="M3 7l7.89 5.26a2 2 0 002.22 0L21 7M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
      accent: 'bg-amber-50 text-amber-600',
    },
    {
      key: 'status',
      label: 'Campaign Status',
      value: campaignStatus,
      icon: (
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
      accent: 'bg-violet-50 text-violet-600',
    },
  ]

  return (
    <section aria-label="Usage statistics">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.key} className="card flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {stat.label}
              </span>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.accent}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  {stat.icon}
                </svg>
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
