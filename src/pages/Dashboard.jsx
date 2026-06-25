import { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import StatsCards from '../components/StatsCards.jsx'
import CampaignForm from '../components/CampaignForm.jsx'
import CampaignHistory from '../components/CampaignHistory.jsx'
import SuccessCard from '../components/SuccessCard.jsx'
import Toast from '../components/Toast.jsx'
import { startCampaign } from '../services/n8nService.js'

const formatDate = () =>
  new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

const STORAGE_KEY = 'ai-outreach-dashboard'

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {
    // ignore parse errors
  }
  return null
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore storage errors
  }
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [successCampaign, setSuccessCampaign] = useState(null)
  const [toast, setToast] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [stats, setStats] = useState({
    emailsSentMonth: 0,
    emailsSentWeek: 0,
    campaignStatus: 'Ready',
    monthlyLimit: '200 Emails',
    weeklyLimit: '50 Emails',
  })

  // Load persisted data from localStorage on mount
  useEffect(() => {
    const saved = loadState()
    if (saved) {
      if (saved.campaigns) setCampaigns(saved.campaigns)
      if (saved.stats) setStats(saved.stats)
    }
  }, [])

  // Persist state whenever campaigns or stats change
  useEffect(() => {
    saveState({ campaigns, stats })
  }, [campaigns, stats])

  // Reset campaign status after 5 minutes when running
  useEffect(() => {
    if (stats.campaignStatus === 'Running') {
      const timer = setTimeout(() => {
        setStats((prev) => ({ ...prev, campaignStatus: 'Ready' }))
        setCampaigns((prev) =>
          prev.map((c) => (c.status === 'Running' ? { ...c, status: 'Completed' } : c)),
        )
      }, 5 * 60 * 1000)
      return () => clearTimeout(timer)
    }
  }, [stats.campaignStatus])

  const handleSubmit = async (campaign) => {
    setLoading(true)
    try {
      const response = await startCampaign(campaign)

      // Extract real data from webhook response if available
      const responseData = response || {}
      const emailsSent = responseData.emailsSent
      const leadCount = responseData.leadCount
      const leadsProcessed = typeof leadCount === 'number' ? leadCount : 0

      const newStats = {
        emailsSentMonth: stats.emailsSentMonth + leadsProcessed,
        emailsSentWeek: stats.emailsSentWeek + leadsProcessed,
        campaignStatus: 'Running',
        monthlyLimit: responseData.monthlyLimit || stats.monthlyLimit,
        weeklyLimit: responseData.weeklyLimit || stats.weeklyLimit,
      }
      setStats(newStats)

      const entry = {
        id: Date.now(),
        campaignName: campaign.campaignName,
        podcastName: campaign.podcastName,
        status: 'Running',
        createdDate: formatDate(),
        leadsProcessed: leadsProcessed,
      }
      setCampaigns((prev) => [entry, ...prev])
      setSuccessCampaign({
        campaignName: campaign.campaignName,
        podcastName: campaign.podcastName,
      })
    } catch (err) {
      setToast({
        type: 'error',
        message:
          err.message || 'Failed to start campaign. Please check the webhook URL.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => setSuccessCampaign(null)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <StatsCards
          emailsSentMonth={stats.emailsSentMonth}
          emailsSentWeek={stats.emailsSentWeek}
          campaignStatus={stats.campaignStatus}
          monthlyLimit={stats.monthlyLimit}
          weeklyLimit={stats.weeklyLimit}
        />

        {successCampaign ? (
          <SuccessCard
            campaign={successCampaign}
            onReset={handleReset}
            weeklyLimit={stats.weeklyLimit}
            monthlyLimit={stats.monthlyLimit}
          />
        ) : (
          <CampaignForm onSubmit={handleSubmit} loading={loading} />
        )}

        <CampaignHistory campaigns={campaigns} />
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-slate-400">
          AI Outreach Automation · Connected to your n8n workflow
        </p>
      </footer>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}
