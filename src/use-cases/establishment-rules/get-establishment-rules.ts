import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { EstablishmentsRules } from "@/db/entity/estabilishment-rules";
import { EstablishmentRulesRepository } from "@/repository/establishment-rules-repository";

interface GetEstablishmentRulesUseCaseRequest{
         establishmentRulesId: string
}

type GetEstablishmentRulesUseCaseResponse = Either<
ResourceNotFoundError,
{
    establishmentRule: EstablishmentsRules
}
>

export class GetEstablishmentRuleUseCase{
    constructor(
        private establishmentRuleRepository: EstablishmentRulesRepository   
    ){}

    async execute({
      establishmentRulesId
    }:GetEstablishmentRulesUseCaseRequest):Promise<GetEstablishmentRulesUseCaseResponse>{
         const establishmentRule = await this.establishmentRuleRepository.findById(establishmentRulesId)

        if(!establishmentRule){
            return left(new ResourceNotFoundError())
        }

        return right({
            establishmentRule
        })
    }
}