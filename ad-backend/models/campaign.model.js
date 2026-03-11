const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const campaignSchema = new Schema({
    name: String,
    advertiser: String,
    startDate: Date,
    endDate: Date,
    budget: Number,
    impressionsServed: Number,
    targetCountries: [String],
    status: {
        type: String,
        enum: ['active', 'paused', 'ended']
    },
}, {
    timestamps: true
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;
