import { makeGetAllEstablishmentUseCase } from "@/use-cases/factories/establishment/make-get-all-establishment";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetAllEstablishment(request: FastifyRequest, reply: FastifyReply){

    try{
        const getAllEstablishmentUseCase = makeGetAllEstablishmentUseCase()

        const establishment = await getAllEstablishmentUseCase.execute({})

        return reply.status(200).send({establishment})

    }catch(err){
        
    }
}