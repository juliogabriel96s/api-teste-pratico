import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentRepository } from "@/repository/dynamodb-repository/establishment-dynamo-db-repository";
import { DynamoEstablishmentsRulesRepository } from "@/repository/dynamodb-repository/establishments-rules-dynamo-db-repository";
import { CreateEstablishmentRuleUseCase } from '@/use-cases/establishment-rules/create-establishments-rules';

export function makeCreateEstablishmentRulesUseCase(){
    const establishmentRulesRepository = new DynamoEstablishmentsRulesRepository(dynamoDbDocumentClient)
    const estabilishmentRepository = new DynamoEstablishmentRepository(dynamoDbDocumentClient)
    const useCase = new CreateEstablishmentRuleUseCase(
        estabilishmentRepository,
        establishmentRulesRepository
    )

    return useCase
}