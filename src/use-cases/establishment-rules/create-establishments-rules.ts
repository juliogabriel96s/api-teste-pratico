import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { EstablishmentsRules } from "@/db/entity/estabilishment-rules";
import { EstabilishmentRepository } from "@/repository/estabilishment-repository";
import { EstablishmentRulesRepository } from "@/repository/establishment-rules-repository";
import {v4 as uuidv4} from 'uuid'

interface CreateEstablishmentRulesUseCaseRequest{
         establishmentId: string,
         picturesLimit: number,
         videoLimit: number
}

type CreateEstablishmentRulesUseCaseResponse = Either<
NotAllowedError,
{
    establishmentRule: EstablishmentsRules
}
>

export class CreateEstablishmentRuleUseCase{
    constructor(
        private establishmentRepository: EstabilishmentRepository,
        private establishmentRuleRepository: EstablishmentRulesRepository   
    ){}

    async execute({
       establishmentId,
       picturesLimit,
       videoLimit
    }:CreateEstablishmentRulesUseCaseRequest):Promise<CreateEstablishmentRulesUseCaseResponse>{
         const estabilishment = await this.establishmentRepository.findById(establishmentId)

        if(!estabilishment){
            return left(new NotAllowedError())
        }

        const establishmentRule = await this.establishmentRuleRepository.create({
            id:uuidv4(),
            establishmentId,
            picturesLimit,
            videoLimit 
        })

        return right({
            establishmentRule
        })
    }
}