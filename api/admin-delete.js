import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://shanovenleyo_db_user:StulbJH8D3YlG94K@cluster0.aoq6ixx.mongodb.net/jawa?appName=Cluster0";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const { id } = req.body;

  await client.connect();
  const db = client.db("jawa");

  await db.collection("files").deleteOne({
    _id: new ObjectId(id)
  });

  res.json({ status: true });
}
