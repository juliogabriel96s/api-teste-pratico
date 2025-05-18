import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Establishment, EstablishmentType } from "@/db/entity/estabilishment";
import { EstabilishmentRepository } from "@/repository/estabilishment-repository";

interface EditEstablishmentUseCaseRequest{
    establishmentId: string
     name: string,
     type: EstablishmentType,
}

type EditEstablishmentUseCaseResponse = Either<
ResourceNotFoundError,
{
    establishment: Establishment
}
>

export class EditEstablishmentUseCase{
    constructor(
        private establishmentRepository: EstabilishmentRepository    
    ){}

    async execute({
        establishmentId,
        name,
        type
    }:EditEstablishmentUseCaseRequest):Promise<EditEstablishmentUseCaseResponse>{
         const establishment = await this.establishmentRepository.findById(establishmentId)

        if(!establishment){
            return left(new ResourceNotFoundError())
        }

        establishment.name = name
        establishment.type = type

        await this.establishmentRepository.save(establishment)

        return right({
            establishment
        })
    }
}