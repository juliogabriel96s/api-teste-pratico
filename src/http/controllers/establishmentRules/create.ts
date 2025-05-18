import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeCreateEstablishmentRulesUseCase } from "@/use-cases/factories/establishment-rules/make-create-establishment-rules";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreateEstablishmentRules(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        picturesLimit: z.coerce.number(),
        videoLimit: z.coerce.number()
    })

    const createParamsSchema = z.object({
        establishmentId: z.string()
    })

    const {picturesLimit, videoLimit} = createBodySchema.parse(request.body)
    const {establishmentId} = createParamsSchema.parse(request.params)



    try{
        const createEstablishmentRuleUseCase = makeCreateEstablishmentRulesUseCase()

        const establishmentRule = await createEstablishmentRuleUseCase.execute({
            establishmentId,
            picturesLimit,
            videoLimit
        })

        return reply.status(201).send({establishmentRule})

    }catch(err){
        if(err instanceof NotAllowedError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}