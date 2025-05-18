import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeGetUserUseCase } from "@/use-cases/factories/user/make-get-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetUser(request: FastifyRequest, reply: FastifyReply){
    const createParamsSchema = z.object({
        userId: z.string()
    })

    const {userId} = createParamsSchema.parse(request.params)

    try{
        const getUserUseCase = makeGetUserUseCase()

        const user = await getUserUseCase.execute({
            userId
        })

        return reply.status(200).send({user})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: 'id dont exists'})
        }

        throw err
    }
}