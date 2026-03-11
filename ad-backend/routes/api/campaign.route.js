var express = require('express');
var router = express.Router();
const campaignController = require('../../controllers/campaign.controller');

router.get('/campaigns', campaignController.getAllCampaign);
router.post('/campaigns', campaignController.postCampaign);
router.post('/serve-ad', campaignController.serveAd);

module.exports = router;