import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Establishment, EstablishmentType } from "@/db/entity/estabilishment";
import { EstabilishmentRepository } from "@/repository/estabilishment-repository";

interface GetEstablishmentUseCaseRequest{
    establishmentId: string
}

type GetEstablishmentUseCaseResponse = Either<
ResourceNotFoundError,
{
    establishment: Establishment
}
>

export class GetEstablishmentUseCase{
    constructor(
        private establishmentRepository: EstabilishmentRepository    
    ){}

    async execute({
        establishmentId
    }:GetEstablishmentUseCaseRequest):Promise<GetEstablishmentUseCaseResponse>{
         const establishment = await this.establishmentRepository.findById(establishmentId)

        if(!establishment){
            return left(new ResourceNotFoundError())
        }

        return right({
            establishment
        })
    }
}