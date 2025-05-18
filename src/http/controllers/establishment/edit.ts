import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeEditEstablishmentUseCase } from "@/use-cases/factories/establishment/make-edit-establishment";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function EditEstablishment(request: FastifyRequest, reply: FastifyReply){

    const createBodySchema = z.object({
        name: z.string(),
        type: z.enum(['shopping','local']).default('local')
    })

    const createParamsSchema = z.object({
        establishmentId: z.string()
    })

    const {establishmentId} = createParamsSchema.parse(request.params)
    const {name, type} = createBodySchema.parse(request.body)


    try{
        const editEstablishmentUseCase = makeEditEstablishmentUseCase()

        const establishment = await editEstablishmentUseCase.execute({
            establishmentId,
            name,
            type
        })

        return reply.status(200).send({establishment})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: 'establishment id wrong'})
        }

        throw err
    }
}