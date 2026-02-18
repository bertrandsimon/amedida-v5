import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not set in the environment.");
}

const globalForMongo = globalThis;

if (!globalForMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalForMongo._mongoClientPromise = client.connect();
}

const clientPromise = globalForMongo._mongoClientPromise;

export default clientPromise;
