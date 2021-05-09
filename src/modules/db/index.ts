import { Model } from "mongoose";
import * as Mongoose from "mongoose";
import { PokemonModel, Pokemon } from "./models/pokemon";

import * as fp from "fastify-plugin";

export interface Models {
  Pokemon: Model<PokemonModel>;
}

export interface Db {
  models: Models;
}

export default fp(async (fastify, opts: { uri: 'string' }, next) => {

  Mongoose.connection.on("connected", () => {
    fastify.log.info({ actor: "MongoDB" }, "connected");
  });

  Mongoose.connection.on("disconnected", () => {
    fastify.log.error({ actor: "MongoDB" }, "disconnected");
  });
  await Mongoose.connect(
    opts.uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const models: Models = {
    Pokemon: Pokemon
  };

  fastify.decorate('db', { models });

  next();
});
