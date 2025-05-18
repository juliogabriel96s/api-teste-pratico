import { makeGetAllProductUseCase } from "@/use-cases/factories/product/make-get-all-product";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetAllProduct(request: FastifyRequest, reply: FastifyReply){

    try{
        const getAllProductUseCase = makeGetAllProductUseCase()

        const product = await getAllProductUseCase.execute({})

        return reply.status(200).send({product})

    }catch(err){
        
    }
}