export interface ICampaign {
    _id: string
    name: string
    advertiser: string
    startDate: string
    endDate: string
    budget: number
    impressionsServed: number
    targetCountries: string[]
    status: 'active' | 'paused' | 'ended'
    createdAt: string
    updatedAt: string
}

export interface ICampaignFilter {
    advertiser: string
    targetCountries: string[]
    status: 'active' | 'paused' | 'ended'
}