import { getCollection } from "../../../lib/db";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  const { query } = req;
  const { userId } = query;
  if (!userId)
    res.status(500).json({ error: "falta user_id. Ex: /api/fulano/criar" });

  try {
    const collection = await getCollection("posts");

    const posts = await collection
      .find({ userId })
      .sort({ date: -1 })
      .toArray();

    //res.setHeader('Cache-Control', 'maxage=0, s-maxage=600');
    return res.status(200).json({
      posts
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
