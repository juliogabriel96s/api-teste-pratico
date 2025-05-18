import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeCreateProductUseCase } from "@/use-cases/factories/product/make-create-product";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreateProduct(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        name: z.string(),
        price: z.coerce.number()
    })

    const createParamsSchema = z.object({
        establishmentId: z.string()
    })

    const {name, price} = createBodySchema.parse(request.body)
    const {establishmentId} = createParamsSchema.parse(request.params)



    try{
        const createProductUseCase = makeCreateProductUseCase()

        const product = await createProductUseCase.execute({
            establishmentId,
            name,
            price
        })

        return reply.status(201).send({product})

    }catch(err){
        if(err instanceof NotAllowedError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}