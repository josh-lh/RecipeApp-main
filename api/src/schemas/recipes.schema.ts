export const recipeSchema = {
  bsonType: "object",
  required: ["name", "servings", "ingredients", "cookingMethod"],
  additionalProperties: false,
  properties: {
    _id: {},
    name: {
      bsonType: "string",
      description: "'name' is required and is a string",
    },
    servings: {
      bsonType: ["int", "double"],
      minimum: 0,
      description:
        "'servings' is required and must be an integer with a minimum of zero.",
    },
    cookingMethod: {
      bsonType: ["array"],
      minItems: 1,
      items: {
        bsonType: ["object"],
        required: ["id", "method"],
        additionalProperties: false,
        description: "'cookingMethod' must contain stated fields",
        properties: {
          id: {
            bsonType: ["int"],
            description: "'id' is required and is an int",
          },
          method: {
            bsonType: "string",
            description: "'method' is required and is a string",
          },
        },
      },
      description: "'cookingMethod' is required and needs at least 1 item.",
    },
    ingredients: {
      bsonType: ["array"],
      minItems: 1,
      maxItems: 50,
      items: {
        bsonType: ["object"],
        required: ["quantity", "ingredient"],
        additionalProperties: false,
        description: "'ingredients' must contain the stated fields.",
        properties: {
          quantity: {
            bsonType: ["int", "double", "decimal"],
            description:
              "'quantity' is required and is of double or decimal type",
          },
          measure: {
            bsonType: "string",
            description: "'measure' is an optional field of type string",
          },
          ingredient: {
            bsonType: "string",
            description: "'ingredient' is required and is a string",
          },
        },
      },
    },
  },
};
