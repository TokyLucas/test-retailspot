const Campaign = require('../models/campaign.model');

exports.getAllCampaign = async (req, res, next) => {
    try {
        var query = req.query;
        console.log(query)
        var campaigns = await Campaign.find({
            ...query.status && { status: query.status },
            ...query.advertiser && { advertiser: { $regex: query.advertiser, $options: 'i' } },
            ...query.country && { targetCountries: { $in: query.country } },
        });
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

exports.postCampaign = async (req, res, next) => {
    try {
        var campaign = await Campaign.create(req.body);
        res.status(201).json({ message: `Campaign '${campaign.name}' created with id: ${campaign._id}` });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

