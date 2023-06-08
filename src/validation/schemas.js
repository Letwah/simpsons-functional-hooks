import joi from "joi";
//define the schema
export const characterSchema = {
  characterId: joi.string().required().min(2).max(32),
};
