const redis = require('redis');
const { MongoClient } = require('mongodb');
const axios = require('axios');

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017";
const client = new MongoClient(MONGO_URI);
const dbName = "multivendor";

async function getDb() {
    if (!client.isConnected) await client.connect();
    return client.db(dbName);
}

async function runWorker() {
    const redisClient = redis.createClient({ url: 'redis://redis:6379' });
    await redisClient.connect();

    while (true) {
        const response = await redisClient.xRead({ key: 'jobStream', id: '$' }, { COUNT: 1, BLOCK: 0 });
        if (!response) continue;

        for (const stream of response) {
            for (const message of stream.messages) {
                const job = JSON.parse(message.message.job);
                const db = await getDb();
                await db.collection('jobs').updateOne({ id: job.id }, { $set: { status: 'processing' } });

                try {
                    const vendorUrl = job.payload.useAsync ? 'http://vendor-async:4001' : 'http://vendor-sync:4000';
                    await axios.post(vendorUrl, { ...job, request_id: job.id });
                    if (!job.payload.useAsync) {
                        await db.collection('jobs').updateOne({ id: job.id }, {
                            $set: { status: 'complete', cleanedData: job.payload }
                        });
                    }
                } catch (err) {
                    await db.collection('jobs').updateOne({ id: job.id }, { $set: { status: 'failed' } });
                }
            }
        }
    }
}

runWorker().catch(console.error);
