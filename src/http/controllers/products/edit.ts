import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeEditProductUseCase } from "@/use-cases/factories/product/make-edit-product";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function EditProduct(request: FastifyRequest, reply: FastifyReply){

    const createBodySchema = z.object({
        name: z.string(),
        price: z.coerce.number()
    })

    const createParamsSchema = z.object({
        productId: z.string()
    })

    const {productId} = createParamsSchema.parse(request.params)
    const {name, price} = createBodySchema.parse(request.body)


    try{
        const editProductUseCase = makeEditProductUseCase()

        const product = await editProductUseCase.execute({
            productId,
            name,
            price
        })

        return reply.status(200).send({product})

    }catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(409).send({message: 'product id wrong'})
        }

        throw err
    }
}