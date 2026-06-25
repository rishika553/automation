import { useState } from 'react'

const INITIAL_FORM = {
  campaignName: '',
  podcastName: '',
  hostName: '',
  sheetUrl: '',
  followupDelay: '3 Days',
  emailTone: 'Friendly',
}

const FOLLOWUP_OPTIONS = ['3 Days', '5 Days', '7 Days']
const TONE_OPTIONS = ['Friendly', 'Professional', 'Casual']

/**
 * @param {Object} props
 * @param {(campaign: typeof INITIAL_FORM) => Promise<void>} props.onSubmit
 * @param {boolean} props.loading
 */
export default function CampaignForm({ onSubmit, loading }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = () => {
    const next = {}
    if (!form.campaignName.trim()) next.campaignName = 'Campaign name is required.'
    if (!form.podcastName.trim()) next.podcastName = 'Podcast name is required.'
    if (!form.hostName.trim()) next.hostName = 'Host name is required.'
    if (!form.sheetUrl.trim()) {
      next.sheetUrl = 'Google Sheet URL is required.'
    } else if (!/^https?:\/\/.+/i.test(form.sheetUrl.trim())) {
      next.sheetUrl = 'Enter a valid URL starting with http(s)://'
    }
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    await onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="card" noValidate>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d="M9 13h6m-6 4h6M9 7h6m-7 14h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Create Campaign
          </h2>
          <p className="text-sm text-slate-500">
            Fill in the details to trigger your outreach workflow.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id="campaignName"
          label="Campaign Name"
          value={form.campaignName}
          onChange={handleChange('campaignName')}
          error={errors.campaignName}
          placeholder="e.g. Podcast Outreach"
          disabled={loading}
        />
        <Field
          id="podcastName"
          label="Podcast Name"
          value={form.podcastName}
          onChange={handleChange('podcastName')}
          error={errors.podcastName}
          placeholder="e.g. The Manas Show"
          disabled={loading}
        />
        <Field
          id="hostName"
          label="Host Name"
          value={form.hostName}
          onChange={handleChange('hostName')}
          error={errors.hostName}
          placeholder="e.g. Manas Sharma"
          disabled={loading}
        />
        <Field
          id="sheetUrl"
          label="Google Sheet URL"
          type="url"
          value={form.sheetUrl}
          onChange={handleChange('sheetUrl')}
          error={errors.sheetUrl}
          placeholder="https://docs.google.com/spreadsheets/..."
          disabled={loading}
        />
        <SelectField
          id="followupDelay"
          label="Follow-Up Delay"
          value={form.followupDelay}
          onChange={handleChange('followupDelay')}
          options={FOLLOWUP_OPTIONS}
          disabled={loading}
        />
        <SelectField
          id="emailTone"
          label="Email Tone"
          value={form.emailTone}
          onChange={handleChange('emailTone')}
          options={TONE_OPTIONS}
          disabled={loading}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Starting Campaign...
            </>
          ) : (
            'Start Campaign'
          )}
        </button>
      </div>
    </form>
  )
}

function Field({ id, label, value, onChange, error, type = 'text', placeholder, disabled }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        className={`input ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/30' : ''}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

function SelectField({ id, label, value, onChange, options, disabled }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="input appearance-none pr-9"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
