// Centralized configuration & webhook communication for the n8n workflow.
//
// This frontend is a single-client control panel: it only collects campaign
// information and triggers the existing n8n workflow that handles lead reading,
// AI email generation, sending, and follow-ups.
//
// IMPORTANT: Make sure your make workflow is toggled ACTIVE (green toggle in
// top-right of the workflow editor) so the production webhook stays live.
// Test webhooks (/webhook-test/) only work for one request after clicking
// "Execute Workflow" — they will NOT work reliably from the dashboard.

const MAKE_WEBHOOK_URL =
  import.meta.env.VITE_MAKE_WEBHOOK_URL ||
  "https://hook.eu1.make.com/4wryssdox4iq3fmu98wqi3asi65qx8fj";
/**
 * Trigger the "start-campaign" make webhook.
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
  
  console.log("MAKE_WEBHOOK_URL:", MAKE_WEBHOOK_URL);

  let response;
  try {
    response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (networkError) {
    // fetch rejects on network failures (DNS, CORS preflight, offline, etc.)
    throw new Error(
      'Unable to reach the make webhook. Please check the webhook URL and your network connection.',
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
        `Webhook not found (${detail}). Make sure the make workflow is ACTIVE (green toggle) and the Webhook node path is "email automation".`,
      )
    }

    throw new Error(
      `Webhook responded with status ${response.status}: ${detail}`,
    )
  }

  // make webhook responses are usually JSON. Parse defensively in case the
  // workflow responds with text or an empty body.
  const contentType = response.headers.get('content-type') || ''
  const responseText = await response.text()
  if (contentType.includes('application/json')) {
    if (!responseText) {
      return { ok: true }
    }
    try {
      return JSON.parse(responseText)
    } catch {
      return { message: responseText }
    }
  }

  return responseText ? { message: responseText } : { ok: true }
}

export { MAKE_WEBHOOK_URL }
