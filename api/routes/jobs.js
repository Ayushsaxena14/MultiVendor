const express = require('express');
const router = express.Router();
const { createJob, getJob } = require('../controllers/jobsController');

router.post('/', createJob);
router.get('/:id', getJob);

module.exports = router;
