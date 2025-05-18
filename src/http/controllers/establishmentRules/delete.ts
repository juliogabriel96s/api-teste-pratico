import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeDeleteEstablishmentRulesUseCase } from "@/use-cases/factories/establishment-rules/make-delete-establishment-rules";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function DeleteEstablishmentRule(request: FastifyRequest, reply: FastifyReply){

    const createParamsSchema = z.object({
        establishmentRulesId: z.string()
    })

    const {establishmentRulesId} = createParamsSchema.parse(request.params)



    try{
        const deleteEstablishmentRuleUseCase = makeDeleteEstablishmentRulesUseCase()

        const establishmentRule = await deleteEstablishmentRuleUseCase.execute({
            establishmentRulesId
        })

        return reply.status(204).send({})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: 'establishment rule id wrong'})
        }

        throw err
    }
}