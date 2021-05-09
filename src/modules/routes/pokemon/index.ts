import * as fp from "fastify-plugin";

export default fp(async (server, opts, next) => {
  server.get("/pokemons/:id", {}, async (request, reply) => {
    try {
      const _id = request.params.id;
      const { Pokemon } = server.db.models

      const pokemon = await Pokemon.findOne({
        _id
      });

      if (!pokemon) {
        return reply.code(404).send({message:"pokemon not found"});
      }

      return reply.code(200).send(pokemon);
    } catch (error) {
      request.log.error(error);
      return reply.code(400).send({message: "error, invalid request"});
    }
  });

  server.post("/pokemons", {}, async (request, reply) => {
    try {
      const { Pokemon } = server.db.models;

      const pokemon = await Pokemon.create(request.body);

      return reply.code(201).send(pokemon);
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });
  next();
});
