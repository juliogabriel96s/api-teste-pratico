import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      sub: string;
      type: "owner" | "customer";
    };
    user: {
      sub: string;
      type: "owner" | "customer";
    };
  }
}