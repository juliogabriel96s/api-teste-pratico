import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeCreateEstablishmentUseCase } from "@/use-cases/factories/establishment/make-create-establishment";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreateEstablishment(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        name: z.string(),
        type: z.enum(['shopping','local']).default('local')
    })

    const createParamsSchema = z.object({
        ownerId: z.string()
    })

    const {name, type} = createBodySchema.parse(request.body)
    const {ownerId} = createParamsSchema.parse(request.params)



    try{
        const createEstablishmentUseCase = makeCreateEstablishmentUseCase()

        const establishment = await createEstablishmentUseCase.execute({
            ownerId,
            name,
            type
        })

        return reply.status(201).send({establishment})

    }catch(err){
        if(err instanceof NotAllowedError){
            return reply.status(409).send({message: 'user not found'})
        }

        throw err
    }
}