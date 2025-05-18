import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeDeleteProductUseCase } from "@/use-cases/factories/product/make-delete-product";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function DeletetProduct(request: FastifyRequest, reply: FastifyReply){

    const createParamsSchema = z.object({
        productId: z.string()
    })

    const {productId} = createParamsSchema.parse(request.params)



    try{
        const deleteProductUseCase = makeDeleteProductUseCase()

        await deleteProductUseCase.execute({
            productId
        })

        return reply.status(204).send({})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: 'product id wrong'})
        }

        throw err
    }
}