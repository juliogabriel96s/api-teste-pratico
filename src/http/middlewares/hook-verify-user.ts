import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const fakeUser = {
        sub: "12345",
        type: "owner", 
    };

    (request as any).user = fakeUser;
}