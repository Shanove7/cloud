import { MongoClient } from "mongodb";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const uri = "mongodb+srv://shanovenleyo_db_user:StulbJH8D3YlG94K@cluster0.aoq6ixx.mongodb.net/jawa?appName=Cluster0";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload error" });

    const file = files.file;
    if (!file) return res.status(400).json({ error: "No file" });

    const data = fs.readFileSync(file.filepath);

    await client.connect();
    const db = client.db("jawa");
    const collection = db.collection("files");

    const result = await collection.insertOne({
      name: file.originalFilename,
      type: file.mimetype,
      data: data,
      size: data.length,
      createdAt: new Date()
    });

    const id = result.insertedId.toString();

    res.json({
      status: true,
      url: `${req.headers.origin}/api/file/${id}`,
      id
    });
  });
}
