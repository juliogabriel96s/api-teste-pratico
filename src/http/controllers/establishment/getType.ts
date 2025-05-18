import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeGetTypeEstablishmentUseCase } from "@/use-cases/factories/establishment/make-get-type-establishment";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetTypeEstablishment(request: FastifyRequest, reply: FastifyReply){

    const createBodySchema = z.object({
        type: z.enum(['shopping','local']).default('local')
        })

    const {type} = createBodySchema.parse(request.body)



    try{
        const getTypeEstablishmentUseCase = makeGetTypeEstablishmentUseCase()

        const establishment = await getTypeEstablishmentUseCase.execute({
            type
        })

        return reply.status(200).send({establishment})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}