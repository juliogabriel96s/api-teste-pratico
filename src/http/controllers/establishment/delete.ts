import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeDeleteEstablishmentUseCase } from "@/use-cases/factories/establishment/make-delete-establishment";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function DeletetEstablishment(request: FastifyRequest, reply: FastifyReply){

    const createParamsSchema = z.object({
        establishmentId: z.string()
    })

    const {establishmentId} = createParamsSchema.parse(request.params)



    try{
        const deleteEstablishmentUseCase = makeDeleteEstablishmentUseCase()

        await deleteEstablishmentUseCase.execute({
            establishmentId
        })

        return reply.status(204).send({})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: 'establishment id wrong'})
        }

        throw err
    }
}