const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export const getAllCampaigns = async (filters = {}) => {
    const params = new URLSearchParams(filters)
    
    const res = await fetch(`${API_URL}/api/campaigns?${params}`)
    if (!res.ok) throw new Error('Failed to fetch campaigns')
    return res.json()
}