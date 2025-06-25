# 🛠️ Multi-Vendor Data Fetch Service

This is a backend system designed to abstract the complexity of fetching data from multiple external vendors, each with different rate limits and response styles (synchronous or asynchronous). It provides a unified internal API to submit jobs, process them, and retrieve the results.

---

## 🚀 Features

- Accepts JSON payloads and responds with a unique `request_id`
- Supports both **synchronous** and **asynchronous** mock vendor services
- Respects vendor **rate-limiting**
- Uses a **worker queue system** to process jobs in the background
- Cleans and stores vendor responses in **MongoDB**
- Handles job statuses: `pending → processing → complete/failed`
- Includes a **webhook endpoint** for async vendors
- Comes with a **load test script** to test concurrency
- Fully containerized using **Docker Compose**

---

## 🧱 Tech Stack

- **Backend**: Node.js + Express
- **Queue**: Redis Streams
- **Database**: MongoDB
- **Containers**: Docker + Docker Compose
- **Load Testing**: k6





