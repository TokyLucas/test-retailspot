const Campaign = require('../models/campaign.model');

exports.getAllCampaign = async (req, res, next) => {
    try {
        const query = req.query;
        console.log(query)
        const campaigns = await Campaign.find({
            ...(query.status && { status: query.status }),
            ...(query.advertiser && { advertiser: { $regex: query.advertiser, $options: 'i' } }),
            ...(query.country && { targetCountries: { $in: query.country } }),
        });
        res.json(campaigns);
    } catch (err) {
        next(err);
    }
};

exports.postCampaign = async (req, res, next) => {
    try {
        const campaign = await Campaign.create(req.body);
        res.status(201).json({ message: `Campaign '${campaign.name}' created with id: ${campaign._id}` });
    } catch (err) {
        if (err.name === 'ValidationError' || err.options?.name == 'ValidationError') {
            return res.status(400).json({ error: err.message })
        }
        next(err);
    }
};

