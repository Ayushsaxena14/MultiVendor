const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI || "mongodb://mongo:27017";
const client = new MongoClient(uri);
const dbName = "multivendor";

async function getDb() {
    if (!client.isConnected) await client.connect();
    return client.db(dbName);
}

exports.saveJob = async (job) => {
    const db = await getDb();
    return db.collection('jobs').insertOne(job);
};

exports.getJobById = async (id) => {
    const db = await getDb();
    return db.collection('jobs').findOne({ id });
};

exports.addJobToQueue = async (job) => {
    const redis = require('redis').createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
    await redis.connect();
    await redis.xAdd('jobStream', '*', { job: JSON.stringify(job) });
    await redis.quit();
};

exports.updateJobWithVendorData = async (id, data) => {
    const db = await getDb();
    const cleaned = Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'email'));
    return db.collection('jobs').updateOne({ id }, {
        $set: { status: 'complete', cleanedData: cleaned }
    });
};
