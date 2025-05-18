import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeEditUserUseCase } from "@/use-cases/factories/user/make-edit-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function EditUser(request: FastifyRequest, reply: FastifyReply){
    const editBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
    })

    const editParamsSchema = z.object({
        userId: z.string()
    })

    const {name, email} = editBodySchema.parse(request.body)
    const {userId} = editParamsSchema.parse(request.params)

    try{
        const editUserUseCase = makeEditUserUseCase()

        const user = await editUserUseCase.execute({
            userId,
            name,
            email,
        })

        return reply.status(200).send({user})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}