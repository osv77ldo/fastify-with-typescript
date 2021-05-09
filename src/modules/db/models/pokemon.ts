import { Document, Schema, Model, model } from "mongoose";

export interface PokemonDocument extends Document {
  level: number;
  name: string;
  createdDate: Date;
}

export interface PokemonModel extends PokemonDocument {}

export const PokemonSchema: Schema = new Schema(
  {
    level: Number,
    name: String,
    createdDate: Date
  },
  { collection: "pokemons" }
);

PokemonSchema.pre<PokemonDocument>("save", async function() {
  this.createdDate = new Date();
});

export const Pokemon: Model<PokemonModel> = model<PokemonModel>(
  "Pokemon",
  PokemonSchema
);
