const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const campaignSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    advertiser: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= this.startDate
            },
            message: 'Endign date must be after Starting date'
        }
    },
    budget: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    impressionsServed: {
        type: Number,
        default: 0,
        min: 0
    },
    targetCountries: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'ended']
    },
}, {
    timestamps: true
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;
