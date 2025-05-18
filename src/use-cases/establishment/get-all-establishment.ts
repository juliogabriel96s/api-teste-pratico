import { Either, right } from "@/core/either";
import { Establishment, EstablishmentType } from "@/db/entity/estabilishment";
import { EstabilishmentRepository } from "@/repository/estabilishment-repository";

interface GetAllEstablishmentUseCaseRequest{
}

type GetAllEstablishmentUseCaseResponse = Either<
{},
{
    establishment: Establishment[]
}
>

export class GetAllEstablishmentUseCase{
    constructor(
        private establishmentRepository: EstabilishmentRepository    
    ){}

    async execute({
        
    }:GetAllEstablishmentUseCaseRequest):Promise<GetAllEstablishmentUseCaseResponse>{
         const establishment = await this.establishmentRepository.findAll()

        return right({
            establishment
        })
    }
}