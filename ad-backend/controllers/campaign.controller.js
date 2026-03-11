const Campaign = require('../models/campaign.model');

exports.getAllCampaign = async (req, res, next) => {
    try {
        const query = req.query;
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

exports.serveAd = async (req, res, next) => {
    try {
        const body = req.body;
        const today = new Date();

        const matching = await Campaign.aggregate([
            {
                $match: {
                    status: 'active',
                    startDate: { $lte: today },
                    endDate: { $gte: today },
                    targetCountries: { $in: [body.country] },
                    $expr: { $gt: ['$budget', '$impressionsServed'] }
                }
            },
            { $sample: { size: 1 } }
        ])

        if (!matching.length) {
            return res.status(404).json({ error: 'No campaign available' })
        }

        const campaign = await Campaign.findByIdAndUpdate(
            matching[0]._id,
            { $inc: { impressionsServed: 1 } },
            { new: true }
        );
        
        res.json(campaign);
    } catch (err) {
        next(err);
    }
};

exports.stats = async (req, res, next) => {
    try {
        const query = req.query;
        const limit = parseInt(query.limit) || 5;

        const totalCampaigns = await Campaign.countDocuments();
        const activeCampaigns = await Campaign.countDocuments({ status: 'active' });
        const totalImpressions = await Campaign.aggregate([
            { $group: { _id: null, total: { $sum: '$impressionsServed' } } }
        ]);
        const topAdvertisers = await Campaign.aggregate([
            {
                $group: {
                    _id: '$advertiser',
                    totalCampaigns: { $sum: 1 },
                    activeCampaigns: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
                    totalImpressions: { $sum: '$impressionsServed' },
                }
            },
            { $sort: { totalImpressions: -1, activeCampaigns: -1, totalImpressions: -1 } },
            { $limit: limit }
        ]);

        var stats = {
            "totalCampaings": totalCampaigns,
            "activeCampaings": activeCampaigns,
            "totalImpressions": totalImpressions[0]?.total || 0,
            "topAdvertisers": topAdvertisers
        };

        res.json(stats);
    } catch (err) {
        next(err);
    }
}
