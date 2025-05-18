import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentsRulesRepository } from "@/repository/dynamodb-repository/establishments-rules-dynamo-db-repository";
import { EditEstablishmentRuleUseCase } from '@/use-cases/establishment-rules/edt-establishment-rules';

export function makeEditEstablishmentRulesUseCase(){
    const establishmentRulesRepository = new DynamoEstablishmentsRulesRepository(dynamoDbDocumentClient)
    const useCase = new EditEstablishmentRuleUseCase(establishmentRulesRepository)

    return useCase
}