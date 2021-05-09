import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import pokemonRoutes from "./modules/routes/pokemon";
import db from "./modules/db";

import {APP_PORT, MONGO_URI } from "./utils/config";

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({logger:true});


server.register(db, {uri: MONGO_URI});
server.register(pokemonRoutes);


const start = async () => {
  try {
    await server.listen(APP_PORT);
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

process.on("uncaughtException", error => {
  console.error(error);
});
process.on("unhandledRejection", error => {
  console.error(error);
});

start();