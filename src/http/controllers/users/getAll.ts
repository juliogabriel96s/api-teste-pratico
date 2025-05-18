import { makeGetAllUserUseCase } from "@/use-cases/factories/user/make-get-all-user";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetAllUser(request: FastifyRequest, reply: FastifyReply){
     try{
        const getAllUserUseCase = makeGetAllUserUseCase()

        const user = await getAllUserUseCase.execute({})

        return reply.status(200).send({user})

    }catch(err){
        
    }
}