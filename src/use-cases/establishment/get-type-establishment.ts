import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Establishment, EstablishmentType } from "@/db/entity/estabilishment";
import { EstabilishmentRepository } from "@/repository/estabilishment-repository";

interface GetTypeEstablishmentUseCaseRequest{
    type: EstablishmentType
}

type GetTypeEstablishmentUseCaseResponse = Either<
ResourceNotFoundError,
{
    establishment: Establishment
}
>

export class GetTypeEstablishmentUseCase{
    constructor(
        private establishmentRepository: EstabilishmentRepository    
    ){}

    async execute({
        type
    }:GetTypeEstablishmentUseCaseRequest):Promise<GetTypeEstablishmentUseCaseResponse>{
         

        const establishment = await this.establishmentRepository.findByType(type);

        if(!establishment){
            return left(new ResourceNotFoundError())
        }


          return right({
             establishment
        })
    }
}