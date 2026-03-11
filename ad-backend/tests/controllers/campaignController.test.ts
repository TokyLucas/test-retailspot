import request from 'supertest'
import app from '../../app'
import Campaign from '../../models/campaign.model'

jest.mock('../../models/campaign.model')

describe('Campaign Controller', () => {
    describe('getAllCampaign', () => {
        it('should return all campaigns with status 200', async () => {
            const mockCampaigns = [
                { name: 'Summer Sale', advertiser: 'Nike', status: 'active' },
                { name: 'Winter Sale', advertiser: 'Adidas', status: 'paused' },
            ];
            (Campaign.find as jest.Mock).mockResolvedValue(mockCampaigns);

            const res = await request(app).get('/api/campaigns');
            expect(res.status).toBe(200)
            expect(res.body).toHaveLength(2)
            expect(res.body[0].name).toBe('Summer Sale');
        });

        it('should filter by status with status 200', async () => {
            const mockCampaigns = [
                { name: 'Summer Sale', status: 'active' }
            ];
            (Campaign.find as jest.Mock).mockResolvedValue(mockCampaigns);

            const res = await request(app).get('/api/campaigns?status=active')

            expect(res.status).toBe(200)
            expect(res.body[0].status).toBe('active')
        })
    });

    describe('postCampaign', () => {
        it('should create a campaign and return with status 201', async () => {
            const mockId = "69b10f92d59dcf6211aa7808"
            const mockCampaign = {
                "_id": mockId,
                "name": "Summer Campaign",
                "advertiser": "Nike",
                "startDate": "2026-02-01",
                "endDate": "2026-06-05",
                "budget": 10000,
                "targetCountries": [
                    "FR",
                    "ES"
                ],
                "status": "active"
            };
            (Campaign.create as jest.Mock).mockResolvedValue(mockCampaign);

            const res = await request(app)
                .post('/api/campaigns')
                .send(mockCampaign);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toContain('Summer Campaign');
            expect(res.body.message).toContain(mockId);
        });

    });
});