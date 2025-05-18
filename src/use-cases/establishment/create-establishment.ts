import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { Establishment, EstablishmentType } from "@/db/entity/estabilishment";
import { EstabilishmentRepository } from "@/repository/estabilishment-repository";
import { UserRepository } from "@/repository/user-repository";
import {v4 as uuidv4} from 'uuid'

interface CreateEstablishmentUseCaseRequest{
    name: string
    ownerId: string
    type: EstablishmentType
}

type CreateEstablishmentUseCaseResponse = Either<
NotAllowedError,
{
    establishment: Establishment
}
>

export class CreateEstablishmentUseCase{
    constructor(
        private userRepository: UserRepository,
        private establishmentRepository: EstabilishmentRepository    
    ){}

    async execute({
       name,
       ownerId,
       type
    }:CreateEstablishmentUseCaseRequest):Promise<CreateEstablishmentUseCaseResponse>{
         const userId = await this.userRepository.findById(ownerId)

        if(!userId){
            return left(new NotAllowedError())
        }

        const establishment = await this.establishmentRepository.create({
            id:uuidv4(),
            name,
            ownerId,
            type 
        })

        return right({
            establishment
        })
    }
}