import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeGetEstablishmentRulesUseCase } from "@/use-cases/factories/establishment-rules/make-get-establishment-rules";
import { makeGetProductUseCase } from "@/use-cases/factories/product/make-get-product";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetEstablishmentRuleId(request: FastifyRequest, reply: FastifyReply){

    const createParamsSchema = z.object({
        establishmentRulesId: z.string()
    })

    const {establishmentRulesId} = createParamsSchema.parse(request.params)



    try{
        const getEstablishmentRuleUseCase = makeGetEstablishmentRulesUseCase()

        const establishmentRule = await getEstablishmentRuleUseCase.execute({
            establishmentRulesId
        })

        return reply.status(200).send({establishmentRule})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: 'establishment rule id wrong'})
        }

        throw err
    }
}