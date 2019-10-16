import { getCollection } from "../../../lib/db";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  const {
    query: { postPath, userId }
  } = req;

  if (!userId)
    res.status(500).json({ error: "falta user_id. Ex: /api/fulano/criar" });

  const collection = await getCollection("posts");

  const [post] = await collection.find({ path: postPath }).toArray();

  //res.setHeader('Cache-Control', 'maxage=0, s-maxage=600');
  res.status(200).json({ post });
};
