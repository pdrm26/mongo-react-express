// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import User from "../models/user";

// Global Variables
export const collections: { users?: mongoDB.Collection } = {};

// Initialize Connectio
export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URI!
  );

  await client
    .connect()
    .then((res) => console.log(">> SUCCESSFULLY CONNECT TO THE MONGO"));

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  // Apply schema validation to the collection
  await applySchemaValidation(db);

  const usersCollection: mongoDB.Collection = db.collection(
    process.env.USERS_COLLECTION_NAME!
  );

  collections.users = usersCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our User model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongoDB.Db) {
  const jsonSchema = {
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
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: process.env.USERS_COLLECTION_NAME,
      validator: jsonSchema,
    })
    .catch(async (error: mongoDB.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection(process.env.USERS_COLLECTION_NAME!, {
          validator: jsonSchema,
        });
      }
    });
}
