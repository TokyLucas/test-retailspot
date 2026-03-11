const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export const getAllCampaigns = async (filters = {}) => {
    const params = new URLSearchParams(filters)

    const res = await fetch(`${API_URL}/api/campaigns?${params}`)
    if (!res.ok) throw new Error('Failed to fetch campaigns')
    return res.json()
}

export const createCampaign = async (campaignData) => {
    const res = await fetch(`${API_URL}/api/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.error || 'Failed to create campaign')
    }

    return data
}

export const serveAd = async (filters) => {
    const res = await fetch(`${API_URL}/api/serve-ad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.error || 'Failed to serve ad')
    }

    return data
}

export const getStats = async () => {
    const res = await fetch(`${API_URL}/api/stats`)
    if (!res.ok) throw new Error('Failed to fetch stats')
    return res.json()
}