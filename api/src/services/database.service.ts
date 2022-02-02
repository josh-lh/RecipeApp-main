import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Recipe from "../models/recipe";
import { recipeSchema } from "../schemas/recipes.schema";

export const collections: { recipes?: mongoDB.Collection<Recipe> } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  await client.connect();

  const db = client.db(process.env.DB_NAME);
  await applySchemaValidation(db);

  const recipeCollection = db.collection<Recipe>(
    process.env.RECIPES_COLLECTION_NAME
  );

  collections.recipes = recipeCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${recipeCollection.collectionName}`
  );
}

// https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongoDB.Db) {
  const jsonSchema = {
    $jsonSchema: recipeSchema,
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: process.env.RECIPES_COLLECTION_NAME,
      validator: jsonSchema,
    })
    .catch(async (error: mongoDB.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection(process.env.RECIPES_COLLECTION_NAME, {
          validator: jsonSchema,
        });
      }
    });
}
