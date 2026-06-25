// Centralized configuration & webhook communication for the n8n workflow.
//
// This frontend is a single-client control panel: it only collects campaign
// information and triggers the existing n8n workflow that handles lead reading,
// AI email generation, sending, and follow-ups.
//
// IMPORTANT: Make sure your n8n workflow is toggled ACTIVE (green toggle in
// top-right of the workflow editor) so the production webhook stays live.
// Test webhooks (/webhook-test/) only work for one request after clicking
// "Execute Workflow" — they will NOT work reliably from the dashboard.

const N8N_WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL ||
  '/webhook/email automation'

/**
 * Trigger the "start-campaign" n8n webhook.
 *
 * @param {Object} campaign - The campaign payload.
 * @param {string} campaign.campaignName
 * @param {string} campaign.podcastName
 * @param {string} campaign.hostName
 * @param {string} campaign.sheetUrl
 * @param {string} campaign.followupDelay - "3 Days" | "5 Days" | "7 Days"
 * @param {string} campaign.emailTone - "Friendly" | "Professional" | "Casual"
 * @returns {Promise<Object>} The parsed webhook response.
 * @throws {Error} When the network request fails or the webhook returns an error.
 */
export async function startCampaign(campaign) {
  const payload = {
    campaignName: campaign.campaignName || '',
    podcastName: campaign.podcastName || '',
    hostName: campaign.hostName || '',
    sheetUrl: campaign.sheetUrl || '',
    followupDelay: campaign.followupDelay || '',
    emailTone: campaign.emailTone || '',
  }

  let response
  try {
    response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (networkError) {
    // fetch rejects on network failures (DNS, CORS preflight, offline, etc.)
    throw new Error(
      'Unable to reach the n8n webhook. Please check the webhook URL and your network connection.',
    )
  }

  if (!response.ok) {
    const errorBody = await response.text()
    let detail = ''
    try {
      const json = JSON.parse(errorBody)
      detail = json.message || json.hint || ''
    } catch {
      detail = errorBody
    }

    if (response.status === 404) {
      throw new Error(
        `Webhook not found (${detail}). Make sure the n8n workflow is ACTIVE (green toggle) and the Webhook node path is "email automation".`,
      )
    }

    throw new Error(
      `Webhook responded with status ${response.status}: ${detail}`,
    )
  }

  // n8n webhook responses are usually JSON. Parse defensively in case the
  // workflow responds with text or an empty body.
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text ? { message: text } : { ok: true }
}

export { N8N_WEBHOOK_URL }
