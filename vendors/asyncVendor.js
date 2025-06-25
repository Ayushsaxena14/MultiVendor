const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    res.send('got it');
    setTimeout(() => {
        axios.post('http://api:3000/vendor-webhook/async', {
            request_id: req.body.request_id,
            data: { ...req.body, processed: true }
        });
    }, 3000);
});

app.listen(4001, () => console.log('Async vendor running on 4001'));
