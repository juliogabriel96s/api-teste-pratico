import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentsRulesRepository } from "@/repository/dynamodb-repository/establishments-rules-dynamo-db-repository";
import { GetEstablishmentRuleUseCase } from '@/use-cases/establishment-rules/get-establishment-rules';

export function makeGetEstablishmentRulesUseCase(){
    const establishmentRulesRepository = new DynamoEstablishmentsRulesRepository(dynamoDbDocumentClient)
    const useCase = new GetEstablishmentRuleUseCase(establishmentRulesRepository)

    return useCase
}