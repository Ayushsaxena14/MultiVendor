const express = require('express');
const bodyParser = require('body-parser');
const jobRoutes = require('./routes/jobs');
const webhookRoutes = require('./routes/webhook');

const app = express();
app.use(bodyParser.json());

app.use('/jobs', jobRoutes);
app.use('/vendor-webhook', webhookRoutes);

module.exports = app;
