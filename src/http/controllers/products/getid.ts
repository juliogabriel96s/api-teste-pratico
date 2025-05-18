import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeGetProductUseCase } from "@/use-cases/factories/product/make-get-product";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetProductId(request: FastifyRequest, reply: FastifyReply){

    const createParamsSchema = z.object({
        productId: z.string()
    })

    const {productId} = createParamsSchema.parse(request.params)



    try{
        const getProductUseCase = makeGetProductUseCase()

        const product = await getProductUseCase.execute({
            productId
        })

        return reply.status(200).send({product})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: 'product id wrong'})
        }

        throw err
    }
}