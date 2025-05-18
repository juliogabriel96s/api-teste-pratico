import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { EstablishmentsRules } from "@/db/entity/estabilishment-rules";
import { EstablishmentRulesRepository } from "@/repository/establishment-rules-repository";

interface EditEstablishmentRulesUseCaseRequest{
         establishmentRulesId: string
         picturesLimit: number,
         videoLimit: number,
}

type EditEstablishmentRulesUseCaseResponse = Either<
ResourceNotFoundError,
{
    establishmentRule: EstablishmentsRules
}
>

export class EditEstablishmentRuleUseCase{
    constructor(
        private establishmentRuleRepository: EstablishmentRulesRepository   
    ){}

    async execute({
      establishmentRulesId,
      picturesLimit,
      videoLimit
    }:EditEstablishmentRulesUseCaseRequest):Promise<EditEstablishmentRulesUseCaseResponse>{
         const establishmentRule = await this.establishmentRuleRepository.findById(establishmentRulesId)

        if(!establishmentRule){
            return left(new ResourceNotFoundError())
        }

        establishmentRule.picturesLimit = picturesLimit
        establishmentRule.videoLimit = videoLimit

        await this.establishmentRuleRepository.save(establishmentRule)

        return right({
            establishmentRule
        })
    }
}