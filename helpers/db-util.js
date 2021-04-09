import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const url = `mongodb+srv://${username}:${password}@cluster0.gmwjq.mongodb.net/events?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(url);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return documents;
}
// export async function getAllDocuments(client, collection, sort) {
//   const db = client.db();
//   const documents = await db.collection(collection).find().sort(sort).toArray();
//   return documents;
// }
