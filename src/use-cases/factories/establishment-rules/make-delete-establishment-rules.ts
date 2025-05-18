import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentsRulesRepository } from "@/repository/dynamodb-repository/establishments-rules-dynamo-db-repository";
import { DeleteEstablishmentRuleUseCase } from '@/use-cases/establishment-rules/delete-establishment-rules';

export function makeDeleteEstablishmentRulesUseCase(){
    const establishmentRulesRepository = new DynamoEstablishmentsRulesRepository(dynamoDbDocumentClient)
    const useCase = new DeleteEstablishmentRuleUseCase(establishmentRulesRepository)

    return useCase
}