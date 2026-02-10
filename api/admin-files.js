import { MongoClient } from "mongodb";

const uri = "mongodb+srv://shanovenleyo_db_user:StulbJH8D3YlG94K@cluster0.aoq6ixx.mongodb.net/jawa?appName=Cluster0";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db("jawa");
  const files = await db
    .collection("files")
    .find({})
    .project({ data: 0 })
    .sort({ createdAt: -1 })
    .toArray();

  res.json(files);
}
