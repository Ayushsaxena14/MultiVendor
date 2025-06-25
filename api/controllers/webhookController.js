const { updateJobWithVendorData } = require('../services/mongoService');

exports.handleWebhook = async (req, res) => {
    const { vendor } = req.params;
    const { request_id, data } = req.body;
    await updateJobWithVendorData(request_id, data);
    res.sendStatus(200);
};
