import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeDeleteUserUseCase } from "@/use-cases/factories/user/make-delete-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function DeleteUser(request: FastifyRequest, reply: FastifyReply){
    
    const editParamsSchema = z.object({
        userId: z.string()
    })

    const {userId} = editParamsSchema.parse(request.params)

    try{
        const deleteUserUseCase = makeDeleteUserUseCase()

        await deleteUserUseCase.execute({
            userId,
        })

        return reply.status(204).send({})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}