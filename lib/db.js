import { MongoClient } from "mongodb";

// Usado para reutilizar conexao em 'hot containers'
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  console.log(process.env.MONGODB_URI, process.env.MONGODB_DBNAME);

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = await client.db(process.env.MONGODB_DBNAME);

  // Fazendo o cache da conexao
  cachedDb = db;
  return db;
}

export async function getCollection(collectionName) {
  // Conecta e posiciona o cursor em uma collection do banco
  const db = await connectToDatabase();

  const collection = await db.collection(collectionName);
  return collection;
}
