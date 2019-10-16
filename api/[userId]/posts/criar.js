import { getCollection } from "../../../lib/db";
import { sluggify } from "../../../helpers/strings";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  const { body, query } = req;
  const { userId } = query;
  if (!userId)
    res.status(500).json({ error: "falta user_id. Ex: /api/fulano/criar" });

  try {
    const collection = await getCollection("posts");

    // separando tags
    const tags = body.tags.split(",").map(tag => tag.trim().toLowerCase());

    // criando slug do path
    const path = `${sluggify(body.titulo)}-${Math.floor(Math.random() * 999)}`;

    const { insertedId } = await collection.insertOne({
      ...body,
      userId,
      path,
      tags,
      date: new Date()
    });

    return res.status(200).json({
      insertedId,
      path
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
