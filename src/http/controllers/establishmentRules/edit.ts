import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeCreateEstablishmentRulesUseCase } from "@/use-cases/factories/establishment-rules/make-create-establishment-rules";
import { makeEditEstablishmentRulesUseCase } from "@/use-cases/factories/establishment-rules/make-edit-establishment-rules";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function EditEstablishmentRules(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        picturesLimit: z.coerce.number(),
        videoLimit: z.coerce.number()
    })

    const createParamsSchema = z.object({
        establishmentRulesId: z.string()
    })

    const {picturesLimit, videoLimit} = createBodySchema.parse(request.body)
    const {establishmentRulesId} = createParamsSchema.parse(request.params)



    try{
        const EditEstablishmentRuleUseCase = makeEditEstablishmentRulesUseCase()

        const establishmentRule = await EditEstablishmentRuleUseCase.execute({
            establishmentRulesId,
            picturesLimit,
            videoLimit
        })

        return reply.status(200).send({establishmentRule})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}