import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { EstablishmentsRules } from "@/db/entity/estabilishment-rules";
import { EstablishmentRulesRepository } from "@/repository/establishment-rules-repository";

interface DeleteEstablishmentRulesUseCaseRequest{
         establishmentRulesId: string
}

type DeleteEstablishmentRulesUseCaseResponse = Either<
ResourceNotFoundError,
{}
>

export class DeleteEstablishmentRuleUseCase{
    constructor(
        private establishmentRuleRepository: EstablishmentRulesRepository   
    ){}

    async execute({
      establishmentRulesId,
    }:DeleteEstablishmentRulesUseCaseRequest):Promise<DeleteEstablishmentRulesUseCaseResponse>{
         const establishmentRule = await this.establishmentRuleRepository.findById(establishmentRulesId)

        if(!establishmentRule){
            return left(new ResourceNotFoundError())
        }

        await this.establishmentRuleRepository.delete(establishmentRule.id)

        return right({})
    }
}