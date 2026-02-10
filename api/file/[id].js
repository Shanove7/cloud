import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://shanovenleyo_db_user:StulbJH8D3YlG94K@cluster0.aoq6ixx.mongodb.net/jawa?appName=Cluster0";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const { id } = req.query;

  await client.connect();
  const db = client.db("jawa");
  const collection = db.collection("files");

  const file = await collection.findOne({ _id: new ObjectId(id) });

  if (!file) return res.status(404).send("File not found");

  res.setHeader("Content-Type", file.type);
  res.send(file.data.buffer);
    }
