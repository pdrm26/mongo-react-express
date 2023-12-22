// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { users?: mongoDB.Collection } = {};

// Initialize Connectio
export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URI!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  await db.command({
    collMod: process.env.USERS_COLLECTION_NAME,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "family", "age"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: {
            bsonType: "string",
            description: "'name' is required and is a string",
          },
          family: {
            bsonType: "string",
            description: "'family' is required and is a string",
          },
          age: {
            bsonType: "number",
            description: "'age' is required and is a number",
          },
          networth: {
            bsonType: "number",
            description: "'networth' is a number",
          },
        },
      },
    },
  });

  const usersCollection: mongoDB.Collection = db.collection(
    process.env.USERS_COLLECTION_NAME!
  );

  collections.users = usersCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
}
