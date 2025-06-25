const { v4: uuidv4 } = require('uuid');
const { addJobToQueue, saveJob, getJobById } = require('../services/mongoService');

exports.createJob = async (req, res) => {
    const id = uuidv4();
    const job = {
        id,
        payload: req.body,
        status: 'pending',
        createdAt: new Date()
    };
    await saveJob(job);
    await addJobToQueue(job);
    res.json({ request_id: id });
};

exports.getJob = async (req, res) => {
    const job = await getJobById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    if (job.status === 'complete') {
        res.json({ status: 'complete', result: job.cleanedData });
    } else {
        res.json({ status: job.status });
    }
};
