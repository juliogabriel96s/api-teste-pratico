import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeGetEstablishmentUseCase } from "@/use-cases/factories/establishment/make-get-establishment";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetEstablishmentId(request: FastifyRequest, reply: FastifyReply){

    const createParamsSchema = z.object({
        establishmentId: z.string()
    })

    const {establishmentId} = createParamsSchema.parse(request.params)



    try{
        const getEstablishmentUseCase = makeGetEstablishmentUseCase()

        const establishment = await getEstablishmentUseCase.execute({
            establishmentId
        })

        return reply.status(200).send({establishment})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: 'establishment id wrong'})
        }

        throw err
    }
}