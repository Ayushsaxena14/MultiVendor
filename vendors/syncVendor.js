const express = require('express');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    const data = req.body;
    data.processed = true;
    res.json(data);
});

app.listen(4000, () => console.log('Sync vendor running on 4000'));
