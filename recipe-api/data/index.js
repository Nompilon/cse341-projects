const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('project2');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };