import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { EstabilishmentRepository } from "@/repository/estabilishment-repository";

interface DeleteEstablishmentUseCaseRequest{
    establishmentId: string  
}

type DeleteEstablishmentUseCaseResponse = Either<
ResourceNotFoundError,
{}
>

export class DeleteEstablishmentUseCase{
    constructor(
        private establishmentRepository: EstabilishmentRepository    
    ){}

    async execute({
        establishmentId,
    }:DeleteEstablishmentUseCaseRequest):Promise<DeleteEstablishmentUseCaseResponse>{
         const establishment = await this.establishmentRepository.findById(establishmentId)

        if(!establishment){
            return left(new ResourceNotFoundError())
        }

        await this.establishmentRepository.delete(establishment.id)

        return right({})
    }
}