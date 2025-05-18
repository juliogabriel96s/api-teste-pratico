import { dynamoDbDocumentClient } from "@/db/db";
import { DynamoUserRepository } from "@/repository/dynamodb-repository/user-dynamo-db-repository";
import { FastifyReply, FastifyRequest } from "fastify";


export function verifyUserType(typeToVerify: "owner" | "customer") {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const userId = request.headers["user-id"];

        if (!userId) {
            return reply.status(401).send({ message: "User ID is required" });
        }

        const userRepository = new DynamoUserRepository(dynamoDbDocumentClient);
        const user = await userRepository.findById(userId as string);

        if (!user || user.type !== typeToVerify) {
            return reply.status(403).send({ message: "Unauthorized" });
        }

        (request as any).user = user;
    };
}