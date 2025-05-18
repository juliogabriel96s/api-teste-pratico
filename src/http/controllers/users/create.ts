import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeCreateUserUseCase } from "@/use-cases/factories/user/make-create-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreateUser(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        type: z.enum(['owner','customer']).default('customer')
    })

    const {name, email, type} = createBodySchema.parse(request.body)

    try{
        const createUserUseCase = makeCreateUserUseCase()

        const user = await createUserUseCase.execute({
            name,
            email,
            type
        })

        return reply.status(201).send({user})

    }catch(err){
        if(err instanceof NotAllowedError){
            return reply.status(409).send({message: 'Email already exists'})
        }

        throw err
    }
}