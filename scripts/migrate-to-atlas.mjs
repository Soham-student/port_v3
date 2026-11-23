import { MongoClient } from "mongodb";

const localUri = "mongodb://127.0.0.1:27017/portfolio";
const atlasUri = process.env.ATLAS_MONGO_URI;

if (!atlasUri) throw new Error("ATLAS_MONGO_URI is required");

const local = new MongoClient(localUri);
const atlas = new MongoClient(atlasUri);

try {
  await local.connect();
  await atlas.connect();

  const source = local.db("portfolio");
  const target = atlas.db("portfolio");
  const sourceCollections = await source
    .listCollections({}, { nameOnly: true })
    .toArray();
  const targetCollections = await target
    .listCollections({}, { nameOnly: true })
    .toArray();

  for (const item of targetCollections) {
    await target.collection(item.name).drop();
  }

  for (const item of sourceCollections) {
    const name = item.name;
    const sourceCollection = source.collection(name);
    const targetCollection = target.collection(name);
    const cursor = sourceCollection.find({}, { batchSize: 1000 });
    let batch = [];
    let copied = 0;

    for await (const doc of cursor) {
      batch.push(doc);
      if (batch.length === 1000) {
        await targetCollection.insertMany(batch, { ordered: true });
        copied += batch.length;
        batch = [];
      }
    }

    if (batch.length) {
      await targetCollection.insertMany(batch, { ordered: true });
      copied += batch.length;
    }

    const indexes = await sourceCollection.indexes();
    for (const index of indexes) {
      if (index.name === "_id_") continue;

      const options = { name: index.name };
      if (index.unique) options.unique = true;
      if (index.sparse) options.sparse = true;
      if (index.expireAfterSeconds !== undefined) {
        options.expireAfterSeconds = index.expireAfterSeconds;
      }

      await targetCollection.createIndex(index.key, options);
    }

    console.log(`${name}: copied ${copied} documents`);
  }
} finally {
  await local.close();
  await atlas.close();
}
